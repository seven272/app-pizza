<template>
  <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </router-link>
      <router-link class="layout__link"  to="/orders">История заказов</router-link>
      <router-link class="layout__link"  to="/profile">Мои данные</router-link>
      <!-- для примера - начало кода -->
        <!-- <router-link ref="history" class="layout__link" :class="{'layout__link--active': isActiveHistory}" to="/orders" @click="classHistory">История заказов</router-link> -->
        <!-- <router-link ref="profile" class="layout__link" :class="{'layout__link--active': isActiveProfile}"  to="/profile" @click="classProfile">Мои данные</router-link> -->
      <!-- для примера - конец кода -->
    </div>
</template>

<script>
export default {
  name: 'SidebarLayout',
  data () {
    return {
      isActiveHistory: false,
      isActiveProfile: false
    }
  },
  computed: {
  },
  methods: {
    // проверяем есть ли класс active у элемента, этот класс автоматом добавляет роутер при клике. Если такой класс есть, то мы в коде динамически добавляем уже свой активный класс (layout__link--active). П.С. Оставил просто для примера. В коде реализовал витоге добавлением стилей классу router-link-active
    classHistory () {
      const booleanIsClass = this.$refs.history.$el.classList.contains('active')
      if (booleanIsClass) {
        this.isActiveHistory = true
      } else {
        this.isActiveHistory = false
      }
    },
    classProfile () {
      const booleanIsClass = this.$refs.profile.$el.classList.contains('active')
      if (booleanIsClass) {
        this.isActiveProfile = true
      } else {
        this.isActiveProfile = false
      }
    }
  }
}
</script>

<style scoped>
  .router-link-active {
    background-color: rgba(65,182,25,.1);
  }
</style>
