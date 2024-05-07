<script setup>
import ListDevicesWrapper from '@/components/devices/ListDevicesWrapper.vue';
import DeviceItem from '@/components/devices/DeviceItem.vue'
import SplitPage from '@/components/layout/SplitPage.vue';

import { useDevices } from '@/composables/useDevices';

const { devices } = useDevices({intervalUpdate: 15000})
</script>

<template>
<split-page>
  <template #default>
    <q-card flat class="device">
      <q-card-section>
        <div class="device__toolbar">
          <div class="device__title title">Устройства</div>

          <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>
        </div>
      </q-card-section>

      <q-card-section>
        <list-devices-wrapper>
          <device-item v-for="device in devices" :data="device" >
          </device-item>
        </list-devices-wrapper>
      </q-card-section>
    </q-card>
  </template>
</split-page>

</template>

<style lang="scss" scoped>
.device{
  background-color: inherit;

  &__toolbar{
    display: flex;
    align-items: center;
  }
  &__title{
    display: inline-block;
  }
}
.sidebar{
  height: 100%;

  background-color: white;
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  padding: 1rem 0;
}
</style>