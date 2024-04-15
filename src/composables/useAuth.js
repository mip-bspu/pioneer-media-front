import * as AuthService from '@/services/auth.service.js'
import { useStore } from '@/composables/useStore'
import { ref } from 'vue'

let { UserStore } = useStore("users")

async function onLogin({login, password}){
  try{
    const { data } = await AuthService.login({login, password})
    UserStore.setUser(data)
  }catch(e){
    throw e
  }
}

export function useAuth(){
  return {
    onLogin
  }
}