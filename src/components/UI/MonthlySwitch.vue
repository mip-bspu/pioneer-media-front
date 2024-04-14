<script setup>
import { reactive, watch } from 'vue';
import { monthName } from '@/utils/map.util.js'

const emit = defineEmits(['update:month'])

let month = reactive({
  current: new Date().getMonth(),
  year: new Date().getFullYear()
})

watch(
  ()=>month,
  ()=>emit('update:month', month),
  { deep: true, immediate: true }
)

const next = ()=>{
  if(month.current > 0)
    month.current--;
  else {
    month.year--;
    month.current = 11;
  }
}
const prev = ()=>{
  if(month.current < 11)
    month.current++;
  else {
    month.year++;
    month.current = 0;
  }
}
</script>

<template>
<div class="switcher">
  <div class="switcher__wrapper">
    <q-btn 
        dense flat
        color="primary"
        class="switcher__btn"
        icon="mdi-chevron-left"
        @click="next"
    />
    <span class="switcher__text">{{ monthName[month.current] }}, {{ month.year }}</span>
    <q-btn 
        dense flat
        color="primary"
        class="switcher__btn"
        icon="mdi-chevron-right"
        @click="prev"
    />
  </div>
</div>
</template>

<style lang="scss" scoped>
.switcher{
  &__wrapper{
    width: 11em;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.2em;
  }
  &__text{
    user-select: none;
    text-transform: capitalize;
  }
  &__btn{
    font-size: 0.65em;
  }
}
</style>