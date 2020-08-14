<template>
	<div>
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<form class="login-form">
			<v-text-field
					:counter="10"
					:error-messages="passwordErrors"
					@blur="$v.password.$touch()"
					@input="$v.password.$touch()"
					label="Name"
					required
					v-model="password"
			></v-text-field>
			<v-text-field
					:error-messages="emailErrors"
					@blur="$v.email.$touch()"
					@input="$v.email.$touch()"
					label="E-mail"
					required
					v-model="email"
			></v-text-field>

			<v-btn @click="submit" class="mr-4">Войти</v-btn>
			<v-btn @click="clear">Очистить</v-btn>
		</form>

		<div>
			<template>
				<div class="text-center">
					<v-btn
							@click="signInWithGoogle"
							color="primary" dark
							rounded
					>
						<i class="material-icons">account_circle</i> Sign-in with Google
					</v-btn>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'

    export default {
        password: "loginAdmin",
        mixins: [validationMixin],

        validations: {
            password: {required, maxLength: maxLength(10)},
            email: {required, email},
        },

        data: () => ({
            password: '',
            email: '',
        }),
        metaInfo() {
            return {
                title: this.$title('Login')
            }
        },
        computed: {
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.maxLength && errors.push('Ім’я має бути не більше 10 символів')
                !this.$v.password.required && errors.push('Ім\'я обов\'язково.')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Повинно бути дійсною електронною поштою')
                !this.$v.email.required && errors.push('Повинно бути дійсною електронною поштою')
                return errors
            },
        },

        methods: {
            async signInWithGoogle() {
                try {
                    await this.$store.dispatch('signInWithGoogle')
                    // this.$v.$touch()
                    this.$router.push('/admin')
                } catch (e) {
                    console.log('error')
                }
                // let provider = new firebase.auth.GoogleAuthProvider();
                // firebase.auth().signInWithPopup(provider);
                // if (this.isUserSignedIn) {
                //     this.$router.push('/admin')
                // }
            },
            async submit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }
                try {
                    await this.$store.dispatch('login', formData)
                    // this.$v.$touch()
                    this.$router.push('/admin')
                } catch (e) {
                    console.log('error')
                }
            },

            mounted() {
                if (this.$route.query.locale) {
                    let info = {locale: this.$route.query.locale}
                    this.$store.commit('setInfo', info)
                }
            },
            clear() {
                this.$v.$reset()
                this.password = ''
                this.email = ''
            },
        },
    }
</script>

<style>
	@import '~animate.css';

	.login-form {
		padding: 20px;
	}
</style>