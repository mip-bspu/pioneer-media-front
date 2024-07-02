<script setup>
import CreateTag from '@/components/CreateTag.vue'

defineProps({
  updateList: { type: Function }
})
</script>

<template>
<q-card flat bordered>
  <q-card-section class="q-pt-lg">
    <create-tag @update:created="()=>updateList()"/>
  </q-card-section>
</q-card>
</template>