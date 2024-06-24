<script setup>
import PreviewContentItem from '@/components/PreviewContentItem.vue';
import ImageAndVideoPlayer from '@/components/ImageAndVideoPlayer.vue';

import { getUrlFile } from '@/services/files.service.js'
import { ref, watch, reactive, computed } from 'vue'
import { toSrc } from '@/utils/file.util.js'
import { useStore } from '@/store/useStore'
import { assignTimeForImageFile } from '@/services/action.service';

const props = defineProps({
  selectedAction: {type: Object, required: true}
})

const {
  store: SetupStore
} = useStore("setup")

const acceptFormats = computed(()=>[
    ...SetupStore.getAvailableImageFormats(),
    ...SetupStore.getAvailableVideoFormats()
  ])

let remoteFiles = ref([])
let appendedFiles = ref([])

let player = reactive({
  play: false,
  content: null
})

let contents = computed(()=>[...remoteFiles.value, ...appendedFiles.value])

watch(
  ()=>props.selectedAction,
  async ()=>{
    if( !props.selectedAction?.files ) return; 
    
    let fileViews = []
    for(let file of props.selectedAction.files){
      fileViews.push({
        src: getUrlFile(file.id), 
        file: assignTimeForImageFile(file, file.time), 
        local: false,
        type: file.content_type
      }) 
    }

    remoteFiles.value = fileViews
  },
  { immediate: true }
)

function onAppendFile(event) {
  const file = event.target.files[0]

  appendedFiles.value = [...appendedFiles.value].push({
    src: toSrc(file),
    file: assignTimeForImageFile(file),
    local: true,
    type: file.type
  })
}

function onSubmit() {

}
</script>

<template>
<div class="content">
  <div class="content__action">
    {{ selectedAction.name }}:
  </div>

  <q-separator class="q-mb-lg q-mt-md"/>

  <template v-if="contents.length > 0">
    <div class="content__images">
      <preview-content-item
          v-for="c in contents"
          :src-image="c.src"
          :data-file="c.file"
          @click="()=>{
            player.play = true
            player.content = c
          }"
          :time="c.type.includes('image')"
      />
    </div>

    <q-separator class="q-mb-md q-mt-md"/>

    <div class="content__btns">
      <ui-btn-file-append 
          class="content__append"
          @update:change="onAppendFile"
          :accept="acceptFormats"
      />

      <q-btn
          color="primary" outline
          :disable="appendedFiles.length == 0"
          @click="onSubmit"
      >сохранить</q-btn>
    </div>
  </template>

  <template v-else>
    К текущему событию не привязан контент
  </template>

  <q-dialog v-model="player.play" full-width>
    <image-and-video-player 
        class="content__player"
        v-model:play="player.play"
        :content="player.content"
        :local="player.content.local"
    />
  </q-dialog>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__images{
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  &__action{
    font-size: 1.8rem;
    text-transform: capitalize;
  }

  &__append{
    padding: 0.6rem 1.6rem;
  }

  &__btns{
    display: flex;
    gap: 1rem;

    button{
      border-radius: 0.4rem;
    }
  }
}
</style>