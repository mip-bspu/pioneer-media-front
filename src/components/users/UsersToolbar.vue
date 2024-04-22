<script setup>
import CreateUserForm from './CreateUserForm.vue'; 

import { ref } from 'vue'
import { useStore } from '@/store/useStore'

const { store: NotificationStore } = useStore("notification")

let showCreateUser = ref(false)
</script>

<template>
<q-card flat bordered>
  <q-card-section class="q-pt-lg">
    <q-btn
        @click="showCreateUser = true"
        dense outline
        class="q-px-md" color="primary"
        icon="mdi-plus"
    >Создать пользователя</q-btn>

    <q-dialog v-model="showCreateUser">
      <create-user-form/>
    </q-dialog>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>

</style>