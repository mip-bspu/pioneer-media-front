import { computed } from 'vue' 

import Device from '@/views/Device.vue'
import Action from '@/views/Action.vue'
import Schedule from '@/views/Schedule.vue'

import Main from '@/views/admin/Main.vue'

const routes = [

  {
    name: "devices",
    path: "/devices",
    component: Device,
    meta: {
      name: "Устройства",
      layout: ["sidebar"],
      icon: "mdi-cellphone-link",
      show: ()=>true
    }
  },

  {
    name: "actions",
    path: "/actions",
    component: Action,
    meta: {
      name: "События",
      layout: ["sidebar"],
      icon: "mdi-book-edit-outline",
      show: ()=>true
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
      show: ()=>true
    }
  },

  {
    name: "main",
    path: "/",
    component: Main,
    meta: {
      name: "Расписание",
      layout: ["sidebar"],
      icon: "mdi-calendar-range-outline",
      show: ()=>true
    }
  },
]

export const user_routes = computed(()=>routes.filter(item=>item.meta.show()))


export const sidebar_routes = computed(()=>{
  return user_routes.filter(item=>item.meta.layout.includes("sidebar"))
})

export const navbar_routes = computed(()=>{
  return user_routes.filter(item=>item.meta.layout.includes("navbar"))
})