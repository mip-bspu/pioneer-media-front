<script setup>
import InputSetContent from '@/components/content/InputSetContent.vue';

import { ref, watch } from 'vue'
import { updateContent } from '@/services/content.service';
import { useAsync } from '@/composables/useAsync';

const props = defineProps({
  content: {type: Object, default: null}
})

const {
  state: stateUpdate,
  exec: execUpdate
} = useAsync(updateContent)

let data = ref(null)

watch(
  ()=>props.content,
  ()=>data.value = props.content,
  {deep: true}
)

async function saveChanges(){
  const response = await execUpdate(data.value.id, data.value)
}
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <form v-if="data" class="setup__form setup-form">
      <InputSetContent v-model:content="data"/>

      <div class="setup-form__btns">
        <q-btn outline color="primary" class="setup-form__btn" @click="saveChanges">Сохранить изменения</q-btn>
        <q-btn color="primary" class="setup-form__btn q-mt-md">Удалить</q-btn>
      </div>
    </form>
    
    <div class="setup__banner banner" v-else>
      <div class="banner__text">Выберите контент для редактирования</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{ 
  height: 100%;
  width: 100%;

  &__wrapper{
    padding: 1rem 1.2rem;

    height: 100%;
    width: 100%;

    background-color: white;
    border-left: 1px solid rgba(0,0,0,0.1);
  }
}
.setup-form{
  &__btns{
    margin-top: 2.4rem;
  }

  &__btn{
    width: 100%;
  }
}
</style>