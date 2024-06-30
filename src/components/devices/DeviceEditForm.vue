<script setup>
import InputsDeviceForForm from '@/components/devices/InputsDeviceForForm.vue';

import { useOptions } from '@/composables/useOptions'
import { ref, reactive, computed } from 'vue'
import { updateDevice } from '@/services/devices.service.js'
import { useAsync } from '@/composables/useAsync'

const { 
  exec: execUpdateDevice
} = useAsync(updateDevice, { globalError: true, msgSuccess: "Данные устройства успешно обновленны" })

const { device } = defineProps({
  device: { type: Object, required: true },
  close: { type: Function, default: null }
})

const { options } = useOptions();
const deviceTags = computed(()=>options.tags.filter(t=>t.type === "device"))  

let data = reactive(Object.assign({}, device));

const reset = ()=>Object.assign(data, device)

async function onSubmit(){
  const res = await execUpdateDevice(device.id, data)

  if( res?.status === 200 ){

  }
}
</script>

<template>
<ui-common-form :title="`Редактирование устройства`" class="device-edit" :close="close">
  <template #inputs>
    <inputs-device-for-form 
        v-model:device="data" 
        :option-tags="deviceTags" 
    />
  </template>

  <template #btns>
    <div class="device-edit__btns">
      <q-btn outline @click="reset">сброс</q-btn>
      <q-btn outline color="primary" @click="onSubmit">сохранить</q-btn>
    </div>
  </template>
</ui-common-form>
</template>

<style lang="scss" scoped>
.device-edit{
  width: 100%;

  &__btns{
    display: flex;
    gap: 0.6rem;
  }
}
</style>