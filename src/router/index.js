import { createRouter, createWebHistory } from 'vue-router'

import {routes} from './routes'

export const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export const onPage = (name)=>name == router.currentRoute.value.name