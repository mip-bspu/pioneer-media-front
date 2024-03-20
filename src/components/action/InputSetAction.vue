<script setup>

</script>

<template>
<div class="set-action">
  <label class="set-action__input">
    <span class="set-action__label">Название:</span>
    <q-input outlined dense background/>
  </label>

  <div class="block">
    <div class="block__body"> 
      <label class="set-action__input">
        <span class="set-action__label">Начало жизни:</span>
        <ui-date-input outlined dense/>
      </label>

      <label class="set-action__input">
        <span class="set-action__label">До:</span>
        <ui-date-input outlined dense/>
      </label>
    </div>
  </div>

  <label class="set-action__input">
    <span class="set-action__label">Тэги:</span>
    <q-select dense outlined multiple use-chips/>
  </label>
</div>
</template>

<style lang="scss" scoped>
.set-action{
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  &__input{
    width: 100%;
    max-width: 300px;
  }

  &__label{
    padding-left: 0.2rem;

    font-weight: 600;
    font-size: 0.9rem;
  }
}
.block{
  &__title{
    color: rgba(0, 0, 0, 0.4);
  }

  &__body{
    display: flex;
    gap: 1.5rem;
  }
}
</style>