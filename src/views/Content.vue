<script setup>
import ListFiles from '@/components/content/ListFiles.vue'
import ListContents from '@/components/content/ListContents.vue'
import FormSetContent from '@/components/content/FormSetContent.vue'

import { ref } from 'vue';
import { getName } from '@/utils/file.util.js'

let step = ref(1);

let files = ref([])
let contents = ref([])

let selected = ref(contents.value[0]);

function uploadFile(uploadFiles){
  for( let file of uploadFiles ){
    console.log(file)

    let name = getName(file.name)
    if( contents.value.find(item=>item.name == name) ){
      continue;
    }
    
    files.value.push(file)
    contents.value.push({
      name: name,
      file: file,
      from: '',
      to: '',
      tags: []
    })
  }
}
</script>

<template>
<div class="content">
  <q-stepper v-model="step" header-nav>
    <q-step :name="1" icon="mdi-plus" title="Add content">
      <ui-file-uploader @update:model-value="uploadFile" style="height: 160px;"/>

      <list-files v-model="files"/>
    </q-step>

    <q-step :name="2" icon="mdi-plus" title="Setup content">
      <div class="setup__columns">
        <list-contents 
            class="setup__column" 
            v-model:contents="contents"
            v-model:selected="selected"
        />
          
        <form-set-content
            class="setup__column"
            v-model:selected="selected"
        />
      </div>
    </q-step>

    <q-step :name="3" icon="mdi-plus" title="Confirm">
      <h1>test</h1>
    </q-step>
  </q-stepper>
</div>
</template>

<style lang="scss" scoped>
.setup{
  &__columns{
    display: grid;
    grid-template-columns: min(500px, 45%) auto;
    gap: 2rem;
  }

  &__column{
    min-width: 300px;
  }
}
</style>