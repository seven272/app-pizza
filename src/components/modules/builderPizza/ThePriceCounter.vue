<template>
  <div class="content__result">
    <p>Итого: {{ pricePizza }} ₽</p>
    <router-link to="/cart">
      <button type="button" class="button" :disabled="checkNameAndIngredints" @click="$emit('sent', pricePizza)">Готовьте!</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ThePriceCounter',
  emits: ['sent'],
  inject: ['redactPizza'],
  props: {
    pricePizza: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    arrIngredients: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isDisabled: true
    }
  },
  computed: {
    checkNameAndIngredints () {
      let isDisabled = true
      if (this.title !== '' && this.arrIngredients.length > 0) {
        isDisabled = false
      }
      return isDisabled
    }
  }

}
</script>

<style>

</style>
