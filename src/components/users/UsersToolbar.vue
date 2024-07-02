<script setup>
import CreateUserForm from './CreateUserForm.vue'; 

import { ref } from 'vue'

defineProps({
  updateList: {type: Function}
})

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
      <create-user-form :update="updateList"/>
    </q-dialog>
  </q-card-section>
</q-card>
</template>

<style lang="scss" scoped>

</style>