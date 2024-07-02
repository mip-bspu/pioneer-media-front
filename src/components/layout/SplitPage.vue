<script setup>
import { ref } from 'vue'

let showSidebar = ref(false)

const close = ()=>showSidebar.value = false
const open = ()=>showSidebar.value = true
</script>

<template>
<div class="split-page">
  <div class="split-page__body">
    <slot></slot>
  </div>
  <div :class="['split-page__sidebar sidebar', showSidebar || 'sidebar_active']">
    <div class="sidebar__wrapper">
      <slot name="sidebar" :show="showSidebar" :close="close" :open="open" ></slot>
    </div>
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
    display: flex;
    flex-direction: column;
  }
}
.sidebar{
  position: relative;
  width: 40vw;
  transition: all 0.3s ease;
  &__wrapper{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    overflow: hidden;
  }

  &_active{
    width: 50px;
  }
}
</style>