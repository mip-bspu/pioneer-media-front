import { computed } from 'vue' 

import Content from '@/views/Content.vue'
import Device from '@/views/Device.vue'

export const routes = [
  {
    name: "content",
    path: "/",
    component: Content,
    meta: {
      name: "Контент",
      layout: ["sidebar"],
      icon: "mdi-motion-play"
    }
  },

  {
    name: "devices",
    path: "/devices",
    component: Device,
    meta: {
      name: "Устройства",
      layout: ["sidebar"],
      icon: "mdi-cellphone-link"
    }
  },
]

export const sidebar_routes = computed(()=>{
  return routes.filter(item=>item.meta.layout.includes("sidebar"))
})

export const navbar_routes = computed(()=>{
  return routes.filter(item=>item.meta.layout.includes("navbar"))
})