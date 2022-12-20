<template>
  <div class="cart__form">
          <div class="cart-form">

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="delivery" class="select" v-model="delivery" @change="chooseAddress">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option :value="item.id" v-show="auth" v-for="(item, ind) in getAddresses" :key="ind">{{ item.title }}</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" v-model.trim="tel">
            </label>
<!-- блок с адресом -->
            <div class="cart-form__address" v-show="showInput">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" v-model.trim="street" @input="makeNewAddress">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" v-model.trim="house" @input="makeNewAddress">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" v-model.trim="flat" @input="makeNewAddress">
                </label>
              </div>
            </div>

          </div>
        </div>
</template>

<script>
export default {
  name: 'TheContactCart',
  // inject: ['auth'],
  data () {
    return {
      auth: this.$store.getters.getAuthUser,
      delivery: '2',
      house: '',
      street: '',
      flat: '',
      tel: '',
      selectedAddress: ''

    }
  },
  computed: {
    showInput () {
      let boolean = false
      if (this.delivery !== '1') {
        boolean = true
      }
      return boolean
    },
    getAddresses () {
      return this.$store.getters.getAddress
    }
  },
  methods: {
    chooseAddress () {
      const arr = this.getAddresses
      if (this.delivery !== '1' && this.delivery !== '2') {
        const address = arr.find(item => item.id === this.delivery)
        this.street = address.street
        this.house = address.house
        this.flat = address.flat
        this.$store.commit('selectAddress', address.title)
      } else if (this.delivery === '2') {
        this.street = ''
        this.house = ''
        this.flat = ''
      }
    },
    makeNewAddress () {
      const str = `улица: ${this.street}, ${this.house}, кв. ${this.flat}`
      this.$store.commit('selectAddress', str)
    }
  }

}
</script>

<style>

</style>
