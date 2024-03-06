<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "./components/layout/Sidebar.vue"
</script>

<template>
<div class="app">
  <navbar/>

  <div class="container app__content">
    <div class="row app__main">
      <Sidebar/>

      <div class="app__view">
        <router-view/>
      </div>
    </div>
  </div>
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
  }

  &__main{
    height: 100%;
    flex-wrap: nowrap;
  }

  &__view{
    margin: 1rem;

    flex: 1 1 0;
  }
}
</style>
