<script setup>
import { ref } from 'vue'

defineProps({
  contents: {type: Array, default: []},
  selected: {type: Object, default: null}
})

const emit = defineEmits(['update:selected'])


const contents = ref([
  {name: 'content 1', isSetup: true},
  {name: 'content 2'},
  {name: 'content 3'}
])
</script>

<template>
<div class="content">
  <div class="content__items">
    <div class="content__item card" v-for="content in contents">
      <span>{{ content.name }}</span>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content{
  &__items{
    margin-top: 1rem;
    width: 100%;
  }

  &__item{
    padding: 1rem;
    width: 100%;

    &:not(:first-child){
      margin-top: 0.4rem;
    }
  }
}
</style>