import { computed } from 'vue' 
import { isAuth } from '@/composables/useStore'

import Login from '@/views/shared/Login.vue'
import Home from '@/views/shared/Home.vue'

export const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "login",
    path: "/auth",
    component: Login,
    meta: {
      isAvailable: ()=>!isAuth()
    }
  }
]