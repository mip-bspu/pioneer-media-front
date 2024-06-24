<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { getUrlFile } from '@/services/files.service.js'
import { toSrc } from '@/utils/file.util'

const { content, local } = defineProps({
  content: {type: Object},
  local: {type: Boolean, default: false}
})

const emit = defineEmits(["update:play"])

let src = ref(null)

watch(
  ()=>content.file,
  ()=>{
    src.value = !local ? 
        getUrlFile(content.file.id) : 
        content.src
  },
  { deep: true, immediate: true }
)

const close = ()=>emit("update:play", false)
</script>

<template>
<div class="content">
  <div class="content__wrapper">
    <div class="content__close">
      <q-btn padding="xs" size="lg" flat rounded @click="close">
        <q-icon name="mdi-close-circle"/>
      </q-btn>
    </div>

    <div class="content__image content__item" v-if="content.type.includes('image') && src">
      <img :src="src"/>
    </div>

    <div class="content__video content__item" v-if="content.type.includes('video') && src">
      <video width="100%" controls autoplay :src="src"></video>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  &__item{
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 900px;
    max-height: 600px;

    border-radius: 4px;
    overflow: hidden;
  }

  &__image{
    img{
      width: 100%;
      object-fit: cover;
    }
  }

  &__close{
    width: 100%;
    max-width: 918px;
    display: flex;
    justify-content: flex-end;

    margin-bottom: 0.4rem;

    font-size: 2rem;

    color: rgba(255, 255, 255, 0.601);
  }

  &__close:hover{
    color: rgb(255, 255, 255);
  }
}
</style>