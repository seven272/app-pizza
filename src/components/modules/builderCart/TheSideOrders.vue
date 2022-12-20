<template>
  <div class="cart__additional">
          <ul class="additional-list">
             <AppOtherProduct
             v-for="(product, ind) in products" :key="ind"
             :item="product"
             @sent-product="formingArrayProducts"
             ></AppOtherProduct>
          </ul>
        </div>
</template>

<script>
import jsonProducts from '@/static/misc.json'
import AppOtherProduct from '@/components/modules/builderCart/AppOtherProduct.vue'

export default {
  name: 'TheSideOrders',
  components: {
    AppOtherProduct
  },
  data () {
    return {
      products: jsonProducts,
      arrProducts: [],
      totalPriceProducts: 0

    }
  },
  methods: {
    // с помощью метода some проверяем на наличие в массиве добовляемого продукта, если нет то добавляем, если есть то заменяемн на новый
    formingArrayProducts (product) {
      const value = this.arrProducts.some(item => item.id === product.id)
      if (value === false) {
        this.arrProducts.push(product)
      } else if (value) {
        const ind = this.arrProducts.findIndex(item => item.id === product.id)
        // найденный выше индекс подставляем в метод сплайс, удаляем этот элемент и на его место тут же вставляем новый обьект пришедший по эмит
        this.arrProducts.splice(ind, 1, product)
      }
      this.totalPriceProducts = this.arrProducts.reduce((sum, elem) => sum + elem.price, 0)
      // находим сумму с помощью forEach для примера
      // this.totalPriceProducts = 0
      // this.arrProducts.forEach((item) => {
      //   this.totalPriceProducts += item.price
      // })
      // console.log('данный из модуля массив' + this.arrProducts[0].name)
      this.$store.commit('priceProducts', this.totalPriceProducts)
      this.$store.commit('addProduct', this.arrProducts)
    }
  }

}
</script>

<style>

</style>
