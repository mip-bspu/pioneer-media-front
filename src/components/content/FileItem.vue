<script setup>
import { getName, toSrc } from '@/utils/file.util.js'

const props = defineProps({
  modelValue: {type: Object, require: true},
  onDelete: {type: Function, default: null}
})
</script>

<template>
<div class="file">
  <div class="file__wrapper">
    <q-btn
      v-if="onDelete"
      flat round 
      icon="mdi-close-circle-outline"
      class="file__btn-delete"
      @click="()=>onDelete(modelValue)"
    />

    <div class="file__image">
      <img :src="toSrc(modelValue)"/>
    </div>

    <div class="file__name">
      <p>{{ getName(modelValue.name) }}</p>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.file{
  position: relative;

  max-width: 180px;
  width: 100%;

  &__wrapper{
    padding: 0.8rem;

    height: 100%;
    width: 100%;
    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 0.8rem;

    border: 1px solid $secondary;
    border-radius: 1rem;
    background-color: $background-secondary;
  }

  &__image{
    width: 100%;
    max-width: 50px;

    & img{
     width: 100%;
    }
  }

  &__name{
    p{
      margin: 0;

      text-align: center;
    }
  }

  &__btn-delete{
    position: absolute;

    color: rgba(0, 0, 0, 0.3);

    top: 0.2rem;
    right: 0.2rem;

    transition: all 0.2s ease;

    &:hover{
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>