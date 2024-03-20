<script setup>
// TODO: active
// TODO: get width with props
</script>

<template>
<div class="split-page">
  <div class="split-page__body page">
    <slot></slot>
  </div>
  <div class="split-page__sidebar">
    <slot name="sidebar"></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.split-page{
  flex: 1 1 0;
  display: flex;
  flex-direction: row;

  &__body{
    flex: 1 1 0;
  }

  &__sidebar{
    width: 40vw;
    
    &_active{
      width: 25vw;
    }
  }
}
</style>