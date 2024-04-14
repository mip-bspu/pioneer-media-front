<script setup>
import { ref } from 'vue'

let form = ref({
  login: '',
  password: ''
})
</script>

<template>
<div class="login">
  <div class="login__wrapper">
    <q-form class="form">
      <q-card class="form__wrapper">
        <q-card-section class="q-px-none q-pt-none q-pb-xs">
          <div class="form__title">Вход</div>
        </q-card-section>

        <q-card-section class="q-px-none form__inputs">
          <label class="form__input-box">
            <div class="form__label">Логин</div>
            <q-input dense outlined v-model="form.login"/>
          </label>

          <label class="form__input-box">
            <div class="form__label">Пароль</div>
            <q-input dense outlined v-model="form.password"/>
          </label>
        </q-card-section>
        
        <q-card-actions class="q-px-none q-pt-lg justify-center">
          <q-btn class="form__btn" color="primary">Войти</q-btn>
        </q-card-actions>
        
        <div class="form__footer">
          <q-separator inset color="primary" class="q-mt-sm" style="width: 30%"/>
        </div>
      </q-card>
    </q-form>
  </div>
</div>
</template>

<style lang="scss" scoped>
.login{
  height: 100%;

  &__wrapper{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.form{
  &__wrapper{
    min-width: 400px;

    padding: 1.4rem 1rem;

    border-radius: 1rem;
  }
  &__title{
    font-size: 1.4rem;
  }
  &__inputs{
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  &__label{
    padding-left: 0.2rem;
    padding-bottom: 0.1rem;
  }
  &__btn{
    width: 100%;
  }

  &__footer{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>