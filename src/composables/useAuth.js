import * as AuthService from '@/services/auth.service.js'
import { useStore } from '@/store/useStore'
import { ref } from 'vue'
import { router } from '@/router'

let { store: UserStore } = useStore("user")

async function onLogin({login, password}){
  try{
    const { data } = await AuthService.login({login, password})

    await UserStore.setUser(data)

    if(data.groups.find(g=>g === "ADMIN")){
      await router.replace("/users")
    }else if(data.groups.find(g=>g === "USER")){
      await router.replace("/actions")
    }
  }catch(e){
    throw e
  }
}

async function onLogout(){
  AuthService.logout()
  await UserStore.setUser(null)
  router.replace("/auth")
}

function inAnyGroup(groups){
  return !!UserStore.getGroups() && AuthService.inAnyGroup(UserStore.getGroups(), groups)
}

export function useAuth(){
  return {
    onLogin,
    onLogout,
    inAnyGroup
  }
}