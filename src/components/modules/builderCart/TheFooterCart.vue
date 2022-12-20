<template>
  <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">Хочу еще одну</router-link>
      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{ this.$store.getters.totalPriceOrder }} ₽</b>
      </div>

      <div class="footer__submit">
        <router-link to="/popup">
          <button type="submit" class="button" @click="sentOrder">Оформить заказ</button>
        </router-link>
      </div>
    </section>
</template>

<script>
export default {
  name: 'TheFooterCart',
  methods: {
    sentOrder () {
      // this.$store.commit('buildArrOrders')
      this.$store.dispatch('addOrder')
    }
  }

}
</script>

<style>

</style>
