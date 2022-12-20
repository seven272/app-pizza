<template>
   <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="require('@/assets/img/' + item.image)" width="39" height="60" :alt="item.name">
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button type="button" class="counter__button counter__button--minus" :disabled="disabledBtn" @click="minusProduct">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" :value="counter">
        <button type="button" class="counter__button counter__button--plus counter__button--orange" @click="plusProduct">
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>× {{ newPrice }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AppOtherProduct',
  emits: ['sentProduct'],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      firstPrice: this.item.price,
      newPrice: this.item.price,
      counter: 0
    }
  },
  computed: {
    disabledBtn () {
      let boolean = false
      if (this.counter === 0) {
        boolean = true
      } else {
        boolean = false
      }
      return boolean
    }
  },
  methods: {
    plusProduct () {
      this.counter++
      this.newPrice = this.firstPrice * this.counter
      this.makeOrderProduct()
    },
    minusProduct () {
      this.counter--
      this.newPrice = this.firstPrice * this.counter
      this.makeOrderProduct()
    },
    makeOrderProduct () {
      const objProduct = {}
      objProduct.id = this.item.id
      objProduct.name = this.item.name
      objProduct.price = this.newPrice
      objProduct.counter = this.counter
      this.$emit('sentProduct', objProduct)
    }
  }

}
</script>

<style>

</style>
