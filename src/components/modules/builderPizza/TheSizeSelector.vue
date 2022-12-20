<template>
  <div class="sheet__content diameter">
    <label class="diameter__input" :class="`diameter__input--${size.value}`" v-for="(size, ind) in sizes" :key="ind">
      <AppRadioButton
        :nameButton = "'diameter'"
        :valueButton = "size.value"
        :selectorButton = "size.multiplier"
        classButton="visually-hidden"
        @click="$emit('sentSizemultiplier', size.multiplier)"
      ></AppRadioButton>
      <span>{{ size.name }}</span>
    </label>
  </div>
</template>

<script>
import jsonPizza from '@/static/pizza.json'
import AppRadioButton from '@/components/AppRadioButton.vue'
export default {
  emits: ['sentSizemultiplier'],
  inject: ['redactPizza'],
  components: {
    AppRadioButton
  },
  data () {
    return {
      sizes: jsonPizza.sizes
    }
  },
  watch: {
    redactPizza: {
      handler () {
        this.modifyPizzaSize()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // данный метод эмитит размер редактируемой пиццы в компонент Index для расчета итоговой цен пиццы
    modifyPizzaSize () {
      this.$emit('sentSizemultiplier', this.redactPizza.keyMultiplier)
    }
  }
}
</script>

<style>

</style>
