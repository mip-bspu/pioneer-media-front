<script setup>
defineProps({
  user: {type: Object, required: true},
  options: {type: Object}
})
</script>

<template>
<div class="inputs-user">
  <q-input label="Логин" stack-label v-model="user.login"/>
  <q-select multiple label="Тэги" stack-label v-model="user.tags" :options="options.tags" option-label="name"/>
  <q-input label="Пароль" stack-label v-model="user.password"/>
  <q-select multiple label="Права" stack-label v-model="user.groups" :options="options.groups"/>
</div>
</template>

<style lang="scss" scoped>
.inputs-user{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>