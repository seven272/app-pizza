<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input type="text" name="pizza_name" placeholder="Введите название пиццы" v-model="namePizza" @input="sentNamePizza">
  </label>

  <div class="content__constructor"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div :class="`pizza pizza--foundation--${definingDoughClass}-${definingSauceClass}`">
      <div class="pizza__wrapper">
        <div class="pizza__filling" :class="item" v-for = "(item, ind) in ingredientsList" :key="ind"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['ingredNumber', 'namePizza'],
  inject: ['redactPizza'],
  props: {
    sauceView: {
      type: String,
      default: 'tomato'
    },
    doughView: {
      type: String,
      default: 'Толстое'
    },
    ingredView: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // формируем имя исходя из того - новая эта пицца или редактируем уже добавленную в корзину
      namePizza: this.redactPizza.keyName !== '' ? this.redactPizza.keyName : '',
      dictionary: {
        ананас: 'pizza__filling--ananas',
        бекон: 'pizza__filling--bacon',
        'блю чиз': 'pizza__filling--blue_cheese',
        чеддер: 'pizza__filling--cheddar',
        чили: 'pizza__filling--chile',
        халапеньо: 'pizza__filling--jalapeno',
        моцарелла: 'pizza__filling--mozzarella',
        грибы: 'pizza__filling--mushrooms',
        маслины: 'pizza__filling--olives',
        лук: 'pizza__filling--onion',
        пармезан: 'pizza__filling--parmesan',
        салями: 'pizza__filling--salami',
        лосось: 'pizza__filling--salmon',
        томаты: 'pizza__filling--tomatoes'
      }
    }
  },
  computed: {
    // определяем класс соуса
    definingSauceClass () {
      let sauce = 'tomato'
      if (this.sauceView === 'creamy' || this.redactPizza.keySauce === 'сливочный') {
        sauce = 'creamy'
      } else if (this.sauceView === 'tomato' || this.redactPizza.keySauce === 'томатный') {
        sauce = 'tomato'
      }
      return sauce
    },
    // определяем класс теста
    definingDoughClass () {
      let classDough = 'big'
      if (this.doughView === 'Тонкое' || this.redactPizza.keyDough === 'на тонком тесте') {
        classDough = 'small'
      } else if (this.doughView === 'Толстое' || this.redactPizza.keyDough === 'на толстом тесте') {
        classDough = 'big'
      }
      return classDough
    },
    // определяем класс выбранных ингидиентов, сначала проверяем на совпадение имени выбранного ингредиента с именем в словаре, если совпало, то смотрим какое количество данного ингрединета выбрал юзер(от 1 до 3) и добавляем дополнительный класс. Потом классы складываем в массив и его же возвращаем и проводим в темплейте по нему итерацию
    ingredientsList () {
      const arrClassIngred = []
      this.ingredView.forEach((elem) => {
        for (const name in this.dictionary) {
          if (name === elem.name.toLowerCase()) {
            if (elem.counterClick === 2) {
              arrClassIngred.push(`${this.dictionary[name]} pizza__filling--second`)
            } else if (elem.counterClick === 3) {
              arrClassIngred.push(`${this.dictionary[name]} pizza__filling--third`)
            } else {
              arrClassIngred.push(this.dictionary[name])
            }
          }
        }
      })
      return arrClassIngred
    }
  },
  methods: {
  // эмитим в Index.vue а оттуда через пропы снова передаем данные в компонент AppIngredient.vue
    onDrop (evt) {
      const ingredID = JSON.parse(evt.dataTransfer.getData('ingredID'))
      this.$emit('ingredNumber', ingredID)
    },
    sentNamePizza () {
      if (this.namePizza.length >= 1) {
        this.$emit('namePizza', this.namePizza)
      }
    }
  }
}
</script>

<style>

</style>
