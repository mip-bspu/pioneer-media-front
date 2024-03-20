<script setup>
import { toSrc, getName } from '@/utils/file.util.js'

const props = defineProps({
  file: {type: Object, required: true}
})
</script>

<template>
<div class="file">
  <div class="file__wrapper"> 
    <div class="file__image">
      <img :src="toSrc(file)"/>
    </div>

    <div class="file__info">
      <div class="file__title">
        <span>{{ getName(file.name) }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.file{
  &__wrapper{
    user-select: none;

    width: 100%;
    height: 100%;

    position: relative;
    overflow: hidden;

    border-radius: 0.4rem;
  }

  &__info{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    padding: 0.4rem;

    opacity: 0.3;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6) 50%);

    transition: all 0.3s ease;
    &:hover{
      opacity: 1;
    }
  }

  &__title{
    position: absolute;
    bottom: 0.4rem;

    font-size: 0.8rem;
    color: #FFFFFF;
  }

  &__image{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    img{
      width: 100%;
      height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }
}
</style>