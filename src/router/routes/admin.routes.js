import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { availableRoutes } from '@/utils/routes.util.js'

const { inAnyGroup } = useAuth()

export const routes = [
  {
    name: "users",
    path: "/users",
    component: ()=>import('@/views/admin/Users.vue'),
    meta: {
      icon: "mdi-account-group",
      name: "Users",
      isAvailable: ()=>inAnyGroup(['ADMIN']),
      layout: ["sidebar"]
    }
  }
]

export const admin_routes_available = computed(()=>availableRoutes(routes))