<script setup>
import InputActionProperties from '@/components/action/InputActionProperties.vue';

import { reactive, ref, watch } from 'vue'

let setup = reactive({
  name: '',
  tags: [],
  from: '',
  to: '',
  priority: 0,
  files: []
})

watch(
  ()=>setup,
  ()=>console.log(setup),
  {deep: true}
)
</script>

<template>
<div class="setup">
  <div class="setup__wrapper">
    <input-action-properties v-model:setup="setup"/>
  </div>
</div>
</template>

<style lang="scss" scoped>

</style>