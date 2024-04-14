import { computed } from 'vue'

import Main from '@/views/admin/Main.vue'

const routes = [
  {
    name: "main",
    path: "/",
    component: Main,
    meta: {
      show: ()=>true
    }
  }
]


export const admin_routes = computed(()=>routes.filter(item=>item.meta.show()))



