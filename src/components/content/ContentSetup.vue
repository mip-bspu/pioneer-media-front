<script setup>
import InputSetContent from '@/components/content/InputSetContent.vue';

import { ref, watch } from 'vue'
import { updateContent, deleteContent } from '@/services/content.service';
import { getTags } from '@/services/tags.service';
import { useAsync } from '@/composables/useAsync';

const props = defineProps({
  content: {type: Object, default: null}
})

const {
  state: stateUpdate,
  exec: execUpdate
} = useAsync(updateContent)

const {
  state: stateDelete,
  exec: execDelete
} = useAsync(deleteContent)

let data = ref(null)

watch(
  ()=>props.content,
  ()=>data.value = props.content,
  {deep: true}
)

async function saveChanges(){
  const response = await execUpdate(data.value.id, data.value)
}

async function removeContent(){
  const response = await execDelete(data.value.id)
}

let tags = ref([])

async function getTagsForOptions(){
  const response = await getTags({})
  tags.value = response.data
}

getTagsForOptions()
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <form v-if="data" class="setup__form setup-form">
      <InputSetContent v-model:content="data" :tags="tags"/>

      <q-separator class="q-mt-lg"/>

      <div class="setup-form__btns">
        <q-btn outline color="primary" class="setup-form__btn" @click="saveChanges">Сохранить изменения</q-btn>
        <q-btn color="primary" class="setup-form__btn q-mt-md" @click="removeContent">Удалить</q-btn>
      </div>
    </form>
    
    <div class="setup__banner banner" v-else>
      <div class="banner__text">Выберите контент для <br/> редактирования</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{ 
  position: relative;

  height: 100%;
  width: 100%;

  &__wrapper{
    padding: 1rem 1.2rem;

    height: 100%;
    width: 100%;

    background-color: white;
    border-left: 1px solid rgba(0,0,0,0.1);
  }

  &__banner{
    position: relative;
    top: 30vh;
  }
}
.banner{
  &__text{
    text-align: center;
  }
}
.setup-form{
  &__btns{
    margin-top: 1.5rem;
  }

  &__btn{
    width: 100%;
  }
}
</style>