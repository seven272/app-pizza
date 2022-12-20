<template>
  <input type="radio" :name="nameButton" :value="valueButton" :class="classButton" :checked="isChecked">
</template>

<script>
export default {
  props: {
    nameButton: {
      type: String,
      required: false
    },
    valueButton: {
      type: String,
      required: false
    },
    classButton: {
      type: String,
      default: ''
    },
    selectorButton: {
      required: false
    }
  },
  inject: ['redactPizza'],
  data () {
    return {
    }
  },
  computed: {
    isChecked () {
      let boolean = false
      let dough = ''
      if (this.redactPizza.keyDough === 'на толстом тесте') {
        dough = 'Толстое'
      } else {
        dough = 'Тонкое'
      }
      if (this.selectorButton === this.redactPizza.keyMultiplier || this.selectorButton === this.redactPizza.keySauce || this.selectorButton === dough) {
        boolean = true
      }
      return boolean
    }
  }

}
</script>

<style>

</style>
