<script setup>
import { ref } from 'vue'
import { getListContent } from '@/services/content.service';
import { useAsync } from '@/composables/useAsync';

defineProps({})

const emit = defineEmits(["update:active"])

const {
  state: stateGetList, // TODO: loading
  exec: execGetList
} = useAsync(getListContent)

let contents = ref([])

async function getList(){
  let response = await execGetList(["city", "blg"]) // TODO: dev tags

  if( response ){
    contents.value = response.data.content || []
  }
}
getList();
</script>

<template>
<div class="content">
  <table class="content__table" v-if="contents.length > 0">
    <thead>
      <tr>
        <th>Название</th>
        <th>Дата добавления</th>
        <th>Формат</th>
      </tr>
    </thead>
    <tbody>
      <tr 
          class="content__row" 
          v-for="content in contents"
          @click="emit('update:active', content)"
          v-ripple
      >
        <td>{{ content.name }}</td>
        <td>{{ content.date_create }}</td>
        <td>{{ content.extention }}</td>
      </tr>
    </tbody>
  </table>

  <div class="content__banner banner" v-else>
    <div class="banner__text">Необходимо добавить контент</div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__table{
    width: 100%;

    border-spacing: 0 0.5rem;
    th{
      font-weight: normal;
      text-align: left;

      padding: 0.5rem 1rem 0rem 1rem;
    }

    td{
      padding: 1rem;
      border: 1px solid rgba(0,0,0,0.1);
    }
    td:first-child{
      border-radius: 0.6rem 0 0 0.6rem;
    }
    td:last-child{
      border-radius: 0 0.6rem 0.6rem 0;
    }
    td:not(:first-child){
      border-left: 0;
    }
    td:not(:last-child){
      border-right: 0;
    }
  }

  &__row{
    position: relative;
    overflow: hidden;

    cursor: pointer;
    background-color: white;

    transition: all 0.2s ease;
    &:hover{
      background-color: rgb(239, 239, 239);
    }
  }
}
.banner{
  width: 100%;

  &__text{
    text-align: center;
  }
}
</style>