<script setup>
import InputActionProperties from '@/components/action/InputActionProperties.vue';


import { reactive, ref, watch } from 'vue'

let nullSetup = {
  name: '',
  tags: [],
  from: '',
  to: '',
  priority: 0,
  files: []
}

let setup = reactive({...nullSetup})

const reset = ()=>Object.assign(setup, nullSetup)
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <input-action-properties v-model:setup="setup"/>

    <q-separator class="q-mt-lg"/>

    <div class="setup__actions">
      <q-btn outline color="primary" @click="reset">Сброс</q-btn>
      <q-btn color="primary">Добавить событие</q-btn>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{
  &__wrapper{

  }
  &__actions{
    margin-top: 1.5rem;

    display: flex;
    justify-content: end;
    gap: 0.8rem;
  }
}
</style>