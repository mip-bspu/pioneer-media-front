<script setup>
import CreateDeviceForm from '@/components/devices/CreateDeviceForm.vue'

import { ref } from 'vue'

defineProps({
  updateList: {type: Function}
})

let showCreateDevice = ref(false)
</script>

<template>
<q-card flat bordered>
  <q-card-section class="q-pt-lg">
    <q-btn
        @click="showCreateDevice = true"
        dense outline
        class="q-px-md" color="primary"
        icon="mdi-plus"
    >Создать устройство</q-btn>

    <q-dialog v-model="showCreateDevice">
      <create-device-form :update="updateList"/>
    </q-dialog>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>

</style>