<script setup>
import { watch, ref } from "vue"
import { getJournal } from "@/services/journal.service"
import { getMinListDevices } from "@/services/devices.service"
import { useAsync } from "@/composables/useAsync"
import { usePagination } from "@/composables/usePagination"
import { getTypeByExt } from "@/utils/content.util.js"

const {
  exec: execGetJournal,
} = useAsync(getJournal, { globalError: true })

const {
  exec: execGetDevices,
  state: stateGetDevices
} = useAsync(getMinListDevices, { globalError: true })

const {
  pagination,
  maxPages,

  exec: getPageJournal
} = usePagination(execGetJournal, {page_size: 15})

const headers = [
  { field: "action", label: "Событие" },
  { field: "filename", label: "Название" },
  { field: "ext", label: "Тип" },
  { field: "time", label: "Время" },
]

const device = ref(null)
const options = ref([])

async function onGetDevices(){
  let res = await execGetDevices()

  if( !stateGetDevices.isError ){
    let opts = res.data.map(d=>({value: d.id, label: d.description}))
    
    options.value = opts
    device.value = opts[0].value
  }
}
onGetDevices()

watch(
  ()=>[pagination.page, pagination.page_size, device.value],
  async () => {
    if(device.value == null) return;

    await getPageJournal({
      device_id: device.value,
      page: pagination.page, 
      page_size: pagination.page_size 
    })
  },
  { immediate: true }
)
</script>

<template>
<q-card flat class="journal">
  <q-card-section class="journal__toolbar">
    <div class="journal__title title">Журнал</div>

    <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>
    
    <div class="journal__tools">
      <div :style="{width: '170px'}">
        <q-pagination 
          v-if="pagination.content.length > 0"
          :modelValue="pagination.page+1"
          @update:model-value="(v)=>pagination.page = v-1" 
          :max="maxPages" 
          input
        />
      </div>
    
      <q-select
          v-if="options.length > 0"
          class="journal__select" 
          :options="options"
          v-model="device"
          label="Устройство"
          dense
          map-options
          emit-value
      />
    </div>
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

  &__tools{
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }

  &__select{
    width: 200px;
  }
}
</style>