<script setup>
defineProps({
  data: {type: Object}
})
</script>

<template>
<div class="timeline">
  <span class="timeline__name ellipsis">
    {{ data.name }}
  </span>

  <q-tooltip anchor="bottom start" self="top start">
    <div class="timeline__tip line-tip">
      <div class="line-tip__name">Название: {{ data.name }}</div>
      <div v-if="data.tags.length">Тэги: {{ data.tags.map(t=>t.name).join(", ")}}</div>
    </div>
  </q-tooltip>
</div>
</template>

<style lang="scss" scoped>
.timeline{
  position: absolute;

  height: 36px;
  padding: 0 0.6em;

  display: flex;
  align-items: center;

  user-select: none;
  border-radius: 0.3rem;

  &__name{
    text-transform: capitalize;
  }
  &__tip{
    font-size: 0.8rem;
  }
}
.line-tip{
  &__name{
    text-transform: capitalize;
  }
}
</style>