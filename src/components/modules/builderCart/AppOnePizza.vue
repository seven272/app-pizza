<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
      <div class="product__text">
        <h2>{{ pizza.keyName }}</h2>
        <ul>
          <li>{{ pizza.keySize }}, {{ pizza.keyDough }}</li>
          <li>Соус: {{ pizza.keySauce }}</li>
          <li>Начинка: {{ pizza.keyListIngred }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus" :disabled="disabledBtn" @click="minusPizza(pizza.keyPrice), sentOrder()">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="counter">
      <button type="button" class="counter__button counter__button--plus counter__button--orange" @click="plusPizza(pizza.keyPrice), sentOrder()">
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ counter === 1 ? pizza.keyPrice : pizza.keyTotalPrice }}</b>
      <!-- <b>{{ pizza.keyPrice }}</b> -->
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza(pizza.keyId)">Изменить</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AppOnePizza',
  props: {
    pizza: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      id: this.pizza.keyId,
      counter: 1,
      price: 0,
      isDisabled: false
    }
  },
  computed: {
    disabledBtn () {
      let boolean = false
      if (this.counter === 0) {
        boolean = true
      } else if (this.counter >= 1) {
        boolean = false
      }
      return boolean
    }
  },
  methods: {
    plusPizza (value) {
      this.counter++
      this.price = value * this.counter
    },
    minusPizza (value) {
      this.counter--
      this.price = value * this.counter
    },
    sentOrder () {
      const objectItem = {}
      objectItem.quantity = this.counter
      objectItem.price = this.price
      objectItem.id = this.id
      this.$store.commit('changePricePizza', objectItem)
    },
    changePizza (id) {
      this.$store.commit('redactPizza', id)
      this.$router.push('/')
    }
  }

}
</script>

<style>

</style>
