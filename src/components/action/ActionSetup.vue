<script setup>
import InputActionProperties from '@/components/action/InputActionProperties.vue';

import { reactive } from 'vue'
import { createAction } from '@/services/action.service.js'
import { useAsync } from '@/composables/useAsync';

const emit = defineEmits(['update:changed'])

let {
  exec: execCreateAction,
  state: stateCreateAction
} = useAsync(createAction)

let nullSetup = {
  name: '',
  tags: [],
  from: Date.today(),
  to: Date.today(),
  priority: "0",
  files: []
}

let setup = reactive({...nullSetup})

const reset = ()=>Object.assign(setup, nullSetup)

const addAction = async ()=>{
  const data = (await execCreateAction(setup))
  reset()
  emit('update:changed', true)
}
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <input-action-properties v-model:setup="setup"/>

    <q-separator class="q-mt-lg"/>

    <div class="setup__actions">
      <q-btn outline color="primary" @click="reset">Сброс</q-btn>
      <q-btn color="primary" @click="addAction">Добавить событие</q-btn>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{
  &__actions{
    margin-top: 1.5rem;

    display: flex;
    justify-content: end;
    gap: 0.8rem;
  }
}
</style>