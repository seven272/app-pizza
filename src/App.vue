<template>
  <keep-alive>
    <component :is="layoutName">
      <router-view></router-view>
    </component>
  </keep-alive>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AuthLayout,
    EmptyLayout
  },
  // передаем методы для авторизации в компонент Login, а для выхода в компонет Authlayout
  provide () {
    return {
      login: this.login,
      logout: this.logout
    }
  },
  data () {
    return {
      // сделал ввиде обьекта isAuth, чтобы добавить реактивности provide inject
      // isAuth: {
      //   value: false
      // }
      // isAuth: this.$store.getters.getAuthUser
    }
  },
  created () {
    // https://vue-pizza1-default-rtdb.europe-west1.firebasedatabase.app/
    this.$store.dispatch('loadAddresses')
    this.$store.dispatch('loadOrders')
  },
  methods: {
    login () {
      // для имитации авторизации, если сразу выполнять метод то значение авторизован или нет пользователь отрабатывает некорректно
      setTimeout(() => {
        if (this.$store.getters.getAuthUser) {
          this.$router.push('/profile')
        } else {
          this.$router.push('/login')
        }
      }, 1000)
    },
    logout () {
      // this.isAuth.value = false
      this.$router.push('/home')
    }
  },
  computed: {
    layoutName () {
      const name = this.$route.meta.layout
      let layout = 'EmptyLayout'
      if (name === 'DefaultLayout' || name === 'AuthLayout') {
        if (this.$store.getters.getAuthUser) {
          layout = 'AuthLayout'
        } else if (!this.$store.getters.getAuthUser) {
          layout = 'DefaultLayout'
        }
      } else if (name === 'EmptyLayout') {
        layout = 'EmptyLayout'
      }
      return layout
    }
  }
}
</script>

<style lang="scss">

</style>
