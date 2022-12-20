<template>
<!-- {{ changeIngred }} -->
  <li class="ingredients__item"
    :draggable="isDrag"
    @dragstart="onDrag($event, ingredId, counter)"
  >
      <span class="filling" :class="`filling--${ingredStyle}`"><slot></slot></span>
      <div class="counter counter--orange ingredients__counter">
        <button type="button" class="counter__button counter__button--minus" @click="clickMinus" :disabled="counter === 0">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" :value="counter">
        <button type="button" class="counter__button counter__button--plus" @click="clickPlus" :disabled="counter === 3">
          <span class="visually-hidden">Больше</span>
        </button>
      </div>
    </li>
</template>

<script>
export default {
  props: {
    ingredStyle: {
      type: String,
      default: ''
    },
    ingredPrice: {
      type: Number,
      default: 0
    },
    ingredId: {
      type: Number,
      default: 0
    },
    ingredName: {
      type: String,
      required: true
    },
    ingredIdFromDrop: {
      type: Object,
      default: () => {}
    },
    modifyIngredients: {
      type: Array,
      default: () => [],
      required: false
    }

  },
  inject: ['redactPizza'],
  data () {
    return {
      counter: 0,
      sum: 0,
      id: this.ingredId,
      name: this.ingredName,
      newArr: this.modifyIngredients
    }
  },
  methods: {
    clickMinus () {
      this.counter--
      this.sum = this.ingredPrice * this.counter
      this.sentTotalData()
    },
    clickPlus () {
      this.counter++
      this.sum = this.ingredPrice * this.counter
      this.sentTotalData()
    },
    sentTotalData () {
      this.$emit('ingredientData', this.sum, this.id, this.name, this.counter)
    },
    // данные передаем в компонент ThePizzaView
    onDrag (evt, id, count) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      const objIngred = {
        id: id,
        count: count
      }
      evt.dataTransfer.setData('ingredID', JSON.stringify(objIngred))
    },
    changeIng () {
      // if (this.redactPizza.keyArrayIngred) {
      //   const arr = this.redactPizza.keyArrayIngred
      const arr = this.modifyIngredients
      if (arr.length > 0) {
        arr.forEach((ingredient) => {
          if (ingredient.id === this.id) {
            this.counter = ingredient.counterClick
          }
        })
      }
      // }
    }
  },
  watch: {
    // создаем вотчер с глубоким наблюдением за обьектом который получаем через пропы, вытаскиваем у него id  и сравниваем. Если ид совпадает то выполняем код
    ingredIdFromDrop: {
      handler () {
        const id = Number(this.ingredIdFromDrop.id)
        if (id === this.id) {
          this.counter++
          this.sum += this.ingredPrice
          this.sentTotalData()
        }
      },
      deep: true
    },
    redactPizza: {
      handler (newVal, oldVal) {
        // console.log('выводим старый массив ингредиентов ' + oldVal + ' выводим новый массви ингридиентов ' + newVal)
        this.changeIng()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    countingClicks () {
      if (this.counter === 0 || this.counter === 3) {
        return true
      }
      return false
    },
    isDrag () {
      if (this.counter === 3) {
        return false
      }
      return true
    }
  }

}
</script>

<style>

</style>
