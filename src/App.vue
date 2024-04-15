<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "./components/layout/Sidebar.vue"

import { ref } from 'vue'
import { useStore } from '@/composables/useStore'
import { router, onPage } from '@/router'

const { store: UserStore } = useStore("users")


if( !UserStore.isUser() ){
  router.replace("/auth")
}

</script>

<template>
<div class="app">
  <template v-if="onPage('login')">
    <router-view/>
  </template>

  <template v-else>
    <navbar/>

    <div class="app__content">
      <Sidebar/>

      <div class="app__view">
        <router-view/>
      </div>
    </div>
  </template>
</div>
</template>

<style scoped lang="scss">
.app{
  display: flex;
  flex-direction: column;

  height: 100vh;
  overflow-x: hidden;

  &__content{
    flex: 1 1 0;
    display: flex;

    flex-wrap: nowrap;
  }

  &__view{
    flex: 1 1 0;

    display: flex;
    flex-direction: column;
  }
}
</style>
