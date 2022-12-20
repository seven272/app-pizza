<template>
   <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ number }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ price }} ₽</span>
    </div>

    <div class="order__button">
      <button type="button" class="button button--border" @click="deleteOrd(objOrder.key)">Удалить</button>
    </div>
    <div class="order__button">
      <button type="button" class="button" @click="repeatOrd(objOrder)">Повторить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppOrderSum',
  props: {
    price: {
      type: Number
    },
    number: {
      type: String,
      default: '1'
    },
    id: {
      type: String,
      required: false
    },
    objOrder: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    deleteOrd (key) {
      // this.$store.commit('deleteOrder', key)
      this.$store.dispatch('deleteOrder', key)
    },
    repeatOrd (order) {
      // this.$store.commit('repeatOrder', order)
      this.$store.dispatch('repeatOrder', order)
    }
  }

}
</script>

<style>

</style>
