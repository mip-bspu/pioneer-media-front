<script setup>
defineProps({
  title: {type: String},
  handleCreate: {type: Function}
})
</script>

<template>
<q-card class="create-form">
  <div class="create-form__wrapper">
    <q-card-section class="create-form__title" v-if="title">
      <div>{{ title }}</div>
    </q-card-section>

    <q-separator/>

    <q-card-section class="create-form__inputs">
        <slot name="inputs"></slot>
    </q-card-section>

    <q-card-section class="create-form__btns q-py-lg">
      <slot name="btns"></slot>
      <q-btn 
          @click="handleCreate" 
          color="primary"
          class="create-form__btn"
      >Создать</q-btn>
    </q-card-section>
  </div>
</q-card>
</template>

<style lang="scss" scoped>
.create-form{
  &__title{
    font-size: 1.4rem;
  }
  &__btns{
    display: flex;
    justify-content: end;
  }
  &__btn{
    padding: 0 2rem;
  }
}
</style>

<style>
.create-form .q-field__label{
  font-size: 1.2rem !important;
  margin-bottom: 0.2rem;
}
</style>