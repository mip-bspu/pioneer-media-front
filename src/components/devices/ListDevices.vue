<script setup>
import DeviceItem from '@/components/devices/DeviceItem.vue'

defineProps({
  devices: {type: Array, default: []}
})
</script>

<template>
<div class="devices">
  <div class="devices__wrapper">
    <device-item v-for="device in devices" :data="device"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.devices{
  &__wrapper{
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}
</style>