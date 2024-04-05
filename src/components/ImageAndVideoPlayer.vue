<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { getFile } from '@/services/files.service.js'

const props = defineProps({
  file: {type: Object}
})

let src = ref(null)

async function getContent(){
  let data = (await getFile(props.file.id)).data

  src.value = URL.createObjectURL(data)
}

watch(
  ()=>props.file,
  ()=>getContent(),
  { deep: true, immediate: true }
)

onUnmounted(()=>URL.revokeObjectURL(src.value))
</script>

<template>
<div class="content">
  <div class="content__wrapper">
    <div 
      class="content__image" 
      v-if="file.content_type.includes('image') && src"
    >
        <img :src="src"/>
    </div>

    <div
      class="content__video"  
      v-if="file.content_type.includes('video') && src"
    >
      <video
        width="100%"
        controls
        autoplay
        :src="src"
      >
      </video>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
.content{
  &__wrapper{

  }
  &__image{
    width: 100%;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__video{

  }
}
</style>