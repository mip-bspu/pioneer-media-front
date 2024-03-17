<script setup>
import { useAsync } from '@/composables/useAsync';
import { addContent } from '@/services/content.service';
import { getName } from '@/utils/file.util';

const {
  state: stateAddContent,
  exec: execAddContent
} = useAsync(addContent)

async function addFile(event){
  const file = event.target.files[0];

  let response = await execAddContent({
    name: getName(file.name),
    from: "", // TODO: interval day
    to: "",
    tags: [],
    file: file
  })
}
</script>

<template>
<div class="card q-mt-lg">
  <div class="card__header">
    <h6>Загруженные файлы</h6>
  </div>

  <div class="card__body toolbar toolbar__columns">
    <div class="toolbar__column">
      <ui-input-file style="padding: 0.4rem 1.2rem;" @change="addFile"/>
    </div>
    <div class="toolbar__column">
      <q-btn dense flat icon="mdi-view-module"/>
      <q-btn dense flat icon="mdi-view-list"/>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.toolbar{
  &__columns{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__column{
    display: flex;
    gap: 0.2rem;
  }
}
</style>