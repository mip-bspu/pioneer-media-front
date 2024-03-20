<script setup>

const dragEnter = ()=>{

}
</script>

<template>
<div class="uploader">
  <div class="uploader__wrapper" @dragenter="dragEnter">
    <input type="file">

    <slot></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.uploader{

}
</style>