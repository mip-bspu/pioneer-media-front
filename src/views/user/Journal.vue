<script setup>
import { getJournal } from "@/services/journal.service"
import { useAsync } from "@/composables/useAsync"
import { usePagination } from "@/composables/usePagination"
import { getTypeByExt } from "@/utils/content.util.js"

const {
  exec: execGetJournal,
} = useAsync(getJournal, { globalError: true })

const {
  pagination,
  maxPages
} = usePagination(execGetJournal, {page_size: 15})

const headers = [
  { field: "action", label: "Событие" },
  { field: "filename", label: "Название" },
  { field: "ext", label: "Тип" },
  { field: "token", label: "Устройство" },
  { field: "time", label: "Время" },
]
</script>

<template>
<q-card flat class="journal">
  <q-card-section class="journal__toolbar">
    <div class="journal__title title">Журнал</div>

    <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>

    <q-pagination 
      v-if="pagination.content.length > 0"
      :modelValue="pagination.page+1"
      @update:model-value="(v)=>pagination.page = v-1" 
      :max="maxPages" 
      input
    />
  </q-card-section>

  <q-card-section>
    <ui-table
      :separator="'vertical'"
      :headers="headers"
      :rows="pagination.content"
    >
      <template #item.ext="{item: item}">
        {{ getTypeByExt(item.ext) }}
      </template>

      <template #item.time="{item: item}">
        {{ new Date(item.time).toLocaleString() }}
      </template>
    </ui-table>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.journal{
  background-color: inherit;

  &__toolbar{
    display: flex;
    align-items: center;
  }
}
</style>