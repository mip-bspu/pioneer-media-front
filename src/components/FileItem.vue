<script setup>
import { toSrc, getName } from '@/utils/file.util.js'

const props = defineProps({
  file: {type: Object, required: true},
  unselect: {type: Function}
})
</script>

<template>
<div class="file">
  <div class="file__wrapper"> 
    <div class="file__image">
      <img :src="toSrc(file)"/>
    </div>

    <div class="file__info">
      <div class="file__unselect" v-if="unselect">
        <q-icon name="mdi-close-circle" @click="()=>unselect(file)"/>
      </div>

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

  &__unselect{
    position: absolute;
    z-index: 2;
    top: 2px;
    right: 5px;

    cursor: pointer;

    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.4);

    &:hover{
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__info{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    padding: 0.4rem;

    opacity: 0.3;
    background: rgba(0, 0, 0, 0.6);

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