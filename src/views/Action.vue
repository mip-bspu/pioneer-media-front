<script setup>
import ListActions from '@/components/action/ListActions.vue'
import SplitPage from '@/components/layout/SplitPage.vue';
import ActionSetup from '@/components/action/ActionSetup.vue';

import { ref } from 'vue'

let tab = ref('create-action')


let actions = ref([
  {
    name: 'action 1',
    tags: [{name: 'blg'}, {name: 'city'}],
    from: '13.10.2023',
    to: '15.10.2023'
  },
  {
    name: 'action 2',
    tags: [{name: 'office'}, {name: 'hole'}, {name: 'school'}],
    from: '13.10.2023',
    to: '15.10.2023'
  }
])
</script>

<template>

<split-page>
  <template #default>
    <list-actions :actions="actions"/>
  </template>

  <template #sidebar>
    <div class="sidebar">
      <q-tabs
          v-model="tab"
          dense align="justify-start" class="tabs"
          color="primary" active-color="primary" indicator-color="primary"
      >
        <q-tab name="create-action" label="Создание события"/>
        <q-tab name="edit-action" label="Изменение события"/>
      </q-tabs>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="create-action">
          <action-setup/>
        </q-tab-panel>

        <q-tab-panel name="edit-action">
            <h6>test2</h6>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </template>
</split-page>
</template>

<style lang="scss" scoped>
.sidebar{
  height: 100%;

  background-color: white;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  
  padding: 1rem 0;
}
.tabs{
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>