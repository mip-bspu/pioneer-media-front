<script setup>
import { ref, watch } from 'vue'

let props = defineProps({
  content: {type: Object, default: null},
  tags: {type: Array, default: []}
})

const getNameOfTag = (tag)=>tag.name
</script>

<template>
<div class="set-content">
  <div class="set-content__wrapper">
    <label class="set-content__input">
      <span class="set-content__label">Название:</span>
      <q-input outlined dense v-model="content.name"/>
    </label>

    <label class="set-content__input">
      <span class="set-content__label">Дата начала:</span>
      <ui-date-input outlined dense v-model="content.from"/>
    </label>

    <label class="set-content__input">
      <span class="set-content__label">Дата окончания:</span>
      <ui-date-input outlined dense v-model="content.to"/>
    </label>

    <label class="set-content__input">
      <span class="set-content__label">Тэги:</span>
        <q-select
            outlined dense
            :options="tags"
            :option-label="getNameOfTag"
            v-model="content.tags"
            multiple
            use-chips
        />
    </label>
  </div>
</div>
</template>

<style lang="scss" scoped>
.set-content{
  &__wrapper{
    display: flex;
    flex-direction: column;
    gap: 0.5rem
  }

  &__label{
    font-size: 0.96rem;

    padding-left: 0.3rem;
  }
}
</style>