<script setup>
import ListDevicesWrapper from '@/components/devices/ListDevicesWrapper.vue';
import DeviceItem from '@/components/devices/DeviceItem.vue'
import DeviceItemEditMenu from '@/components/devices/DeviceItemEditMenu.vue'

import { useDevices } from '@/composables/useDevices';

const { devices } = useDevices({intervalUpdate: 15000})
</script>

<template>
<q-card flat class="devices">
  <q-card-section>
    <list-devices-wrapper>
      <device-item v-for="device in devices" :data="device" >
        <template #menu="{data, close}">
          <device-item-edit-menu :data="data" :close="close"/>
        </template>
      </device-item>
    </list-devices-wrapper>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.devices{
  background-color: inherit;
}
</style>