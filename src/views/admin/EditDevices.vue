<script setup>
import ListDevices from '@/components/devices/ListDevices.vue';

import { watch, ref } from 'vue'
import { useAsync } from '@/composables/useAsync';
import { getListDevices } from '@/services/devices.service.js';

const {
  exec: execGetDevices,
  state: stateGetDevices
} = useAsync(getListDevices, {globalError: true});

let devices = ref([]);

async function onGetDevices(){
  const res = await execGetDevices()

  if( !stateGetDevices.isError ){
    devices.value = res.data
  }
}

onGetDevices();
</script>

<template>
<q-card flat class="devices">
  <q-card-section>
    <list-devices :devices="devices"/>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.devices{
  background-color: inherit;
}
</style>