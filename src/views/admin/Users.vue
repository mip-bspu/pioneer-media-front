<script setup>
// TODO: check async if return null
// TODO: add in async global notification about error
import ListUsers from '@/components/users/ListUsers.vue'
import UsersToolbar from '@/components/users/UsersToolbar.vue'

import { useUsers } from '@/composables/useUsers';

const { users, updateUsersList } = useUsers()
</script>

<template>
<q-card flat class="users">
  <q-card-section>
    <users-toolbar :update-list="updateUsersList"/>
  </q-card-section>

  <q-card-section flat class="users__list q-px-none q-pt-none">
    <list-users :users="users"/>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>
.users{
  height: 100%;
  background-color: inherit;

  display: flex;
  flex-direction: column;

  &__list{
    flex: 1 1 100%;
  }
}
</style>