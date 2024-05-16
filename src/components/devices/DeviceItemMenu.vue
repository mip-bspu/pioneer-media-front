<script setup>
defineProps({
  data: {type: Object},
  close: {type: Function}
})
</script>

<template>
<div class="menu">
  <div class="menu__wrapper q-pt-sm q-pb-md">
    <q-card-section class="menu__label q-py-xs">
      <span>Токен:</span>
      <span class="menu__token">{{ data.token }}</span>
    </q-card-section>
    
    <q-card-actions class="menu__btns q-py-xs q-px-md">
      <q-btn size="sm" outline class="menu__btn" @click="close">отмена</q-btn>
    </q-card-actions>
  </div>
</div>
</template>

<style lang="scss" scoped>
.menu{
  &__btn{
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  &__btns{
    display: flex;
    flex-direction: row;
    justify-content: end;

    font-weight: 600 !important;
  }
  &__label{
    display: flex;
    flex-direction: column;

    span:first-child{
      color: rgb(107, 107, 107);
    }
  }
  &__token{
    font-size: 1.4rem;
    font-weight: 600;

    line-height: 0.9em;
  }
}
</style>