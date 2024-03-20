<script setup>
import { ref } from 'vue'

let files = ref([])

</script>

<template>
<div class="setup card">
  <div class="card__header">
    <h6>Создание события</h6>
  </div>

  <div class="setup__wrapper card__body">
    <div class="setup__row">
      <label class="setup__input">
        <span class="setup__label">Название:</span>
        <q-input outlined dense background/>
      </label>

      <label class="setup__input">
        <span class="setup__label">Тэги:</span>
        <q-select dense outlined multiple use-chips/>
      </label>
    </div>
   
    <div class="setup__row">
      <label class="setup__input">
        <span class="setup__label">Начало жизни:</span>
        <ui-date-input outlined dense/>
      </label>

      <label class="setup__input">
        <span class="setup__label">До:</span>
        <ui-date-input outlined dense/>
      </label>
    </div>

    <div class="setup__row">
      <ui-area-uploader v-model="files" class="setup__uploader">
        <div v-for="file in files">
          <span>{{ file.name }}</span>
        </div>
      </ui-area-uploader>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.setup{
  height: 100%;
  width: 100%;

  &__wrapper{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__row{
    display: flex;
    gap: 1rem;
  }

  &__input{
    width: 100%;
    max-width: 300px;
  }
  &__label{

  }

  &__uploader{
    height: 200px;
  }
}
</style>