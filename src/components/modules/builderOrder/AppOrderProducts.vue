<template>
  <ul class="order__additional">
    <AppOrderProduct v-for="(item, ind) in products" :key="ind" :product="item"></AppOrderProduct>
  </ul>

</template>

<script>
import AppOrderProduct from '@/components/modules/builderOrder/AppOrderProduct.vue'
export default {
  name: 'AppOrderProducts',
  components: {
    AppOrderProduct
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style>

</style>
