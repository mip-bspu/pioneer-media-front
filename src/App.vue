<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "./components/layout/Sidebar.vue"

import { watch } from 'vue'
import { useStore } from '@/store/useStore'
import { router, onPage } from '@/router'
import { showError, showSuccess, showInfo } from "@/services/notification.service"
import { getSetup } from "@/services/server.service"

const { store: UserStore } = useStore("user")
const { store: NotificationStore } = useStore("notification")
const { store: SetupStore } = useStore("setup")

async function setup(){
  let res = await getSetup()

  if( res.status === 200 ){
    SetupStore.setSetup(res.data)
    return;
  }
  NotificationStore.setMessageError("Не удалось получить настройки сервера")
}

watch(
  ()=>UserStore.isUser(),
  (isUser)=>{
    isUser && setup()
  }
)

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
