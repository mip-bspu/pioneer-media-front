<script setup>
import { watch, ref } from "vue"
import { getJournal } from "@/services/journal.service"
import { getMinListDevices } from "@/services/devices.service"
import { useAsync } from "@/composables/useAsync"
import { usePagination } from "@/composables/usePagination"
import { useStore } from "@/store/useStore"

const {
  exec: execGetJournal,
  state: stateGetJournal
} = useAsync(getJournal, { globalError: true })

const {
  exec: execGetDevices,
  state: stateGetDevices
} = useAsync(getMinListDevices, { globalError: true })

const {
  pagination,
  maxPages,

  exec: getPageJournal
} = usePagination(execGetJournal, {page_size: 25})

const {
  store: SetupStore
} = useStore("setup")

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
    
    if( opts.length == 0 ){
      return;
    }

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
      <q-select
          :disable="options.length == 0"
          :loading="stateGetDevices.isLoading"
          class="journal__select" 
          :options="options"
          v-model="device"
          label="Устройство"
          dense outlined
          map-options
          emit-value
      />

      <q-pagination 
          v-if="pagination.content.length > 0"
          :modelValue="pagination.page+1"
          @update:model-value="(v)=>pagination.page = v-1" 
          :max="maxPages" 
          input
      />
    </div>
  </q-card-section>

  <q-card-section>
    <div class="journal__list card" v-if="pagination.content.length > 0">
      <ui-table
          class="journal__table"
          dense flat
          :separator="'vertical'"
          :headerSticky="true"
          :headers="headers"
          :rows="pagination.content"
      >
        <template #item.ext="{item: item}">
          {{ SetupStore.getTypeByExt(item.ext) }}
        </template>

        <template #item.time="{item: item}">
          {{ new Date(item.time).toLocaleString() }}
        </template>
      </ui-table>
    </div>

    <div class="page__banner banner" v-if="pagination.content.length === 0 && !(stateGetJournal.isLoading || stateGetDevices.isLoading)">
      Журнал пуст <q-icon name="mdi-card-bulleted-off-outline" style="font-size: 1.8rem"/>
    </div>
  </q-card-section>

  <q-inner-loading 
      :showing="stateGetJournal.isLoading || stateGetDevices.isLoading" 
      class="journal__loader"
  >
    <q-spinner-ball size="70px" color="primary"/>
    <span class="q-mt-lg">Идёт загрузка событий...</span>
  </q-inner-loading>
</q-card>
</template>

<style lang="scss" scoped>
.journal{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: inherit;

  &__toolbar{
    display: flex;
    align-items: center;
  }

  &__list{
    padding: 0.8rem 0;

    max-height: calc(100vh - 190px);
    min-height: 400px;

    display: flex;
    flex-direction: column;
  }

  &__loader{
    z-index: 2;
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