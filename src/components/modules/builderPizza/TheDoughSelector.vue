<template>
  <div class="sheet__content dough">
    <label class="dough__input dough__input--light" :class="`dough__input--${itemDough.style}`" v-for="(itemDough, ind) in dough" :key="ind">
      <AppRadioButton
        :nameButton = "'dought'"
        :valueButton = "itemDough.style"
        :classButton="'visually-hidden'"
        @click="$emit('sentDoughValue', itemDough.name)"
        :selector-button = "itemDough.name"
      ></AppRadioButton>
      <b>{{ itemDough.name }}</b>
      <span>{{ itemDough.description }}</span>
    </label>
  </div>
</template>

<script>
import jsonPizza from '@/static/pizza.json'
import AppRadioButton from '@/components/AppRadioButton.vue'
export default {
  emits: ['sentDoughValue'],
  components: {
    AppRadioButton
  },
  data () {
    return {
      dough: jsonPizza.dough
    }
  }
}
</script>

<style>

</style>
