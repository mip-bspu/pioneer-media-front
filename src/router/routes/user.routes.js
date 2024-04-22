import { computed } from 'vue' 
import { useAuth } from '@/composables/useAuth'
import { availableRoutes } from '@/utils/routes.util.js'

const { inAnyGroup } = useAuth()

export const routes = [
  {
    name: "actions",
    path: "/actions",
    component: ()=>import('@/views/Action.vue'),
    meta: {
      name: "События",
      layout: ["sidebar"],
      icon: "mdi-book-edit-outline",
      isAvailable: ()=>inAnyGroup(['USER'])
    }
  },

  {
    name: "devices",
    path: "/devices",
    component: ()=>import('@/views/Device.vue'),
    meta: {
      name: "Устройства",
      layout: ["sidebar"],
      icon: "mdi-cellphone-link",
      isAvailable: ()=>inAnyGroup(['USER'])
    }
  },

  {
    name: "schedule",
    path: "/schedule",
    component: ()=>import('@/views/Schedule.vue'),
    meta: {
      name: "Расписание",
      layout: ["sidebar"],
      icon: "mdi-calendar-range-outline",
      isAvailable: ()=>inAnyGroup(['USER'])
    }
  },
]

export const user_routes_available = computed(()=>availableRoutes(routes))