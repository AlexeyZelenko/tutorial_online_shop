<template>
	<div>
		<template>
			<div class="text-center">
				<v-btn
						:to="{name: 'catalog'}"
						block
						style="color: whitesmoke; background-color: darkgreen"
						color="primary"
						dark
				>
					{{'Back to catalog' | localize }}
				</v-btn>
			</div>
		</template>


<!--		ФОРМА ВХОДА: ПОЧТА+ПАРОЛЬ-->
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



			<v-btn
					@click="submit"
					class="mr-4"
					style="margin: 5px; background-color: limegreen;"
			>
				Войти
			</v-btn>

			<v-btn
					style="margin: 5px; background-color: limegreen;"
					@click="clear"
			>
				Очистить
			</v-btn>
		</form>



<!--		РЕГИСТРАЦИЯ : ПОЧТА+ПАРОЛЬ-->
		<template>
			<div class="text-center">
				<v-btn
						:to="{name: 'registration'}"
						rounded
						style="color: #00acc1; background-color: #2c3e50"
						color="primary"
						dark
				>
					Регистрация
				</v-btn>
			</div>
		</template>


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
                !this.$v.password.maxLength && errors.push('Имя должно быть не более 10 символов')
                !this.$v.password.required && errors.push('Имя обязательно.')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Должно быть действительной электронной почтой')
                !this.$v.email.required && errors.push('Должно быть действительной электронной почтой')
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
                    console.log(1 +'error')
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
	/*@import '@/../../node_modules/animate.css/animate';*/

	.login-form {
		padding: 20px;
	}
</style>