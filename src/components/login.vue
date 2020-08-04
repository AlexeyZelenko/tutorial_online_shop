<template>
	<form class="login-form">
		<v-text-field
				v-model="name"
				:error-messages="nameErrors"
				:counter="10"
				label="Name"
				required
				@input="$v.name.$touch()"
				@blur="$v.name.$touch()"
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
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'
    import Swal from 'sweetalert2'

    export default {
        name: "loginAdmin",
        mixins: [validationMixin],

        validations: {
            name: {required, maxLength: maxLength(10)},
            email: {required, email},
        },

        data: () => ({
            name: '',
            email: '',
        }),

        computed: {
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Ім’я має бути не більше 10 символів')
                !this.$v.name.required && errors.push('Ім\'я обов\'язково.')
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
            submit() {

                if (this.name === 'admin' && this.email === 'admin@admin.admin') {
                    // this.$v.$touch()
                    console.log(1234567)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ласкаво просимо, адміністратор!',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        showConfirmButton: false,
                        timer: 1600
                    })
                    this.$router.push('/admin')
                }
            },
            clear() {
                this.$v.$reset()
                this.name = ''
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