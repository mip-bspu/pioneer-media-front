<script setup>
import PreviewContentItem from '@/components/PreviewContentItem.vue';
import ImageAndVideoPlayer from '@/components/ImageAndVideoPlayer.vue';

import { getUrlFile } from '@/services/files.service.js'
import { ref, watch, reactive } from 'vue'

const props = defineProps({
  selectedAction: {type: Object, required: true}
})

let images = ref([])

let player = reactive({
  play: false,
  file: null
})

watch(
  ()=>props.selectedAction,
  async ()=>{
    if( !props.selectedAction?.files ) return; 
    
    let imgs = []
    for(let file of props.selectedAction.files){
      imgs.push({src: getUrlFile(file.id), file: file}) 
    }
    images.value = imgs
  },
  { immediate: true }
)
</script>

<template>
<div class="content">
  <div class="content__action">
    {{ selectedAction.name }}:
  </div>

  <q-separator class="q-mb-lg q-mt-md"/>

  <template v-if="images.length > 0">
    <div class="content__images">
      <preview-content-item 
          :src-image="image.src"
          :data-file="image.file"
          v-for="image in images"
          @click="()=>{
            player.play = true
            player.file = image.file
          }"
      />
    </div>
  </template>

  <template v-else>
    К текущему событию не привязан контент
  </template>

  <q-dialog v-model="player.play" full-width>
    <image-and-video-player 
        class="content__player"
        v-model:play="player.play"
        :file="player.file" 
        :content-type="player.file.content_type"
    />
  </q-dialog>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__images{
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }

  &__action{
    font-size: 1.8rem;
    text-transform: capitalize;
  }
}
</style>