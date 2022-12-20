<template>
  <section class="sheet order">
  <AppOrderSum
    :price="myOrder.price"
    :number="myOrder.id"
    :id="myOrder.id"
    :objOrder="myOrder"
  ></AppOrderSum>

  <ul class="order__list">
    <AppOrderPizzas
      :pizzas="myOrder.pizzas"
    ></AppOrderPizzas>
  </ul>

  <AppOrderProducts
  :products="myOrder.products"
  ></AppOrderProducts>

  <AppOrderAddress
  :address="myOrder.address"
  ></AppOrderAddress>
  </section>
</template>

<script>
import AppOrderSum from '@/components/modules/builderOrder/AppOrderSum.vue'
import AppOrderPizzas from '@/components/modules/builderOrder/AppOrderPizzas.vue'
import AppOrderProducts from '@/components/modules/builderOrder/AppOrderProducts.vue'
import AppOrderAddress from '@/components/modules/builderOrder/AppOrderAddress.vue'
export default {
  name: 'AppOrder',
  props: {
    myOrder: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  components: {
    AppOrderSum,
    AppOrderPizzas,
    AppOrderProducts,
    AppOrderAddress
  },
  data () {
    return {}
  }

}
</script>

<style>

</style>
