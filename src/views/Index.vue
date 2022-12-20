<template>
  <body>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <TheDoughSelector
            @sentDoughValue = "changeDough"
            ></TheDoughSelector>
          </div>
        </div>
        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <TheSizeSelector
              @sentSizemultiplier = "changeSize"
            ></TheSizeSelector>
          </div>
        </div>
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
            <div class="sheet__content ingredients">
              <TheSauceSelector
                @sentSauceValue = "changeSauce"
              ></TheSauceSelector>
              <div class="ingredients__filling">
                <p>Начинка:</p>
                <TheIngredientsSelector
                @ingredientNameAndCount ='getNameandCount'
                :ingredIdFromDrop="receivedIngredId"
                :modify-ingredients="getModifyPizza.keyArrayIngred"
                ></TheIngredientsSelector>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <ThePizzaView
          :sauceView = "sauce"
          :doughView = "dough"
          :ingredView = "arraySelectedIngredients"
          @ingredNumber = "getIdIngred"
          @namePizza = "getNamePizza"
          ></ThePizzaView>

          <ThePriceCounter
          :pricePizza="calculatingPricePizza"
          :title ="titlePizza"
          :arrIngredients="arraySelectedIngredients"
          @sent="sentToCart"
          ></ThePriceCounter>
        </div>
      </div>
    </form>
  </main>
</body>
</template>

<script>
import TheDoughSelector from '@/components/modules/builderPizza/TheDoughSelector.vue'
import TheSizeSelector from '@/components//modules/builderPizza/TheSizeSelector.vue'
import TheSauceSelector from '@/components//modules/builderPizza/TheSauceSelector.vue'
import TheIngredientsSelector from '@/components//modules/builderPizza/TheIngredientsSelector.vue'
import ThePriceCounter from '@/components//modules/builderPizza/ThePriceCounter.vue'
import ThePizzaView from '@/components//modules/builderPizza/ThePizzaView.vue'
export default {
  name: 'Index',
  emits: ['objectPizza'],
  components: {
    TheDoughSelector,
    TheSizeSelector,
    TheSauceSelector,
    TheIngredientsSelector,
    ThePriceCounter,
    ThePizzaView
  },
  data () {
    return {
      sauce: 'tomato',
      dough: 'Толстое',
      size: 1,
      titlePizza: '',
      arraySelectedIngredients: [],
      receivedIngredId: {},
      totalAmountIngredients: 0,
      summarizedData: {
        keyId: '',
        keySauce: '',
        keyDough: 'на толстом тесте',
        keySize: '23 см',
        keyMultiplier: 1,
        keyName: '',
        keyListIngred: '',
        keySumIngred: 0,
        keyCounter: 1,
        keyPrice: 0,
        keyTotalPrice: 0,
        keyArrayIngred: []
      },
      redactPizza: this.$store.state.modifyPizza
    }
  },
  provide () {
    return {
      redactPizza: this.redactPizza
    }
  },
  computed: {
    // считаем итоговую цену пиццы
    calculatingPricePizza () {
      const priceSauce = 50
      const priceDough = 300
      const price = this.size * (this.totalAmountIngredients + priceSauce + priceDough)
      return price
    },
    // проверяем работаем с новой пиццей или изменяем пиццу, уже добавленную в корзину.
    getModifyPizza () {
      const pizza = this.$store.state.modifyPizza
      if (Object.keys(pizza).length === 0) {
        return false
      }
      return pizza
    }
  },
  methods: {
    changeSauce (val) {
      this.sauce = val
      if (this.sauce === 'tomato') {
        this.summarizedData.keySauce = 'томатный'
      } else if (this.sauce === 'creamy') {
        this.summarizedData.keySauce = 'сливочный'
      }
    },
    changeDough (val) {
      this.dough = val
      if (this.dough === 'Толстое') {
        this.summarizedData.keyDough = 'на толстом тесте'
      } else {
        this.summarizedData.keyDough = 'на тонком тесте '
      }
    },
    changeSize (val) {
      // проводим проверку, если никакого значение в размер не переданно, то по умолчанию назначаем 1
      if (!val) {
        val = 1
      }
      this.size = val
      this.summarizedData.keyMultiplier = this.size
      if (this.size === 1) {
        this.summarizedData.keySize = '23 см'
      } else if (this.size === 2) {
        this.summarizedData.keySize = '32 см'
      } else if (this.size === 3) {
        this.summarizedData.keySize = '45 см'
      }
    },
    // получаем список ингридиентов довавляем его в соответсвующие ключи data, а также считаем общую сумму всех ингридиентов и кидаем это значене в итоговой обьект пиццы
    getNameandCount (arrIngred) {
      this.arraySelectedIngredients = arrIngred
      this.summarizedData.keyArrayIngred = this.arraySelectedIngredients

      // получаем список ингредиентво в формате строки, для этого перебираем циклом for of массив обьектов, если ингредиента 2 или 3 добавляем соответсвующую запись а дальше массив приводим к строке в нижнем регистре и добавляем полученное значение в итоговый обьект пиццы
      const arrayIngredients = []
      for (const ingred of arrIngred) {
        if (ingred.counterClick === 3) {
          arrayIngredients.push(ingred.name + '(3)')
        } else if (ingred.counterClick === 2) {
          arrayIngredients.push(ingred.name + '(2)')
        } else {
          arrayIngredients.push(ingred.name)
        }
      }
      this.summarizedData.keyListIngred = arrayIngredients.join(', ').toLowerCase()
      // считаем общую стоимость всех ингредиентов
      const totalAmount = this.arraySelectedIngredients.reduce(
        function (sum, currentIngred) {
          return sum + currentIngred.price
        }, 0)
      this.totalAmountIngredients = totalAmount
      this.summarizedData.keySumIngred = totalAmount
    },
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      console.log('Выводим ид при начале перетаскинвания: ' + item.id)
    },
    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      console.log('Выводим ид AFTER перетаскинвания: ' + itemID)
      // eslint-disable-next-line eqeqeq
      const item = this.items.find((item) => item.id == itemID)
      item.list = list
    },
    getIdIngred (objDrop) {
      this.receivedIngredId = objDrop
    },
    getNamePizza (name) {
      this.titlePizza = name
      this.summarizedData.keyName = this.titlePizza
    },
    // в этом методе получаем цену по эмит из модуля PriceCounter, далее заносим эту цену в итоговый обьект пиццы и отправляем обьект с итоговой ценой в стейт через мутацию addPizza, а также генерируем id и добавляем в итоговый обьект
    sentToCart (price) {
      const pizza = this.$store.state.modifyPizza
      // смотрим пустой ли обьект с редактируемой пиццой, чтобы понять присвоить старый ид или сгенерировать новый
      if (Object.keys(pizza).length !== 0) {
        this.summarizedData.keyId = pizza.keyId
      } else if (this.summarizedData.keyId === '') {
        this.summarizedData.keyId = 'id-' + Math.random().toString(16).slice(12)
      }
      this.summarizedData.keyPrice = price
      this.summarizedData.keyTotalPrice = price
      this.$store.commit('addPizza', this.summarizedData)
    }
  }
}
</script>

<style>
  @import '../assets/css/style.min.css';
  .drop-zone {
    background-color: #eee;
    width: 200px;
    height: 130px;
    margin-bottom: 20px;
    padding: 10px;
    }
    .drop-zone1 {
    background-color: #eee;
    width: 200px;
    height: 130px;
    margin-bottom: 20px;
    padding: 10px;
    }
  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    height: 20px;
    padding: 15px;}
</style>
