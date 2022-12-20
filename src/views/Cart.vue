<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-show="$store.getters.totalPriceOrder === 0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <TheOrders></TheOrders>

        <TheSideOrders></TheSideOrders>

        <TheContactCart></TheContactCart>

      </div>
    </main>
      <TheFooterCart></TheFooterCart>
  </form>
</template>

<script>
import TheOrders from '@/components/modules/builderCart/TheOrders.vue'
import TheSideOrders from '@/components/modules/builderCart/TheSideOrders.vue'
import TheContactCart from '@/components/modules/builderCart/TheContactCart.vue'
import TheFooterCart from '@/components/modules/builderCart/TheFooterCart.vue'
export default {
  components: {
    TheOrders,
    TheSideOrders,
    TheContactCart,
    TheFooterCart
  }

}
</script>

<style>

</style>
