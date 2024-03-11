<script setup>

</script>

<template>
<div class="card q-mt-lg">
  <div class="card__header">
    <h6>Загруженные файлы</h6>
  </div>

  <div class="card__body toolbar toolbar__columns">
    <div class="toolbar__column">
      <ui-input-file style="padding: 0.4rem 1.2rem;"/>
    </div>
    <div class="toolbar__column">
      <q-btn dense flat icon="mdi-view-module"/>
      <q-btn dense flat icon="mdi-view-list"/>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.toolbar{
  &__columns{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__column{
    display: flex;
    gap: 0.2rem;
  }
}
</style>