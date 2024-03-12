<script setup>
import FormSetContent from './FormSetContent.vue';
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <FormSetContent/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{ 
  height: 100%;
  width: 100%;

  &__wrapper{
    padding: 1rem 1.2rem;

    height: 100%;
    width: 100%;

    background-color: white;
    border-left: 1px solid rgba(0,0,0,0.1);
  }
}
</style>