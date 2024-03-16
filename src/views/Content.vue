<script setup>
import ListContent from '@/components/content/ListContent.vue'
import ContentToolBar from '@/components/content/ContentToolBar.vue'
import ContentSetup from '@/components/content/ContentSetup.vue'

import { ref } from 'vue';

let sidebarActive = ref(true)

let selectedContent = ref(null)
</script>

<template>
<div class="content">
  <div class="content__body page">
    <ContentToolBar/>
    <list-content class="q-mt-md" v-model:active="selectedContent"/>
  </div>

  <div :class="'content__sidebar' + (sidebarActive ? ' content__sidebar_active' : '')">
    <ContentSetup :content="selectedContent"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content{
  flex: 1 1 0;
  display: flex;
  flex-direction: row;

  &__body{
    flex: 1 1 0;
  }

  &__sidebar{
    width: 0;
    
    &_active{
      width: 25vw;
    }
  }
}
</style>