<script setup>
import CreateForm from '@/components/CreateForm.vue';
import InputsUserForForm from '@/components/users/InputsUserForForm.vue'

import { createUser } from '@/services/admin.service.js'
import { useAsync } from '@/composables/useAsync';
import { useOptions } from '@/composables/useOptions'
import { reactive } from 'vue'

const props = defineProps({
  update: {type: Function}
})

const { options } = useOptions();

const {
  exec: execCreateUser
} = useAsync(createUser, {globalError: true, msgSuccess: "Пользователь успешно создан"})

const nullUser = {
  login: '',
  password: '',
  tags: [],
  groups: []
}

let user = reactive({...nullUser})

const onCreateUser = async ()=>{
  await execCreateUser(user)
  props?.update()

  Object.assign(user, nullUser)
}
</script>

<template>
<create-form title="Создание пользователя" class="create-user" :handleCreate="onCreateUser">
  <template #inputs>
    <inputs-user-for-form v-model:user="user" :options="options"/>
  </template>
</create-form>
</template>

<style lang="scss" scoped>
.create-user{
  width: 100%;
}
</style>