<template>

  <main class="layout">
     <SidebarLayout></SidebarLayout>
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
    </div>
      <AppOrder
      v-for="(order, ind) in getOrders" :key="ind"
      :my-order="order"
      ></AppOrder>
    </div>
  </main>
</template>

<script>
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import AppOrder from '@/components/modules/builderOrder/AppOrder.vue'
export default {
  name: 'Orders',
  components: {
    SidebarLayout,
    AppOrder
  },
  computed: {
    getOrders () {
      // return this.$store.state.orders
      return this.$store.getters.getOrders
    }
  }
}
</script>

<style>

</style>
