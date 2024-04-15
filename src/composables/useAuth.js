import * as AuthService from '@/services/auth.service.js'
import { useStore } from '@/composables/useStore'
import { ref } from 'vue'
import { router } from '@/router'

let { store: UserStore } = useStore("users")

async function onLogin({login, password}){
  try{
    const { data } = await AuthService.login({login, password})

    await UserStore.setUser(data)
    await router.replace("/")  
    router.go(0)
  }catch(e){
    throw e
  }
}

function onLogout(){
  UserStore.setUser(null)
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