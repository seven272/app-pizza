<template>
  <div class="user">
    <picture>
      <source type="image/webp" srcset="@/assets/img/users/user5@2x.webp 1x, @/assets/img/users/user5@4x.webp 2x">
      <img src="@/assets/img/users/user5@2x.jpg" srcset="@/assets/img/users/user5@4x.jpg" alt="Василий Ложкин" width="72" height="72">
    </picture>
    <div class="user__name">
      <span>Василий Ложкин</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>
</template>

<script>
export default {
  name: 'AppUser'

}
</script>

<style>

</style>
