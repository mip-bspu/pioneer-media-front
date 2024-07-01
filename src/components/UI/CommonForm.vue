<script setup>
defineProps({
  title: { type: String },
  close: { type: Function, default: null }
})
</script>

<template>
<q-card>
  <q-card-section class="common-form__header">
    <span>{{ title }}</span>

    <q-btn v-if="close" dense rounded class="q-ml-md" @click="close">
      <q-icon name="mdi-close"/>
    </q-btn>
  </q-card-section>

  <q-separator/>

  <q-card-section class="common-form__inputs">
    <slot name="inputs"></slot>
  </q-card-section>

  <q-card-section class="common-form__btns q-py-lg q-pt-xl">
    <slot name="btns"></slot>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.common-form{
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 1.4rem;
  }

  &__btns{
    display: flex;
    justify-content: end;
  }
}
</style>