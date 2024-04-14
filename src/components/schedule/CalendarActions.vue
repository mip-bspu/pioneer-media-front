<script setup>
import { dayOfWeek } from '@/utils/map.util.js'
import { watch, ref } from 'vue';

const props = defineProps({
  month: {type: Object, default: null}
})

 // TODO: toLocaleString ru
let days = ref([])

watch(
  ()=>props.month,
  ()=>createCalendar(props.month.current, props.month.year),
  { deep: true, immediate: true }
)

function createCalendar(month, year){
  let date = new Date(year, month, 1)

  let daysOfMonth = new Array(date.getDay()).fill(null)

  for(let i = 1; i <= 31; i++){
    date.setDate(i)
    if( date.getMonth() != month ) break;

    daysOfMonth.push(i)
  }

  days.value = daysOfMonth;
}
</script>

<template>
<div class="calendar">
  <div class="calendar__wrapper calendar__grid">
    <div class="calendar__th" v-for="nameDayOfWeek in Object.values(dayOfWeek)">{{ nameDayOfWeek }}</div>
    
    <div :class="day && 'calendar__td'" v-for="day in days">
      <div v-if="day" class="calendar__day">
        {{ day }}
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.calendar{
  height: 100%;

  &__wrapper{
  }
  &__grid{
    height: 100%;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 3em auto;
  }

  &__th{
    height: 50px;
    font-size: 1.4rem;
    text-align: center;
  }
  &__td{
    margin: 0.2em;
    overflow: hidden;

    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
  }
  &__day{
    padding: 0.5rem;

    height: 100%;
    width: 100%;
   
    background-color: rgb(255, 255, 255);
  }
}
</style>