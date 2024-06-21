<script setup>
import { reactive } from "vue"
import { useAsync } from "@/composables/useAsync"
import { createTag } from "@/services/admin.service.js"
import { optionsTagType } from "@/utils/map.util.js"

const {
  state: stateCreateTag,
  exec: execCreateTag
} = useAsync(createTag)

let tag = reactive({
  name: "",
  type: ""
})
</script>

<template>
<q-btn 
    outline dense 
    class="create-tag q-px-lg"
>
  <span>Создать тэг</span>
  <q-icon name="mdi-tag-outline" class="q-ml-sm"/>

  <q-menu 
      persistent 
      class="create-tag__menu"
  >
    <div class="create-tag__content q-pt-lg q-pb-md  q-px-md">
      <div class="create-tag__row">
        <q-input v-model="tag.name" label="Название" class="create-tag__item" stack-label/>
        <q-select 
            class="create-tag__item"
            label="Тип"
            v-model="tag.type"  
            :options="optionsTagType"
            map-options stack-label emit-value
        />

        <q-btn 
            dense fill
            class="q-py-xs q-px-md" 
            color="primary"
            @click="()=>execCreateTag(tag)"
        >Создать</q-btn>
      </div>

      <div class="create-tag__row create-tag__error">
        {{ stateCreateTag.error }}
      </div>
    </div>
  </q-menu>
</q-btn>
</template>

<style lang="scss" scoped>
.create-tag{
  &__content{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    background-color: #FCFCFD;
  }

  &__row{
    width: 100%;

    display: flex;
    align-items: flex-end;
    gap: 0.8rem;
  }

  &__item{
    width: 180px;
  }

  &__error{
    color: rgb(206, 1, 1);
    font-size: 0.8rem;

    height: 0.9rem;
  }
}
</style>