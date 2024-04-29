<script setup>
const props = defineProps({
  data: {type: Object},
  close: {type: Function}
})
</script>

<template>
<div class="menu">
  <div class="menu__wrapper q-pb-md q-pt-md">
    <q-card-section class="q-pb-none">
      <div class="menu__title">
        Настройка устройства
      </div>
    </q-card-section>
    
    <q-card-section>
      <q-input stack-label label="Токен" :model-value="data.token"/>
    </q-card-section>
    
    <q-card-actions class="menu__btns q-px-md">
      <q-btn size="sm" outline class="menu__btn" @click="close">отмена</q-btn>
      <q-btn size="sm" color="primary" class="menu__btn">Принять изменения</q-btn>
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
}
</style>