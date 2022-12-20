<template>
  <div class="layout__address">
    <AppAddress
    v-for="(item, ind) in getAddresses"
    :key="ind"
    :title="item.title"
    :address="item.address"
    :comment="item.comment"
    :id="item.id"
    :obj="item"
    >
    </AppAddress>
  </div>
</template>

<script>
import AppAddress from '@/components/modules/builderProfile/AppAddress.vue'
export default {
  name: 'TheAddressList',
  components: {
    AppAddress
  },
  computed: {
    getAddresses () {
      // return this.$store.state.addresses
      return this.$store.getters.getAddress
    }
  }

}
</script>

<style>

</style>
