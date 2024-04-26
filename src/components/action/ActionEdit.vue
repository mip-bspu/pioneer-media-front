<script setup>
import InputActionProperties from '@/components/action/InputActionProperties.vue';

import { reactive, watch, computed } from 'vue'
import { updateAction, deleteAction } from '@/services/action.service.js'
import { useAsync } from '@/composables/useAsync';

const emit = defineEmits(['update:changed'])

const props = defineProps({
  selectedAction: {type: Object, required: true}  
})

let {
  exec: execUpdateAction,
  state: stateUpdateAction
} = useAsync(updateAction, {globalError: true, msgSuccess: "Событие успешно изменнено"})

let {
  exec: execDeleteAction,
  state: stateDeleteAction
} = useAsync(deleteAction, {globalError: true, msgSuccess: "Событие успешно удаленно"})

const reset = (obj = {})=>Object.assign(obj, props.selectedAction, {priority: props.selectedAction.priority.toString()})

let updates = reactive(reset())

// const isChange = computed(()=>JSON.stringify(updates) === JSON.stringify(reset()))

watch(
  ()=>props.selectedAction,
  ()=>reset(updates),
  { deep: true }
)

const onUpdateAction = async ()=>{
  (await execUpdateAction(updates.id, updates))
  
  if(!stateUpdateAction.isError){
    emit('update:changed', true)
  }
}
const onDeleteAction = async ()=>{
  (await execDeleteAction(props.selectedAction.id))

  if(!stateDeleteAction.isError){
    emit('update:changed', true)
  }
}
</script>

<template>
<div class="edit">
  <div class="edit__wrapper">
    <div class="edit__title">
      {{ selectedAction.name }}:
    </div>

    <q-separator class="q-mb-lg q-mt-md"/>

    <input-action-properties v-model:setup="updates"/>

    <q-separator class="q-mt-lg"/>

    <div class="edit__actions">
      <q-btn outline color="primary" @click="onDeleteAction">Удалить</q-btn>

      <div class="edit__column">
        <q-btn outline @click="reset">Сброс</q-btn>
        <q-btn color="primary" @click="onUpdateAction">Применить изменения</q-btn>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.edit{
  &__title{
    font-size: 1.8rem;
    text-transform: capitalize;
  }
  &__actions{
    margin-top: 1.5rem;

    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
  }
  .edit__column{
    display: flex;
    gap: 0.8rem;
  }
}
</style>