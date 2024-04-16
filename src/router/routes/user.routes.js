import Device from '@/views/Device.vue'
import Action from '@/views/Action.vue'
import Schedule from '@/views/Schedule.vue'

import { computed } from 'vue' 
import { useAuth } from '@/composables/useAuth'
import { availableRoutes } from '@/utils/routes.util.js'

const { inAnyGroup } = useAuth()

export const routes = [
  {
    name: "actions",
    path: "/actions",
    component: Action,
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
    component: Device,
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
    component: Schedule,
    meta: {
      name: "Расписание",
      layout: ["sidebar"],
      icon: "mdi-calendar-range-outline",
      isAvailable: ()=>inAnyGroup(['USER'])
    }
  },
]

export const user_routes_available = computed(()=>availableRoutes(routes))