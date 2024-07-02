<script setup>
import { reactive } from "vue"
import { useAsync } from "@/composables/useAsync"
import { createTag } from "@/services/admin.service.js"
import { optionsTagType } from "@/utils/map.util.js"

const emit = defineEmits(['update:created'])

const {
  state: stateCreateTag,
  exec: execCreateTag
} = useAsync(createTag, {globalError: true, msgSuccess: "Тэг успешно создан"})

let tag = reactive({
  name: "",
  type: optionsTagType[0].value
})

const reset = ()=>{
  tag.name = "",
  tag.type = optionsTagType[0].value
}

async function onCreateTag(){
  await execCreateTag(tag)

  if( !stateCreateTag.isError ){
    emit('update:created', true);
    reset()
  }
}
</script>

<template>
<div class="create-tag__content">
  <q-input 
      v-model="tag.name" 
      label="Название" 
      class="create-tag__item" 
      stack-label
      outlined
      dense
  />

  <q-select 
      class="create-tag__item"
      label="Тип"
      v-model="tag.type"  
      :options="optionsTagType"
      map-options stack-label emit-value
      outlined
      dense
  />

  <q-btn 
      outline dense
      class="q-py-xs q-px-md" 
      color="primary"
      @click="onCreateTag"
  >Создать тэг</q-btn>
</div>
</template>

<style lang="scss" scoped>
.create-tag{
  &__content{
    display: flex;
    align-items: center;

    gap: 1rem;
    
    background-color: #FCFCFD;
  }

  &__item{
    width: 180px;
  }
}
</style>