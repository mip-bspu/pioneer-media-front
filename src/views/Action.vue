<script setup>
import ListActions from '@/components/action/ListActions.vue'
import SplitPage from '@/components/layout/SplitPage.vue';
import ActionSetup from '@/components/action/ActionSetup.vue';
import PreviewContents from '@/components/action/PreviewContents.vue'

import { useAsync } from '@/composables/useAsync';
import { useStore } from '@/store/useStore'
import { getListActions } from '@/services/action.service';
import { ref, watch, reactive } from 'vue'

let { store: UserStore } = useStore("user")

let tab = ref('create-action')

let {
  exec: execGetListActions,
  state: stateListActions
} = useAsync(getListActions)

let isChangeActions = ref(true)
let actions = ref([]);

let paggination = reactive({
  currentPage: 1,
  maxPages: 0
})

watch(
  ()=>[isChangeActions.value, paggination.currentPage],
  async (newV, oldV)=>{
    if( oldV && oldV[1] != newV[1] || isChangeActions.value ){
      isChangeActions.value = false
      let data = (await execGetListActions({
        tags: UserStore.getTags(), 
        page: newV[1]-1, 
        page_size: 8
      }))?.data

      if(data){
        actions.value = data.actions
        paggination.maxPages = Math.ceil(data.total_items / data.page_size)
      }
    }
  },
  { immediate: true, deep: true }
)

let selectedAction = ref(null)
</script>

<template>

<split-page>
  <template #default>
    <q-card flat class="actions">
      <q-card-section class="actions__toolbar">
        <div class="actions__title title" >События</div>
        <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>
        <q-pagination 
            v-model="paggination.currentPage" 
            :max="paggination.maxPages" input
        />
      </q-card-section>

      <q-card-section class="actions__list q-py-xs q-mb-md">
        <div class="actions__items">
          <list-actions :actions="actions" v-model:selected="selectedAction"/>
        </div>
      </q-card-section>
        
      <q-inner-loading :showing="stateListActions.isLoading">
        <q-spinner-ball size="70px" color="primary"/>
        <span class="q-mt-lg">Идёт загрузка событий...</span>
      </q-inner-loading>
    </q-card>
  </template>

  <template #sidebar>
    <div class="sidebar">
      <q-tabs
          v-model="tab"
          dense class="tabs justify-start"
          color="primary" active-color="primary" indicator-color="primary"
      >
        <q-tab name="create-action" label="Создание события"/>
        <q-tab name="edit-action" label="Изменение события"/>
        <q-tab name="preview-content" label="Просмотр контента"/>
      </q-tabs>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="create-action">
          <action-setup v-model:changed="isChangeActions"/>
        </q-tab-panel>

        <q-tab-panel name="edit-action">
          <h6>test2</h6>
        </q-tab-panel>

        <q-tab-panel name="preview-content">
          <preview-contents :selectedAction="selectedAction"/>
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
.actions{
  background-color: inherit;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;

  &__toolbar{
    display: flex;
  }
  &__title{
    display: inline-block;
  }
  &__list{
    position: relative;

    flex: 1 1 100%;
  }
  &__items{
    padding: 1rem;

    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    overflow-y: scroll;
    scrollbar-color:  rgba(0, 0, 0, 0.04) rgba(0,0,0,0);
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }
}
</style>