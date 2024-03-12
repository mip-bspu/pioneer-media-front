<script setup>
import { ref } from 'vue'

defineProps({
})

const emit = defineEmits([])


const contents = ref([
  {name: 'content 1', from: '', to: '', file: null, isSetup: false, type: 'изображение'},
  {name: 'content 2', from: '', to: '', file: null, isSetup: false, type: 'видео'},
  {name: 'content 3', from: '', to: '', file: null, isSetup: false}
])
</script>

<template>
<div class="content">
  <table class="content__table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Тип</th>
        <th>Настроен</th>
      </tr>
    </thead>
    <tbody>
      <tr class="content__row" v-for="content in contents" v-ripple>
        <td>{{ content.name }}</td>
        <td>{{ content.type }}</td>
        <td>{{ content.isSetup }}</td>
      </tr>
    </tbody>
  </table>
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
</style>