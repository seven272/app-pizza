<template>
  <ul class="cart-list sheet">
    <AppOnePizza
      v-for="(item, ind) in getPizzas" :key="ind"
      :pizza="item"
    ></AppOnePizza>
  </ul>
</template>

<script>
import AppOnePizza from '@/components/modules/builderCart/AppOnePizza.vue'
export default {
  name: 'TheOrders',
  components: {
    AppOnePizza
  },
  data () {
    return {
      arrPizza: []
    }
  },
  computed: {
    getPizzas () {
      return this.$store.state.arrayPizza
    }
  },
  methods: {
    // для примера поиск нужного элемента массива по ИД
    // plusPizza (idPizza) {
    //   const arrayPizza = this.getPizzas
    //   console.log('Выводим весь массив: ' + arrayPizza)
    //   const needPizza = this.getPizzas.find((item) => item.keyId === idPizza)
    // }
  }
}
</script>

<style>

</style>
