<script setup>
import InputsDeviceForForm from '@/components/devices/InputsDeviceForForm.vue';

import { useOptions } from '@/composables/useOptions'
import { ref, reactive, computed } from 'vue'
import { updateDevice, deleteDevice } from '@/services/devices.service.js'
import { useAsync } from '@/composables/useAsync'

const { 
  exec: execUpdateDevice
} = useAsync(updateDevice, { globalError: true, msgSuccess: "Данные устройства успешно обновленны" })

const {
  exec: execDeleteDevice
} = useAsync(deleteDevice, { globalError: true, msgSuccess: "Устройство успешно удалено"})

const { device, close } = defineProps({
  device: { type: Object, required: true },
  close: { type: Function, default: null }
})

const emit = defineEmits(['update:changed'])

const { options } = useOptions();
const deviceTags = computed(()=>options.tags.filter(t=>t.type === "device"))  

let data = reactive(Object.assign({}, device));

const reset = ()=>Object.assign(data, device)

async function onSubmit(){
  const res = await execUpdateDevice(device.id, data)

  if( res?.status === 200 ){
    emit('update:changed', true)
  }
}

async function onDelete(){
  let res = await execDeleteDevice(device.id)

  if( res?.status === 200 ){
    console.log(res, close)
    close && close()
    emit('update:changed', true)
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
    <div class="device-edit__actions">
      <q-btn 
          outline dense 
          class="q-px-md" 
          @click="onDelete"
      >удалить</q-btn>

      <div class="device-edit__btns">
        <q-btn 
            outline dense 
            @click="reset" 
            class="q-px-md"
        >сброс</q-btn>
        
        <q-btn 
            outline dense 
            color="primary" 
            @click="onSubmit" 
            class="q-px-md"
        >сохранить</q-btn>
      </div>
    </div>
  </template>
</ui-common-form>
</template>

<style lang="scss" scoped>
.device-edit{
  width: 100%;

  &__actions{
    display: flex;
    justify-content: space-between;

    width: 100%;
  }

  &__btns{
    display: flex;
    gap: 0.6rem;
  }
}
</style>