<template>
   <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму регисстрации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Зарегистрируйтесь на сайте</h1>
    </div>
    <AppLoader class="load-component" v-if="isLoading"></AppLoader>

    <form action="" method="post" @submit.prevent="validateForm(), createPerson()">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail {{ form.email }}</span>
          <input type="email" name="email" placeholder="example@mail.ru" v-model="form.email">
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль {{ form.password }}</span>
          <input type="password" name="pass" placeholder="***********" v-model="form.password">
        </label>
      </div>
      <span class="color-text" v-show="errorMessage !== ''">{{ errorMessage }}</span>
        <button type="submit" class="button">Регистрация</button>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// auth это экспорт const auth = getAuth() из файла main.js
// eslint-disable-next-line no-unused-vars
import { auth } from '@/main.js'
import AppLoader from '@/components/AppLoader.vue'
import axios from 'axios'
export default {
  name: 'Register',
  inject: ['login'],
  components: {
    AppLoader
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMessage: '',
      isValid: false,
      isLoading: false
    }
  },
  methods: {
    validateForm () {
      if (this.form.email.length === 0 || this.form.password === '') {
        this.errorMessage = 'Заполните поля формы корректно'
        this.isValid = false
      } else {
        this.errorMessage = ''
        this.isValid = true
      }
    },
    createPerson () {
      if (this.isValid) {
        this.isLoading = true
        setTimeout(() => {
          this.$store.dispatch('registerUser', this.form)
          this.isLoading = false
          // метод из inject файл index.vue
          this.login()
        }, 500)
      }
    },
    async loadPeople () {
      const responce = await axios.get('https://vue-pizza1-default-rtdb.europe-west1.firebasedatabase.app/people.json')
      console.log('загружаем всех пользователей: ' + responce.data)
    }
  }
}
</script>
<style scoped>
  .load-component {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
</style>
