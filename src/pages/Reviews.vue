<template>
  <div
      class="reviews-information"
      style="margin: 20px"
  >
    <v-btn
        :to="{name: 'catalog'}"
        block
        class="main-color-btn"
        style="background-color: black; color: #ecfcf0; margin-bottom: 19px"
    >
      <v-icon dark left>mdi-arrow-left</v-icon>
      Каталог товаров
    </v-btn>
    <v-row align="center">
      <v-col
          cols="12"
          md="6"
      >
        <div>
          <v-timeline
              :dense="$vuetify.breakpoint.smAndDown"
          >
            <v-timeline-item
                v-for="n in arrayReviews"
                :key="n"
            >
            <span slot="opposite">
              {{n.time}}
            </span>
              <v-card class="elevation-2">
                <v-card-title class="headline">
                  {{n.name}}
                </v-card-title>
                <v-card-text>
                  {{n.text}}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-col>
      <v-col
          cols="12"
          md="6"
          class="px-2"
      >
        <v-card
            style="padding: 20px; max-width: 500px"
        >
          <template>
            <div class="text-center">
              <v-rating
                  v-model="rating"
                  icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </div>
            <form>
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
              <v-divider></v-divider>
              <v-textarea
                  v-model="title"
                  label="Ваш отзыв"
                  counter
                  maxlength="120"
                  full-width
                  single-line
              ></v-textarea>
              <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Do you agree?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn
                  class="mr-4"
                  @click="submit"
              >
                отправить
              </v-btn>
              <v-btn @click="clear">
                очистить
              </v-btn>
            </form>
          </template>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(100) },
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    rating: 0,
    title: '',
    name: '',
    email: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
    arrayReviews: [
      {
        id: 1,
        name: 'Алексей',
        text: 'Хорошая компания!',
        time: '12.03.2021'
      },
      {
        id: 2,
        name: 'Вася',
        text: 'Понравилось обслуживание!',
        time: '23.03.2021'
      },
      {
        id: 3,
        name: 'Вася',
        text: 'Понравилось обслуживание!',
        time: '12.02.2021'
      }
    ],
    reverse: true,
  }),
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Вы должны согласиться, чтобы продолжить!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Обязательно!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Имя должно состоять не более чем из 10 символов.')
      !this.$v.name.required && errors.push('Имя обязательно.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Должен быть действующий e-mail')
      !this.$v.email.required && errors.push('Электронная почта обязательна')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.title = ''
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>

<style lang="scss">
.reviews-information {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;

  &_image {
    width: 300px;
  }
}
</style>