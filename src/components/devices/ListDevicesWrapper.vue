<script setup>
</script>

<template>
<div class="devices">
  <div class="devices__wrapper">
    <slot></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.devices{
  &__wrapper{
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}
</style>