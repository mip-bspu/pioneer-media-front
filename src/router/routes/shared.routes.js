import { computed } from 'vue'

import Login from '@/views/shared/Login.vue'

export const shared_routes = [
  {
    name: "login",
    path: "/auth",
    component: Login,
  }
]