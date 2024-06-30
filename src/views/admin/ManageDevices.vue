<script setup>
import ListDevicesWrapper from '@/components/devices/ListDevicesWrapper.vue';
import DeviceItem from '@/components/devices/DeviceItem.vue'
import DeviceItemMenu from '@/components/devices/DeviceItemMenu.vue'
import DevicesToolbar from '@/components/devices/DevicesToolbar.vue';
import DeviceEditForm from '@/components/devices/DeviceEditForm.vue';

import { useDevices } from '@/composables/useDevices';
import { ref } from 'vue'

const { devices, updateDevicesList, stateGetDevices } = useDevices({intervalUpdate: 15000})

let showEditDevice = ref(false)
let selectedDevice = ref(null)

const onShowEditDevice = (device)=>{
  showEditDevice.value = true
  selectedDevice.value = device
}

const close = ()=>showEditDevice.value = false
</script>

<template>
<q-card flat class="devices">
  <q-card-section>
    <devices-toolbar :update-list="updateDevicesList"/>
  </q-card-section>

  <q-card-section>
    <list-devices-wrapper>
      <device-item v-for="device in devices" :data="device">
        <template #icons>
          <q-btn dense rounded @click="()=>onShowEditDevice(device)">
            <q-icon name="mdi-square-edit-outline"/>
          </q-btn>
        </template>

        <template #menu="{data, close}">
          <device-item-menu :data="data" :close="close"/>
        </template>
      </device-item>
    </list-devices-wrapper>

    <div class="page__banner banner" v-if="devices.length === 0 && !stateGetDevices.isLoading">
      Устройств нет <q-icon name="mdi-cellphone-link" style="font-size: 1.8rem"/>
    </div>
  </q-card-section>

  <q-dialog v-model="showEditDevice">
    <device-edit-form :device="selectedDevice" :close="close"/>
  </q-dialog>
</q-card>
</template>

<style lang="scss" scoped>
.devices{
  background-color: inherit;
}
</style>