<template>
  <main class="layout">
    <SidebarLayout></SidebarLayout>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>
      <AppUser></AppUser>

      <TheAddressList></TheAddressList>

      <TheAddAddress
        v-if="isOpen"
      ></TheAddAddress>

      <AppButton
        :classBtn="'button--border'"
        @clickBtn="openFormAddress"
      >
        {{ isOpen ? 'Закрыть форму с адресом' : 'Добавить новый адрес' }}
      </AppButton>
    </div>
  </main>
</template>

<script>
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import AppUser from '@/components/modules/builderProfile/AppUser.vue'
import TheAddressList from '@/components/modules/builderProfile/TheAddressList.vue'
import TheAddAddress from '@/components/modules/builderProfile/TheAddAddress.vue'
import AppButton from '@/components/AppButton.vue'
export default {
  name: 'Profile',
  components: {
    SidebarLayout,
    AppUser,
    TheAddressList,
    TheAddAddress,
    AppButton
  },
  data () {
    return {
      isOpen: false
    }
  },
  provide () {
    return {
      changeStatusForm: this.openFormAddress
    }
  },
  methods: {
    openFormAddress () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style>

</style>
