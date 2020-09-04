<template>
	<div class="">
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
		<template>
			<v-form
					@submit.prevent="submitHandler"
					ref="form"
					v-model="valid"
					lazy-validation
			>
				<v-text-field
						id="name"
						v-model.trim="name"
						:counter="3"
						:rules="nameRules"
						label="Имя"
						required
				></v-text-field>

				<v-text-field
						id="email"
						v-model.trim="email"
						:rules="emailRules"
						label="E-mail"
						required
				></v-text-field>

				<v-text-field
						id="password"
						v-model.trim="password"
						:rules="passwordRules"
						label="Пароль"
						required
				></v-text-field>


				<v-btn
						:disabled="!valid"
						class="mr-4"
						@click="validate"
						type="submit"
						style="margin: 5px; background-color: forestgreen;"
				>
					Зарегестрироваться
				</v-btn>

				<v-btn
						class="mr-4"
						@click="reset"
						style="margin: 5px; background-color: forestgreen;"
				>
					Очистить форму
				</v-btn>

			</v-form>
		</template>
	</div>
</template>

<script>
    export default {
        name: 'registration',
        data: () => ({
            valid: true,
            nameRules: [
                v => !!v || 'Имя обязательно',
                v => (v && v.length >= 3) || 'Имя должно быть не меньше 3 символов',
            ],
            email: '',
            password: '',
            name: '',
            emailRules: [
                v => !!v || 'E-mail обязателен',
                v => /.+@.+\..+/.test(v) || 'Электронная почта должна быть действительной',
            ],
            passwordRules: [
                v => !!v || 'Пароль обязателен',
            ],
            checkbox: false,
        }),

        methods: {
            async submitHandler() {

                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }

                try {
                    await this.$store.dispatch('register', formData)
                    this.$router.push('/')
                } catch (e) {
                    console.log('error')
								}
            },
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
        },
    }
</script>

<style scoped>

</style>