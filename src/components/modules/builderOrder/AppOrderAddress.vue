<template>
  <p class="order__address">Адрес доставки: {{ address }}</p>
</template>

<script>
export default {
  name: 'AppOrderAddress',
  props: {
    address: {
      type: String,
      required: false,
      default: 'Нет адреса'
    }
  }

}
</script>

<style>

</style>
