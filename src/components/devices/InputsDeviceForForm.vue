<script setup>
defineProps({
  device: {type: Object},
  optionTags: {type: Object}
})
</script>

<template>
<div class="inputs-device">
  <div>
    <q-input stack-label label="Описание:" v-model="device.description"/>
  </div>
  
  <div class="inputs-device__row">
    <q-input stack-label label="Токен:" v-model="device.token"/>
    <q-select stack-label multiple label="Тэги:" v-model="device.tags" :options="optionTags" option-label="name"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.inputs-device{
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__row{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>