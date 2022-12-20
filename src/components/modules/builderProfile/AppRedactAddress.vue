<template>
  <div class="layout__address">
    <form action="test.html" method="post" class="address-form address-form--opened sheet" @submit.prevent="redactAdr">
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
        <button type="button" class="button button--transparent" @click="deleteAdr(redactObj.key)">Удалить</button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppRedactAddress',
  props: {
    redactObj: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      id: this.redactObj.id,
      key: this.redactObj.key,
      title: this.redactObj.title,
      street: this.redactObj.street,
      house: this.redactObj.house,
      flat: this.redactObj.flat,
      comment: this.redactObj.comment,
      address: `${this.street} дом ${this.house}, кв. ${this.flat}`
    }
  },
  methods: {
    deleteAdr (key) {
      // в первом варианте при создании адреса генеровался id, дальше по нему происходил поиск, удаление редактирование конкретного адреса, теперь же с подключением firebase в обьект с адресом добавляется ключ,который генерирует сама база данных, и удаление происходит по нему
      // this.$store.commit('deleteAddress', id)
      this.$store.dispatch('deleteAddress', key)
      this.$emit('closeForm')
    },
    redactAdr () {
      const objAdr = {}

      objAdr.id = this.id
      objAdr.key = this.key
      objAdr.title = this.title
      objAdr.street = this.street
      objAdr.house = this.house
      objAdr.flat = this.flat
      objAdr.comment = this.comment
      objAdr.address = `${this.street} дом ${this.house}, кв. ${this.flat}`
      // this.$store.commit('redactAddress', objAdr)
      this.$store.dispatch('redactAddress', objAdr)
      this.$emit('closeForm')
    }
  }
}
</script>

<style>

</style>
