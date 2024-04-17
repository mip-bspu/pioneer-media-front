<script setup>
import UserCard from '@/components/users/UserCard.vue';

import { ref } from 'vue'

defineProps({
  users: {type: Object, default: []}
})
</script>

<template>
<div class="list-users">
  <div class="list-users__wrapper scroll-style">
    <div class="list-users list-users__list">
      <user-card v-for="user in users" :user="user" class="list-users__user"/>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.list-users{
  position: relative;
  height: 100%;

  &__list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    gap: 1rem;
  }
  &__wrapper{
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;

    padding: 1rem;

    overflow-y: scroll;
  }
}
</style>