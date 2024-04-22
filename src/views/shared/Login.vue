<script setup>
import { useAuth } from '@/composables/useAuth'
import { useAsync } from '@/composables/useAsync'
import { ref } from 'vue'

const { onLogin, onLogout } = useAuth()

const {  
  exec: execOnLogin,
  state: stateLogin
} = useAsync( onLogin )

let form = ref({
  login: '',
  password: ''
})

function onSubmit(){
  execOnLogin(form.value)
}

onLogout()

// TODO: clear history
</script>

<template>
<div class="login">
  <div class="login__wrapper">
    <q-form class="form" @submit.prevent="onSubmit">
      <q-card class="form__wrapper">
        <q-card-section class="q-px-none q-pt-none q-pb-xs">
          <div class="form__title">Вход</div>
        </q-card-section>

        <q-card-section class="q-px-none q-pb-none form__inputs">
          <label class="form__input-box">
            <div class="form__label">Логин</div>
            <q-input dense outlined v-model="form.login" type="text"/>
          </label>

          <label class="form__input-box">
            <div class="form__label">Пароль</div>
            <q-input dense outlined v-model="form.password" type="password"/>
          </label>
        </q-card-section>
        
        <q-card-section class="q-py-sm">
          <div class="form__message">
            <div class="form__error" v-if="stateLogin.isError">
              <q-icon name="mdi-alert-circle-outline"/>
              <span class="q-pl-xs">
                {{ stateLogin.error }}
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-px-none q-pt-none justify-center">
          <q-btn class="form__btn" color="primary" type="submit">Войти</q-btn>
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

    font-size: 0.9rem;
  }
  &__message{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 1.6rem;

    font-size: 0.8rem;
  }
  &__error{
    color: $negative;
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