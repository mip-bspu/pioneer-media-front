<script setup>
import UserCard from '@/components/users/UserCard.vue';

import { useOptions } from "@/composables/useOptions";

defineProps({
  users: {type: Object, default: []}
})

const { options } = useOptions()
</script>

<template>
<div class="list-users">
  <div class="list-users__wrapper scroll-style">
    <div class="list-users list-users__list">
      <user-card v-for="user in users" :user="user" :options="options" class="list-users__user"/>
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
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

    gap: 1rem;
  }
  &__user{
    height: 300px;
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