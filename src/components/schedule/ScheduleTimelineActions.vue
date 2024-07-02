<script setup>
import TimelineAction from '@/components/schedule/TimelineAction.vue';

import { ref, watch } from 'vue'
import { createTimeline, getActionsFromPeriod, createPeriodMonths } from '@/services/schedule.service';
import { useStore } from '@/store/useStore.js'

const { store: UserStore } = useStore("user")

const props = defineProps({
  month: {type: Object, default: { 
    current: (new Date()).getMonth(), 
    year: (new Date()).getFullYear() 
  }}
})

let rangeDays = ref([])

watch(
  ()=>props.month,
  async (month)=>{
    const period = createPeriodMonths(month.year, month.current)
    const { data } = await getActionsFromPeriod({
        tags: UserStore.getTags(), 
        from: period.begin, 
        to: period.end
    }) // TODO: async request

    rangeDays.value = createTimeline(month.year, month.current, data)
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="schedule">
    <div class="schedule__wrapper">
      <div 
          v-for="day in rangeDays"
          class="schedule__day"
          :class="{'schedule__weekend': day.day == 6 || day.day == 0, 'schedule__day_active': day.isToday}"
      >
        <div 
            class="schedule__name"
            :class="{'schedule__st': day?.monthName}"
            :data-name="day?.monthName"
        >
          {{ day.date }}
        </div>

        <div class="schedule__rows" v-if="day.actions.length">
          <timeline-action 
              v-for="action in day.actions" 
              :data="action.data" 
              :style="action.style" 
              class="schedule__timeline"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule{
  height: 100%;
  position: relative;

  &__wrapper{
    height: 100%;
    padding-top: 1.4rem;

    display: flex;
    overflow-x: scroll;

    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
  }
  &__day{
    flex: 1 0 40px;
    text-align: center;
    
    &:hover{
      border-radius: 0.3rem 0.3rem 0 0;
      background-color: rgba(0, 0, 0, 0.07);
    }

    &_active .schedule__name{
      background-color: $primary;
      border-radius: 50%;
      color: white;
    }
  }
  &__weekend{
    background-color: rgba(2, 37, 117, 0.03);
  }
  &__name{
    padding: 8px 0;
    user-select: none;
  }
  &__st{
    position: relative;

    &::after{
      content: attr(data-name);

      position: absolute;
      left: 20%;

      text-transform: capitalize;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.03em;
  
      transform: translateY(-130%);
    }
  }
  &__rows{
    position: relative;
  }
  &__timeline{
    color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }
}
</style>