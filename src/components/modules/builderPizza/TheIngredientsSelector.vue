<template>
  <ul class="ingredients__list">
    <AppIngredient v-for="(ingredient, ind) in ingredients" :key="ind"
    :ingredStyle = "ingredient.style"
    :ingredPrice = "ingredient.price"
    :ingredId = "ingredient.id"
    :ingredName = "ingredient.name"
    :ingredIdFromDrop = "ingredIdFromDrop"
    :modify-ingredients = "modifyIngredients"
    @ingredientData = "workWithIngredients"
    >
    {{ ingredient.name }}
    </AppIngredient>
  </ul>
</template>

<script>
import jsonPizza from '@/static/pizza.json'
import AppIngredient from '@/components//modules/builderPizza/AppIngredient.vue'
export default {
  emits: ['ingredientNameAndCount'],
  inject: ['redactPizza'],
  props: {
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
  components: {
    AppIngredient
  },
  data () {
    return {
      ingredients: jsonPizza.ingredients,
      selectedIngredients: [],
      flagRedact: this.$store.state.flagRedactPizza
    }
  },
  computed: {
    totalAmount () {
      const totalAmount = this.selectedIngredients.reduce(
        function (sum, currentIngred) {
          return sum + currentIngred.price
        }, 0

      )
      return totalAmount
    }
  },
  watch: {
    flagRedact: {
      handler () {
        this.addModifyIngredients()
        this.flagRedact = 0
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addModifyIngredients () {
      if (this.flagRedact === 1) {
        this.redactPizza.keyArrayIngred.forEach((item) => {
          this.selectedIngredients.push(item)
        })
        this.$emit('ingredientNameAndCount', this.selectedIngredients)
      }
    },
    // создаем обьект dataIngred со значениями переданными из компонента отдельного ингредиента - id и общая цена ингедиента взависимости от количества,дальше если массив не пустой проверяем по ИД есть ли такой ингредиент уже в массиве, если есть то находим по индексу и заменяем общую стоимость на новую, если стоимость = 0 , то удаляем этот элемент из массива, если ингредиента еще нет в массиве(проверяем с помощью indexOf) то добавляем в массив новый элемент
    workWithIngredients (sum, id, name, click) {
      const dataIngred = {
        id: id,
        price: sum,
        name: name,
        counterClick: click
      }
      if (this.selectedIngredients.length === 0) {
        this.selectedIngredients.push(dataIngred)
      } else if (this.selectedIngredients.length > 0) {
        const ingred = this.selectedIngredients.find(item => item.id === id)
        if (ingred) {
          ingred.price = sum
          ingred.counterClick = click
          if (ingred.price === 0) {
            const index = this.selectedIngredients.findIndex(item => item.price === 0)
            this.selectedIngredients.splice(index, 1)
          }
        } else if (this.selectedIngredients.indexOf(dataIngred.id) === -1) {
          this.selectedIngredients.push(dataIngred)
        }
      }
      this.$emit('ingredientNameAndCount', this.selectedIngredients)
    }
  }
}
</script>

<style>

</style>
