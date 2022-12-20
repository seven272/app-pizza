<template>
  <li class="order__item" v-for="(pizza, ind) in pizzas" :key="ind">
      <div class="product">
        <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" :alt="pizza.keyName">
        <div class="product__text">
          <h2>{{ pizza.keyName }}</h2>
          <ul>
            <li>{{ pizza.keySize }}, {{ pizza.keyDough }}</li>
            <li>Соус: {{ pizza.keySauce }}</li>
            <li>Начинка: {{pizza.keyListIngred}}</li>
          </ul>
        </div>
      </div>
      <p class="order__price">{{ pizza.keyCounter }} x {{ pizza.keyPrice }} ₽</p>
  </li>
</template>

<script>
export default {
  name: 'AppOrderPizzas',
  props: {
    pizzas: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style>

</style>
