<script setup>
import PreviewContentItem from '@/components/PreviewContentItem.vue';
import ImageAndVideoPlayer from '@/components/ImageAndVideoPlayer.vue';
import ImageTimeInputs from '@/components/action/ImageTimeInputs.vue';

import { ref, watch, reactive, computed } from 'vue';
import { useStore } from '@/store/useStore';
import { useAsync } from '@/composables/useAsync';
import { useUpdateContent } from '@/composables/useUpdateContent';
import { updateActionImageTimes, resetTimeForImageFiles } from '@/services/action.service.js';

const props = defineProps({
  selectedAction: {type: Object, required: true}
})

const emit = defineEmits(['update:changed', 'update:selectedAction'])

const {
  store: SetupStore
} = useStore("setup")

const {
  onUpdateActionContent,
  appendedFiles, willDeleteFiles,
  transformFile, 
  addInAppending, removeFromAppending, 
  addInDeleting, removeFromDeleting,
  isDeleting, clearChanges
} = useUpdateContent()

const {
  exec: execUpdateContent,
  state: stateUpdateContent
} = useAsync(onUpdateActionContent, { globalError: true, msgSuccess: "Контент успешно изменён" })

const {
  exec: execUpdateTimes,
  state: stateUpdateTimes
} = useAsync(updateActionImageTimes, { globalError: true, msgSuccess: "Длительность показа изображений обновлена"})

const acceptFormats = computed(()=>[
    ...SetupStore.getAvailableImageFormats(),
    ...SetupStore.getAvailableVideoFormats()
  ])

let player = reactive({
  play: false,
  content: null
})

let remoteFiles = ref([])
let contents = computed(()=>[...remoteFiles.value, ...appendedFiles.value])

let showTimesSetup = ref(false)

let imageFiles = computed(()=>remoteFiles.value
    .filter(c=>c.type.includes('image'))
    .map(c=>c.file) 
  )

watch(
  ()=>props.selectedAction,
  async ()=>{
    clearChanges();

    if( !props.selectedAction?.files ) return; 
    let files = props.selectedAction.files

    remoteFiles.value = files.map((file)=>transformFile(file, false));
  },
  { immediate: true }
)

function onAppendFile(event) {
  addInAppending(event.target.files[0])
  event.target.value = ''
}

function onDeleteOrCancelFile(file, local){
  if( !local ){
    isDeleting(file) ? removeFromDeleting(file) : addInDeleting(file);
  }else{
    removeFromAppending(file);
  }
}

async function onSubmit() {
  const res = await execUpdateContent(props.selectedAction.id)

  if( res?.status == 200 ){
    emit('update:selectedAction', res.data)
    emit('update:changed', true)

    clearChanges()
  }
}

async function onUpdateTimes() {
  const res = await execUpdateTimes(props.selectedAction.id, imageFiles.value)

  if(!stateUpdateTimes.isError){
    emit('update:selectedAction', res.data)
    emit('update:changed', true)

    clearChanges()
  }
}

const resetUpdatesTime = () => resetTimeForImageFiles(imageFiles.value)

const startPlayer = (content)=>{
  player.play = true
  player.content = content
}
</script>

<template>
<div class="content">
  <div class="content__action">
    {{ selectedAction.name }}:
  </div>

  <q-separator class="q-mb-lg q-mt-md"/>

  <image-time-inputs
      :disable="imageFiles.length == 0"
      :imageFiles="imageFiles"
      v-model="showTimesSetup"
  />

  <template v-if="showTimesSetup">
    <q-separator class="q-mb-md q-mt-md"/>

    <div class="content__actions content__right">
      <div class="content__btns">
        <q-btn outline @click="resetUpdatesTime">отмена</q-btn>

        <q-btn
            :loading="stateUpdateTimes.isLoading"
            color="primary" outline
            @click="onUpdateTimes"
        >сохранить</q-btn>
      </div>
    </div>
  </template>

  <template v-else>
    <template v-if="contents.length > 0">
      <div class="content__images content__block">
        <preview-content-item
            v-for="c in contents"
            :src-image="c.src"
            :data-file="c.file"
            @click="()=>startPlayer(c)"
            class="content__preview"
            :bgStyle="{filter: isDeleting(c.file) ? 'grayscale(90%)' : 'grayscale(0)'}"
        >
          <template #icons>
            <div class="content__icons">
              <q-icon
                  :name="isDeleting(c.file) ? 'mdi-close-circle-outline' : 'mdi-delete-circle-outline'"
                  :class="{'content__deleting': isDeleting(c.file)}"
                  @click.stop="()=>onDeleteOrCancelFile(c.file, c.local)"
              />

              <q-icon name="mdi-play-circle"/>
            </div>
          </template>
        </preview-content-item>
      </div>
    </template>

    <template v-else>
      <div class="content__block">
        К текущему событию не привязан контент
      </div>
    </template>

    <q-separator class="q-mb-md q-mt-md"/>

    <div class="content__actions">
      <ui-btn-file-append 
          class="content__append"
          @update:change="onAppendFile"
          :accept="acceptFormats"
      />

      <div class="content__btns" v-show="contents.length > 0">
        <q-btn outline @click="clearChanges">отмена</q-btn>

        <q-btn
            :loading="stateUpdateContent.isLoading"
            color="primary" outline
            :disable="appendedFiles.length == 0 && willDeleteFiles.length == 0"
            @click="onSubmit"
        >сохранить</q-btn>
      </div>
    </div>
  </template>

  <q-dialog v-model="player.play" full-width>
    <image-and-video-player 
        class="content__player"
        v-model:play="player.play"
        :content="player.content"
        :local="player.content.local"
    />
  </q-dialog>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__images{
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  &__action{
    font-size: 1.8rem;
    text-transform: capitalize;
  }

  &__append{
    padding: 0.4rem 1.6rem;
  }

  &__actions{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
  }

  &__right{
    justify-content: flex-end;
  }

  &__block{
    margin-top: 0.8rem;
  }

  &__btns{
    display: flex;
    gap: 0.8rem;

    button{
      border-radius: 0.4rem;
    }
  }

  &__preview{
    & .content__icons{
      padding: 0.25rem 0.5rem;

      display: flex;
      justify-content: space-between;

      font-size: 1.7rem;

      color: rgba(255, 255, 255, 0.29);
    }

    &:hover .content__icons{
      color: rgba(255, 255, 255, 0.83);
    }
  }
}
</style>