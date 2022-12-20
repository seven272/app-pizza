<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ title }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="isOpen=!isOpen"><span class="visually-hidden">Изменить адрес</span></button>
      </div>
    </div>
    <p>{{ address }}</p>
    <small>{{ comment }}</small>
  </div>
  <AppRedactAddress v-show="isOpen"
    :redactObj="obj"
    @close-form="close"
  ></AppRedactAddress>
</template>

<script>
import AppRedactAddress from '@/components/modules/builderProfile/AppRedactAddress.vue'
export default {
  name: 'AppAddress',
  components: {
    AppRedactAddress
  },
  inject: ['changeStatusForm'],
  props: {
    id: {
      type: String,
      requiered: true
    },
    title: {
      type: String,
      requiered: true
    },
    address: {
      type: String,
      requiered: true
    },
    comment: {
      type: String,
      requiered: false
    },
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    editAddress () {
      this.changeStatusForm()
      this.$store.commit('redactAddress', this.obj)
    },
    close () {
      this.isOpen = !this.isOpen
    }
  }

}
</script>

<style>

</style>
