<script setup>
import { createUser } from '@/services/admin.service.js'
import { useAsync } from '@/composables/useAsync';
import { getOptions } from '@/services/admin.service.js'
import { reactive } from 'vue'

const {
  exec: execGetOptions
} = useAsync(getOptions, {globalError: true})

const {
  exec: execCreateUser
} = useAsync(createUser, {globalError: true, msgSuccess: "Пользователь успешно создан"})

let user = reactive({
  login: '',
  password: '',
  tags: [],
  groups: []
})

let options = reactive({
  tags: [],
  groups: []
})

const onGetOptions = async ()=>{
  const nOptions = await execGetOptions()
  if(nOptions){
    Object.assign(options, nOptions)
  }
}
onGetOptions()

const onCreateUser = async ()=>{
  await execCreateUser(user)
}
</script>

<template>
<q-card class="create-user">
  <div class="create-user__wrapper">
    <q-card-section>
      <div class="create-user__title">Создание пользователя</div>
    </q-card-section>

    <q-separator/>

    <q-card-section class="create-user__inputs">
      <q-input label="login" v-model="user.login"/>
      <q-select multiple label="Тэги" v-model="user.tags" :options="options.tags" option-label="name"/>
      <q-input label="password" v-model="user.password"/>
      <q-select multiple label="Права" v-model="user.groups" :options="options.groups"/>
    </q-card-section>

    <q-card-section class="create-user__btns q-my-md">
      <q-btn color="primary" class="q-px-lg" @click="onCreateUser">создать</q-btn>
    </q-card-section>
  </div>
</q-card>
</template>

<style lang="scss" scoped>
.create-user{
  max-width: 800px;
  width: 100%;

  &__title{
    font-size: 1.4rem;
  }
  &__inputs{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, auto));
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
  }
  &__btns{
    display: flex;
    justify-content: end;
  }
}
</style>