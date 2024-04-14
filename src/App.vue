<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "./components/layout/Sidebar.vue"

import { ref } from 'vue'

let role = ref("admin")

</script>

<template>
<div class="app">
  <template v-if="role == 'user'">
    <navbar/>

    <div class="app__content">
      <Sidebar/>

      <div class="app__view">
        <router-view/>
      </div>
    </div>
  </template>

  <template v-else>
    <router-view/>
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
