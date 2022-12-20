<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ this.$store.getters.totalPriceOrder }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/login" class="header__login"><span>Войти</span></router-link>
    </div>
  </header>
  <!-- добавляем слоты чтобы мог отображаться контент передаваемого компонента -->
    <slot></slot>
</template>

<script>
export default {
  methods: {
    // пример програмной навигации, удобно применять для кнопок. пример: <button @click="goToCart"> Корзина </button>
    // goToCart () {
    //   this.$router.push('/cart')
    // }
  }

}
</script>

<style>

</style>
