<script setup>
import ListActions from '@/components/action/ListActions.vue'
import SplitPage from '@/components/layout/SplitPage.vue';
import ActionSetup from '@/components/action/ActionSetup.vue';
import ActionEdit from '@/components/action/ActionEdit.vue';
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
} = useAsync(getListActions, {globalError: true, delay: 2000})

let isChangeActions = ref(true)
let actions = ref([]);

let pagination = reactive({
  currentPage: 1,
  maxPages: 0
})

watch(
  ()=>[isChangeActions.value, pagination.currentPage],
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
        pagination.maxPages = Math.ceil(data.total_items / data.page_size)
      }
    }
  },
  { immediate: true, deep: true }
)

let selectedAction = ref(null)

watch(
  ()=>[selectedAction.value, pagination.currentPage],
  ([selected, curPage], old)=>{
    if(selected && tab.value != 'preview-content'){
      tab.value = 'edit-action'
    }

    if( curPage !== old[1] || !selected){
      tab.value = 'create-action'
    }
  }
)

watch(
  ()=>tab.value,
  (val)=>{
    if(val === 'create-action'){
      selectedAction.value = null
    }
  }
)
</script>

<template>

<split-page>
  <template #default>
    <q-card flat class="actions">
      <q-card-section class="actions__toolbar">
        <div class="actions__title title" >События</div>
        <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>
        <q-pagination 
            v-if="actions.length > 0"
            v-model="pagination.currentPage" 
            :max="pagination.maxPages" input
        />
      </q-card-section>

      <q-card-section class="actions__list q-py-xs q-mb-md">
        <div class="actions__items">
          <list-actions :actions="actions" v-model:selected="selectedAction"/>
        </div>

        <div class="page__banner banner" v-if="actions.length === 0 && !stateListActions.isLoading">
          Список событий пуст <q-icon name="mdi-card-bulleted-off-outline" style="font-size: 1.8rem"/>
        </div>
      </q-card-section>
        
      <q-inner-loading :showing="stateListActions.isLoading">
        <q-spinner-ball size="70px" color="primary"/>
        <span class="q-mt-lg">Идёт загрузка событий...</span>
      </q-inner-loading>
    </q-card>
  </template>

  <template #sidebar="{show, close, open}">
    <div class="sidebar q-py-sm">
      <div class="sidebar__header">
        <q-btn
            :flat="show" dense class="sidebar__btn q-ml-sm q-mb-sm"
            color="primary" 
            :icon="show ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'"
            @click="show ? close() : open()"
        />
      </div>
      
      <div :class="['sidebar__body', show || 'sidebar__body_hidden']">
        <q-tabs
          v-model="tab"
          dense class="tabs justify-start"
          color="primary" active-color="primary" indicator-color="primary"
        >
          <q-tab name="create-action" label="Создание"/>
          <q-tab name="edit-action" label="Изменение" :disable="!selectedAction"/>
          <q-tab name="preview-content" label="Контент" :disable="!selectedAction"/>
        </q-tabs>

        <q-tab-panels v-model="tab" style="flex: 1 1 100%">
          <q-tab-panel name="create-action">
            <q-scroll-area style="height: 100%;" :thumb-style="{width: '8px'}">
              <action-setup v-if="true" v-model:changed="isChangeActions"/>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="edit-action">
            <q-scroll-area style="height: 100%;" :thumb-style="{width: '8px'}" v-if="selectedAction">
              <action-edit 
                  v-model:changed="isChangeActions" 
                  v-model:selectedAction="selectedAction"
              />
            </q-scroll-area>

            <div v-else>
              Необходимо выбрать событие
            </div>
          </q-tab-panel>

          <q-tab-panel name="preview-content">
            <q-scroll-area style="height: 100%;" :thumb-style="{width: '8px'}" v-if="selectedAction">
              <preview-contents 
                  v-model:changed="isChangeActions" 
                  v-model:selectedAction="selectedAction"
              />
            </q-scroll-area>

            <div v-else>
              Необходимо выбрать событие
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </template>
</split-page>
</template>

<style lang="scss" scoped>
.sidebar{
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: white;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  &__btn{
    transition: all 0.2s ease-in-out;
  }
  &__body{
    flex: 1 1 100%;

    display: flex;
    flex-direction: column;

    &_hidden{
      transition: all 0.05s ease-in-out;
      opacity: 0;
      visibility: hidden;
    }
  }
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