<script setup>
import ListContent from '@/components/content/ListContent.vue'
import ContentToolBar from '@/components/content/ContentToolBar.vue'
import ContentSetup from '@/components/content/ContentSetup.vue'
import SplitPage from '@/components/layout/SplitPage.vue';

import { ref } from 'vue';

let selectedContent = ref(null)
</script>

<template>
<split-page>
  <template #default>
    <ContentToolBar/>
    <list-content class="q-mt-md" v-model:active="selectedContent"/>
  </template>

  <template #sidebar>
    <ContentSetup :content="selectedContent"/>
  </template>
</split-page>
</template>

<style lang="scss" scoped>
</style>