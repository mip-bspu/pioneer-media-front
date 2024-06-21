import { computed } from 'vue' 
import { useAuth } from '@/composables/useAuth'
import { availableRoutes } from '@/utils/routes.util.js'

const { inAnyGroup } = useAuth()

export const routes = [
  {
    name: "actions",
    path: "/actions",
    component: ()=>import('@/views/user/Action.vue'),
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
    component: ()=>import('@/views/user/Device.vue'),
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
    component: ()=>import('@/views/user/Schedule.vue'),
    meta: {
      name: "Расписание",
      layout: ["sidebar"],
      icon: "mdi-calendar-range-outline",
      isAvailable: ()=>inAnyGroup(['USER', 'VIEWER'])
    }
  },

  {
    name: "journal",
    path: "/journal",
    component: ()=>import('@/views/user/Journal.vue'),
    meta: {
      name: "История показа",
      layout: ["sidebar"],
      icon: "mdi-clipboard-text-clock-outline",
      isAvailable: ()=>inAnyGroup(['USER', 'VIEWER'])
    }
  },
]

export const user_routes_available = computed(()=>availableRoutes(routes))