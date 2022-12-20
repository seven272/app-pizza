<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{this.$store.getters.totalPriceOrder}} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/profile">
        <picture>
          <source type="image/webp" srcset="@/assets/img/users/user5.webp 1x, @/assets/img/users/user5@2x.webp 2x">
          <img src="@/assets/img/users/user5.jpg" srcset="@/assets/img/users/user5@2x.jpg" alt="Василий Ложкин" width="32" height="32">
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <router-link to="/home" class="header__logout" @click="makeLogout"><span>Выйти</span></router-link>
    </div>
  </header>
  <!-- добавляем слоты чтобы мог отображаться контент передаваемого компонента -->
    <slot></slot>
</template>

<script>
export default {
  inject: ['logout'],
  methods: {
    makeLogout () {
      this.$store.dispatch('logoutUser')
      this.logout()
    }
  }

}
</script>

<style>

</style>
