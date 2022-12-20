<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <AppLoader class="load-component" v-if="isLoading"></AppLoader>
    <form action="" method="post" @submit.prevent="validateForm(), loginPerson()">
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
        <button type="submit" class="button">Авторизоваться</button>
    </form>
    <router-link to="/register">
      <h3 class="title-text">Регистрация</h3>
    </router-link>
  </div>

</template>

<script>
import { baseUrl } from '@/_config.js'
import AppLoader from '@/components/AppLoader.vue'
export default {
  name: 'Login',
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
      baseUrl: baseUrl,
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
    async loginPerson () {
      if (this.isValid) {
        this.isLoading = true
        setTimeout(() => {
          this.$store.dispatch('loginUser', this.form)
          this.isLoading = false
          // метод из inject файл index.vue
          this.login()
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  .color-text {
    display: block;
    color: red;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    bottom: 5px 0 5px 15px;
  }
  .title-text {
    display: block;
    color: grey;
    text-decoration: underline;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    bottom: 15px 0 0px 0px;
  }
  .load-component {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

</style>
