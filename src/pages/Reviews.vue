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

    <v-row justify="center">
      <v-col
          cols="12"
          md="6"
      >
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
            >
              Оставить отзыв
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                  color="primary"
                  dark
              >Ваш отзыв</v-toolbar>

              <v-card
                  style="padding: 20px;"
              >
                <template>
                  <div class="text-center">
                    <v-rating
                        v-model="rating"
                        background-color="yellow accent-4"
                        color="yellow accent-4"
                        dense
                        hover
                        size="20"
                        icon-label="custom icon label text {0} of {1}"
                    ></v-rating>
                  </div>
                  <form>
                    <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        :counter="10"
                        label="Имя"
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
                        v-model="text"
                        label="Ваш отзыв"
                        counter
                        maxlength="120"
                        full-width
                        single-line
                    ></v-textarea>
                    <v-checkbox
                        v-model="checkbox"
                        :error-messages="checkboxErrors"
                        label="Вы уверенны?"
                        required
                        @change="$v.checkbox.$touch()"
                        @blur="$v.checkbox.$touch()"
                    ></v-checkbox>
                  </form>
                </template>
              </v-card>

              <v-card-actions class="justify-end">
                <v-btn
                    color="success"
                    class="mr-4"
                    @click.prevent="submit"
                >
                  Оставить отзыв
                </v-btn>
                <v-btn
                    class="ma-2"
                    color="primary"
                    @click="clear"
                >
                  очистить
                </v-btn>
                <v-btn
                    text
                    @click="dialog.value = false"
                >Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <div>
          <v-timeline
              :dense="$vuetify.breakpoint.smAndDown"
          >
            <v-timeline-item
                v-for="review in arrayReviews"
                :key="review.id"
            >
            <span slot="opposite">
              {{review.time}}
            </span>
              <v-card class="elevation-2">
                <v-card-title class="headline">
                  {{review.name}}
                </v-card-title>
                <v-rating
                    v-model="review.rating"
                    background-color="yellow accent-4"
                    color="yellow accent-4"
                    dense
                    hover
                    size="20"
                    icon-label="custom icon label text {0} of {1}"
                >

                </v-rating>
                <v-card-text>
                  {{review.text}}
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
                  background-color="yellow accent-4"
                  color="yellow accent-4"
                  dense
                  hover
                  size="20"
                  icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </div>
            <form>
              <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="10"
                  label="Имя"
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
                  v-model="text"
                  label="Ваш отзыв"
                  counter
                  maxlength="120"
                  full-width
                  single-line
              ></v-textarea>
              <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Вы уверенны?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn
                  color="success"
                  class="mr-4"
                  @click.prevent="submit"
              >
                Оставить отзыв
              </v-btn>
              <v-btn
                  class="ma-2"
                  color="primary"
                  @click="clear"
              >
                очистить
              </v-btn>
            </form>
          </template>
        </v-card>
      </v-col>
    </v-row>

<!--    <form class="contact-form" @submit.prevent="sendEmail">-->
<!--      <label>Name</label>-->
<!--      <input type="text" name="user_name">-->
<!--      <label>Email</label>-->
<!--      <input type="email" name="user_email">-->
<!--      <label>Message</label>-->
<!--      <textarea name="message"></textarea>-->
<!--      <input type="submit" value="Send">-->
<!--    </form>-->

  </div>
</template>

<script>
// import emailjs from 'emailjs-com'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
import Swal from "sweetalert2"
// import store from '@/vuex/store'

export default {
  mixins: [validationMixin],

  validations: {
    text: { required, maxLength: maxLength(100) },
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    rewiews: {},
    rating: 0,
    text: '',
    name: '',
    email: '',
    select: null,
    checkbox: false,
    arrayReviews: [],
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
    ...mapActions([
      'createNewReview',
    ]),
    // sendEmail: (e) => {
    //   emailjs.sendForm('service_15t08y8', 'template_s8jvt4n', e.target, 'user_gHITX6UwAIhnOqpimFA58')
    //       .then((result) => {
    //         console.log('SUCCESS!', result.status, result.text);
    //       }, (error) => {
    //         console.log('FAILED...', error);
    //       });
    // },
    async submit () {
      this.$v.$touch()
      Swal.fire({
        title: 'Загрузка...',
        text: '',
        imageUrl: '352.gif' || '~~/assets/352.gif',
        showConfirmButton: false
      })

      const payload = {
        text: this.text,
        rating: this.rating,
        name: this.name,
        email: this.email,
        createdAt: Date.now()
      }
      await this.createNewReview( payload )
      // store.dispatch('createNewReview', payload)

      try {
        this.get_reviews()

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Коментарий добавлен!!!',
          showConfirmButton: false,
          timer: 1500
        })

        this.clear()
      } catch (error) {
        Swal.fire({
          title: 'Помилка завантаження...',
          text: error
        })
      }
    },
    clear (){
      this.$v.$reset()
      this.text = ''
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    async get_reviews () {
      const response = await fetch('https://online-shop-34af2.firebaseio.com/reviews.json')
      const data = await response.json()

      this.arrayReviews = Object.keys(data).map(key => {
        return { ...data[key], id: key }
      })
    }
  },
  mounted () {
    this.get_reviews()
  }
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