<script setup>
import FileItem from '@/components/FileItem.vue';
import ImageTimesSetup from '@/components/action/ImageTimesSetup.vue'

import { ref, computed, watch } from 'vue'
import { priorityMessage } from '@/utils/map.util.js'
import { useStore } from '@/store/useStore.js'
import { assignTimeForImageFile } from '@/services/action.service'

const { store: UserStore } = useStore("user")
const { store: SetupStore } = useStore("setup")

const props = defineProps({
  setup: {type: Object, required: true},
  addFiles: {type: Boolean}
})

const acceptFormats = computed(()=>[
    ...SetupStore.getAvailableImageFormats(),
    ...SetupStore.getAvailableVideoFormats()
  ])

const tagOptions = UserStore.getTags()
const priorityOptions = Object.keys(priorityMessage)
  .map(key=>({ 
    label: priorityMessage[key], 
    value: key 
  }))

let showSetupImages = ref(false)

const imageFiles = props.addFiles && computed(()=>
    props.setup.files
      .filter(f=>f.type.includes('image'))
      .map(f=>assignTimeForImageFile(f, '00:15'))
  )

watch(
  ()=>imageFiles?.value?.length || 0,
  (v)=>!v && (showSetupImages.value = false)
)
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
          option-label="name"
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

  <template v-if="addFiles">
    <div class="properties__title">Контент</div>

    <image-times-setup
        :disable="!imageFiles.length"
        :imageFiles="imageFiles"
        v-model="showSetupImages"
    />

    <div class="properties__block" v-show="!showSetupImages">
      <ui-area-uploader 
          class="properties__area-upload area-upload" 
          v-model:files="setup.files" 
          :accept="acceptFormats"
      >
        <template #default="{ unselect, activate, isDrag }">
          <div :class="{'area-upload__wrapper': true, 'scroll-style': true, 'active': isDrag}" @click="activate">
            <div class="area-upload__content">
              <file-item 
                  @click="(e)=>e.stopImmediatePropagation()"
                  v-for="file in setup.files" 
                  :file="file"
                  class="area-upload__file-item"
                  :unselect="unselect"
              />
            </div>

            <div class="area-upload__bg">
              <q-icon name="mdi-upload" class="area-upload__icon"/>
              <div class="area-upload__description">
                Нажмите или перетащите контент
              </div>
              <div class="area-upload__formats">
                Поддерживаемые форматы: {{ acceptFormats.map(f=>f.slice(1)).join(", ") }}
              </div>
            </div>
          </div>
        </template>
      </ui-area-uploader>
    </div>
  </template>
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
  &__span{
    font-size: 0.9rem;
    letter-spacing: 0.02rem;
  }

  &__title{
    margin-top: 0.8rem;
    
    font-size: 1rem;
    color: rgb(130, 130, 130);
  }

  &__block{
    margin-top: 0.6rem;

    display: flex;
    align-items: end;
    gap: 1rem;
  }
  &__area-upload{
    width: 100%;
    min-height: 180px;
  }
}
.area-upload{
  &__wrapper{
    position: absolute;
    top: 0; right: 0;
    bottom: 0; left: 0;
    overflow-y: auto;

    height: 100%;
    width: 100%;

    border: 2px dashed rgba(0, 0, 0, 0.23);
    border-radius: 0.4rem;

    &.active{
      border: 2px solid rgba(0, 0, 0, 0.1);
    }
  }
  &__content{
    position: relative;
    z-index: 2;

    padding: 0.5rem;

    background-color: rgba(255, 255, 255, 0);

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    gap: 0.5rem;
  }

  &__file-item{
    width: 100%;
    height: 100px;
  }

  &__bg{
    position: absolute;
    top: 0; right: 0;
    bottom: 0; left: 0;

    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__icon{
    color: rgba(0, 0, 0, 0.2);
    font-size: 4rem;
  }

  &__description{
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
  }

  &__formats{
    margin-top: 0.2rem;

    max-width: 300px;

    line-height: 1.3;
    text-align: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8rem;
  }
}
</style>