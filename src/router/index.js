import { createRouter, createWebHistory } from 'vue-router'

import { admin_routes } from './routes/admin.routes'
import { user_routes } from './routes/user.routes'
import { shared_routes } from './routes/shared.routes'

console.log(admin_routes)

const routes = [
  ...admin_routes.value,
  ...user_routes.value,
  ...shared_routes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export const onPage = (name)=>name == router.currentRoute.value.name