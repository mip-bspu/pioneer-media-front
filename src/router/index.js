import { createRouter, createWebHistory } from 'vue-router'

import {routes} from './routes'

let router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router;