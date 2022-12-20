<template>
  <div class="layout__address">
    <form action="test.html" method="post" class="address-form address-form--opened sheet" @submit.prevent = "createAddress">
      <div class="address-form__header">
        <b>{{ title }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input type="text" name="addr-name" placeholder="Введите название адреса" required v-model.trim="title">
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="addr-street" placeholder="Введите название улицы" required v-model.trim="street">
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="addr-house" placeholder="Введите номер дома" required v-model.trim="house">
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="addr-apartment" placeholder="Введите № квартиры" v-model.trim="flat">
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input type="text" name="addr-comment" placeholder="Введите комментарий" v-model.trim="comment">
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button type="button" class="button button--transparent" @click="clearForm">Очистить</button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TheAddAddress',
  inject: ['changeStatusForm'],
  data () {
    return {
      title: '',
      street: '',
      house: '',
      flat: '',
      comment: ''
    }
  },
  methods: {
    createAddress () {
      const objAddress = {}
      objAddress.id = 'id-' + Math.random().toString(16).slice(12)
      objAddress.title = this.title
      objAddress.street = this.street
      objAddress.house = this.house
      objAddress.flat = this.flat
      objAddress.comment = this.comment
      objAddress.address = `${this.street} дом ${this.house}, кв. ${this.flat}`

      // this.$store.commit('addAddress', objAddress)
      this.$store.dispatch('addAdrress', objAddress)
      // получаем метод с закрытием формы из корневого модуля Profile с помощью provide/inject
      this.changeStatusForm()
    },
    clearForm () {
      this.title = ''
      this.street = ''
      this.house = ''
      this.flat = ''
      this.comment = ''
    }

  }
}
</script>

<style>

</style>
