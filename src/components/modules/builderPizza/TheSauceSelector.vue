<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
      <label class="radio ingredients__input" v-for="(sauce, ind) in sauces" :key="ind">
      <AppRadioButton
        :nameButton = "'sauce'"
        :valueButton = "sauce.value"
        @click = "$emit('sentSauceValue', sauce.value)"
        :selector-button="sauce.name.toLowerCase()"
      ></AppRadioButton>
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import jsonPizza from '@/static/pizza.json'
import AppRadioButton from '@/components/AppRadioButton.vue'
export default {
  emits: ['sentSauceValue'],
  components: {
    AppRadioButton
  },
  data () {
    return {
      sauces: jsonPizza.sauces
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
