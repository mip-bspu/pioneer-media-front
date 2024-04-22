<script setup>
import FileItem from '@/components/FileItem.vue';

import { priorityMessage } from '@/utils/map.util.js'
import { useStore } from '@/store/useStore.js'

const { store: UserStore } = useStore("user")

const props = defineProps({
  setup: {type: Object, required: true}
})

const tagOptions = UserStore.getTags()
const priorityOptions = Object.keys(priorityMessage).map(key=>{ return { label: priorityMessage[key], value: key }})
</script>

<template>
<div class="properties">
  <div class="properties__title">Общие настройки</div>
  <div class="properties__block">
    <label class="properties__input">
      <span>Название</span>
      <q-input outlined dense v-model="setup.name"/>
    </label>
  </div>

  <div class="properties__block">
    <label class="properties__input">
      <span>Тэги</span>
      <q-select
          :options="tagOptions"
          dense outlined
          multiple use-chips
          v-model="setup.tags"
      />
    </label>

    <label class="properties__input">
      <span>Приоритет воспроизведения</span>
      <q-select 
          dense outlined 
          :options="priorityOptions" 
          v-model="setup.priority" 
          emit-value map-options
          option-label="label"
      />
    </label>
  </div>

  <div class="properties__title">Перид показа</div>
  <div class="properties__block">
    <label class="properties__input">
      <span>От</span>
      <ui-date-input outlined dense v-model="setup.from"/>
    </label>
  
    <label class="properties__input">
      <span>До</span>
      <ui-date-input outlined dense v-model="setup.to"/>
    </label>
  </div>

  <div class="properties__title">Контент</div>
  <div class="properties__block">
    <ui-area-uploader class="properties__area-upload" v-model:files="setup.files">
      <div class="properties__content">
        <file-item 
            v-for="file in setup.files" 
            :file="file"
            class="properties__file-item"
        />
      </div>
    </ui-area-uploader>
  </div>
</div>
</template>

<style lang="scss" scoped>
.properties{
  height: 100%;
  width: 100%;

  &__input{
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 300px;
  
    span{
      letter-spacing: 0.02rem;
      font-size: 0.9rem;

      margin-bottom: 0.2rem;
      margin-left: 0.2rem;
    }
  }

  &__file-item{
    width: 180px;
    height: 100px;
  }

  &__title{
    margin-top: 1.6rem;
    
    font-size: 1rem;
    color: rgb(130, 130, 130);
  }

  &__block{
    margin-top: 0.6rem;

    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__area-upload{
    width: 100%;
    min-height: 180px;

    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 0.4rem;
  }

  &__content{
    padding: 0.5rem;

    display: flex;
    gap: 0.5rem;
  }
}
</style>