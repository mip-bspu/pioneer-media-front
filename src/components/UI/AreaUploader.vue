<script setup>
import { ref } from 'vue'

let props = defineProps({
  files: {type: Array, default: []}
})
// TODO: add many files drag and drop
let emit = defineEmits(['update:files']);

let isDrag = ref(false)

const dragEnter = ()=>isDrag.value = true
const dragLeaveOrDrop = ()=>isDrag.value = false

const uploadFile = (event)=>{
  let nFiles = [...props.files];

  for(let file of Array.from(event.target.files)){
    if( !nFiles.find((old)=>old.name == file.name) ){
      nFiles.push(file)
    }
  }

  emit('update:files', nFiles)
  event.target.value = ''
}

const unselectFile = (deleteFile)=>{
  let nFiles = [];  
  
  for(let file of Array.from(props.files)){
    if(file !== deleteFile){
      nFiles.push(file)      
    }
  }

  emit('update:files', nFiles)
}
</script>

<template>
<div class="uploader">
  <div class="uploader__wrapper" @dragenter="dragEnter" >
    <input 
        type="file"
        :class="'uploader__input' + (isDrag ? ' uploader__input_active': '')"
        @change="uploadFile"
        @dragleave="dragLeaveOrDrop" 
        @drop="dragLeaveOrDrop"
    >
      <slot name="default" :unselect="unselectFile"></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.uploader{  
  display: flex;
  flex-direction: column;

  &__wrapper{
    position: relative;

    flex: 1 1 100%;

    width: 100%;
  }

  &__input{
    opacity: 0.1;
    background: silver;

    position: absolute;
    z-index: -1;
    left: 0; right: 0;
    top: 0; bottom: 0;

    &_active{
      z-index: 1;
    }
  }
}
</style>