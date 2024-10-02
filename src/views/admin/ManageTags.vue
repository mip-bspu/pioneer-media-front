<script setup>
import ManageTagsToolbar from '@/components/tags/ManageTagsToolbar.vue'

import { ref, watch } from 'vue'
import { typeTag } from '@/utils/map.util.js'
import { getAllTags, deleteTag } from '@/services/admin.service.js'
import { useAsync } from '@/composables/useAsync'


const {
  exec: execGetTags
} = useAsync(getAllTags, {globalError: true})

const {
  exec: execDeleteTag
} = useAsync(deleteTag, {globalError: true, msgSuccess: "Тэг успешно удалён"})

let updateList = ref(false)
let listTags = ref([])

const updateListTags = ()=>updateList.value = !updateList.value

watch(
  ()=>updateList.value,
  ()=>onGetTags(),
  { immediate: true }
)

const headers = [
  { field: "name", label: "Название" },
  { field: "type", label: "Тип" },
  { field: "owner", label: "Обладатель" },
  { field: "delete", label: "Удаление", align: 'center'}
]

async function onGetTags(){
  let res = await execGetTags()

  if(res?.status === 200){
    listTags.value = res.data
  }
}

async function onDeleteTag(id){
  let res = await execDeleteTag(id)

  if(res?.status === 200){
    updateListTags()
  }
}
</script>

<template>
<q-card flat class="tags">
  <q-card-section>
    <manage-tags-toolbar :updateList="updateListTags"/>
  </q-card-section>

  <q-card-section flat class="q-pt-none">
    <q-card flat bordered class="q-py-md">
      <ui-table
          v-if="listTags.length > 0"
          class="journal__table"
          dense flat
          :separator="'vertical'"
          :headerSticky="true"
          :headers="headers"
          :rows="listTags"
      >
        <template #item.name="{item: item}">
          <span class="tags__name">{{ item.name }}</span>
        </template>

        <template #item.owner="{item: item}">
          {{ item.owner === null ? "Текущий сервер" : item.owner }}
        </template>

        <template #item.type="{item: item}">
          {{ typeTag[item.type] }}
        </template>

        <template #item.delete="{item: item}">
          <q-btn dense rounded class="tags__btn" @click="()=>onDeleteTag(item.id)">
            <q-icon name="mdi-delete" class="tags__delete"/>
          </q-btn>
        </template>
      </ui-table>

      <div v-else class="q-px-md">
        Список тэгов пуст
      </div>
    </q-card>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.tags{
  height: 100%;
  background-color: inherit;

  display: flex;
  flex-direction: column;

  &__name{
    text-transform: uppercase;
  }

  &__delete{
    color: rgb(220, 111, 111);
  }

  &__btn{
    &:hover .tags__delete{
      color: rgb(217, 5, 5);
    }
  }
}
</style>