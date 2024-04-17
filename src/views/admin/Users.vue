<script setup>
// TODO: check async if return null
// TODO: add in async global notification about error
import ListUsers from '@/components/users/ListUsers.vue'

import { ref, watch } from 'vue'
import { getUsers } from '@/services/admin.service.js'
import { useAsync } from '@/composables/useAsync';

const {
  exec: execGetUsers,
  state: stateGetUsers
} = useAsync(getUsers)

let users = ref([])


async function onGetUsers(){
  const response = await execGetUsers()

  users.value = !stateGetUsers.isError ? response.data : [];
}

onGetUsers()
</script>

<template>
<q-card class="users">
  <q-card-section class="users__list">
    <list-users :users="users"/>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.users{
  height: 100%;

  &__list{
    height: 100%;
  }
}
</style>