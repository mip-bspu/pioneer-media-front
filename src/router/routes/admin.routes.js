import Main from '@/views/admin/Main.vue'

import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { availableRoutes } from '@/utils/routes.util.js'

const { inAnyGroup } = useAuth()

export const routes = [
  {
    name: "users",
    path: "/users",
    component: Main,
    meta: {
      icon: "mdi-account-group",
      name: "Users",
      isAuth: ()=>inAnyGroup(['ADMIN']),
      layout: ["sidebar"]
    }
  }
]

export const admin_routes_available = computed(()=>availableRoutes(routes))