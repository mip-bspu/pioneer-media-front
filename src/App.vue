<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "./components/layout/Sidebar.vue"

import { ref, watch } from 'vue'
import { useStore } from '@/store/useStore'
import { router, onPage } from '@/router'
import { showError, showSuccess, showInfo } from "@/services/notification.service"

const { store: UserStore } = useStore("user")
const { store: NotificationStore } = useStore("notification")

if( !UserStore.isUser() ){
  router.replace("/auth")
}

watch(
  ()=>[NotificationStore.getMessageError(), NotificationStore.getMessageSuccess(), NotificationStore.getMessageInfo()],
  async ([err, success, info])=>{
    if( err !== "" ){
      await showError(err)
      NotificationStore.setMessageError("")
      return;
    }

    if( success !== "" ){
      await showSuccess(success)
      NotificationStore.setMessageSuccess("")
      return;
    }

    if( info !== "" ){
      await showInfo(info)
      await NotificationStore.setMessageInfo("")
      return;
    }
  }
)

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
