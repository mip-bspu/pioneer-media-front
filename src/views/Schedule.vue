<script setup>
import ScheduleTimelineActions from '@/components/schedule/ScheduleTimelineActions.vue'

import { ref } from 'vue'

let month = ref(null)

// TODO: create split schedule how in notion
</script>

<template>
<q-card class="schedule">
  <q-card-section class="schedule__toolbar">
    <div class="schedule__title">Расписание</div>

    <q-separator vertical inset size="2px" color="primary" class="q-mx-lg"/>

    <ui-monthly-switch class="schedule__switch-month" @update:month="(v)=>month = v"/>
  </q-card-section>

  <q-card-section class="schedule__calendar">
    <schedule-timeline-actions v-model:month="month"/>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.schedule{
  background-color: inherit;

  flex: 1 1 100%;
  display: flex;
  flex-direction: column;

  &__toolbar{
    display: flex;
    align-items: center;
  }
  &__calendar{
    flex: 1 1 100%;
  }
  &__title{
    display: inline-block;
    font-size: 1.7rem;
  }
  &__switch-month{
    font-size: 1.5rem;
  }
}
</style>