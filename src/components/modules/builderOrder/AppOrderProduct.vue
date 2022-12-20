<template>
  <li>
    <img :src="getName" width="20" height="30" :alt="product.name">
    <p>
      <span>{{ product.name }}</span>
      <b> {{ product.counter}} шт. {{ product.price }} ₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: 'AppOrderProduct',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getName () {
      let title = ''
      if (this.product.id === 1) {
        title = 'cola'
      } else if (this.product.id === 2) {
        title = 'sauce'
      } else {
        title = 'potato'
      }
      // @/assets/img/${getName}.svg
      return require(`@/assets/img/${title}.svg`)
      // return title
    }
  }

}
</script>

<style>

</style>
