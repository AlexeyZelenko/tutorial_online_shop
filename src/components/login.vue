<template>
	<div>
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<form class="login-form">
			<v-text-field
					v-model="password"
					:error-messages="passwordErrors"
					:counter="10"
					label="Name"
					required
					@input="$v.password.$touch()"
					@blur="$v.password.$touch()"
			></v-text-field>
			<v-text-field
					v-model="email"
					:error-messages="emailErrors"
					label="E-mail"
					required
					@input="$v.email.$touch()"
					@blur="$v.email.$touch()"
			></v-text-field>

			<v-btn class="mr-4" @click="submit">Увійти</v-btn>
			<v-btn @click="clear">Очистити</v-btn>
		</form>
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