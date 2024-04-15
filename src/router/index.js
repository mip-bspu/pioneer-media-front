import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'
import { availableForLayout } from '../utils/routes.util'

import { routes as admin_routes, admin_routes_available } from './routes/admin.routes'
import { routes as user_routes, user_routes_available } from './routes/user.routes'
import { routes as shared_routes } from './routes/shared.routes'

const routes = [
  ...admin_routes,
  ...user_routes,
  ...shared_routes
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next)=>{
  if( to.meta?.isAuth() === false ){
    return next(false)
  }

  next()
})


export const onPage = (name)=>name == router.currentRoute.value.name

export const sidebar_routes = computed(()=>{
  return [
    ...availableForLayout(user_routes_available.value, 'sidebar'),
    ...availableForLayout(admin_routes_available.value, 'sidebar')
  ]
})

export const navbar_routes = computed(()=>{
  return [
    ...availableForLayout(user_routes_available.value, 'navbar'),
    ...availableForLayout(admin_routes_available.value, 'navbar')
  ]
})

