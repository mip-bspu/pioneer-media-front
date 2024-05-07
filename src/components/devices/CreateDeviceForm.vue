<script setup>
import CreateForm from '@/components/CreateForm.vue';
import InputsDeviceForForm from '@/components/devices/InputsDeviceForForm.vue';

import { useOptions } from '@/composables/useOptions'
import { createDevice } from '@/services/devices.service.js'
import { useAsync } from '@/composables/useAsync';
import { reactive, computed } from 'vue';

const props = defineProps({
  update: {type: Function}
})

const {
  exec: execCreateDevice
} = useAsync(createDevice, {globalError: true, msgSuccess: "Устройство успешно создано"})

const { options } = useOptions();

const deviceTags = computed(()=>options.tags.filter(t=>t.type === "device"))  

const nullDevice = {
  description: '',
  token: '',
  tags: [],
}

let device = reactive({...nullDevice})

async function onCreateDevice(){
  await execCreateDevice(device);
  props?.update()

  Object.assign(device, nullDevice)
}
</script>

<template>
  <create-form title="Создание устройства" class="create-device" :handleCreate="onCreateDevice">
    <template #inputs>
      <inputs-device-for-form v-model:device="device" :option-tags="deviceTags"/>
    </template>
  </create-form>
</template>

<style lang="scss" scoped>
.create-device{
  width: 100%;
}
</style>