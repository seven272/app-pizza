<template>
   <div class="layout__button">
    <button :type="typeBtn" class="button" :class="classBtn" @click="$emit('clickBtn')"><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    classBtn: {
      type: String,
      default: ''
    },
    typeBtn: {
      type: String,
      default: 'button'
    }
  }

}
</script>

<style>

</style>
