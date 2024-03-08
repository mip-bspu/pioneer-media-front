<script setup>
import { ref } from 'vue'
defineProps() // TODO: formats

const emit = defineEmits(['update:modelValue'])

let isDrag = ref(false)

function uploadFile(event){
  emit("update:modelValue", event.target.files)
  
  isDrag.value = false;
  event.target.value = '';
}
</script>

<template>
<div class="uploader">
  <div :class="'uploader__wrapper' + (isDrag ? ' uploader__wrapper_active' : '')">
    <input 
      type="file" 
      class="uploader__file"
      @change="uploadFile"
      @dragenter="isDrag = true"
      @dragleave="isDrag = false"
    >

    <div class="uploader__info" v-if="!isDrag">
      <div class="uploader__text">Добавить контент</div>
      <div class="uploader__subtext">Поддерживаемые форматы: </div>
    </div>

    <div class="uploader__info" v-else>
      <q-icon name="mdi-upload" class="uploader__icon"/>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.uploader{
  position: relative;

  &__wrapper{
    height: 100%;

    padding: 1rem;

    border: 3px dashed $primary;
    border-radius: 1rem;
    background-color: $background-primary;

    display: flex;
    align-items: center;
    justify-content: center;

    &_active{
      border: 3px solid $primary;
    }
  }

  &__file{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    z-index: 2;

    opacity: 0;
  }

  &__info{
    text-align: center;
    color: $primary;
  }

  &__text{
    font-size: 1.4rem;
    color: $primary;
  }

  &__icon{
    font-size: 5rem;
  }

  &__subtext{
    margin-top: 0.4rem;
    
    color: $primary;
    opacity: 0.6;
  } 
}
</style>