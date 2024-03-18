<script setup>
import SplitPage from '@/components/layout/SplitPage.vue';
import ActionToolbar from '@/components/action/ActionToolbar.vue';
import ActionSetup from '@/components/action/ActionSetup.vue';

</script>

<template>
<split-page>
  <template #default>
    <action-toolbar/>
  </template>

  <template #sidebar>
    <action-setup/>
  </template>
</split-page>
</template>

<style lang="scss" scoped>

</style>