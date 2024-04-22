import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import quasarIconSet from "quasar/icon-set/mdi-v6";
import { router } from "@/router"
import ComponentsUI from "@/components/UI"

import App from './App.vue'

import "@quasar/extras/mdi-v6/mdi-v6.css";
import 'quasar/src/css/index.sass'

import '@/assets/style.css'

import '@/utils/date.util.js'

import { isAuth } from '@/store/useStore'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify
  },
  lang: quasarLang,
  iconSet: quasarIconSet
})

app.use(router)

Object.keys(ComponentsUI).forEach(component=>{
  app.component(component, ComponentsUI[component])
})

export const $$ = {
  isAuth
}
app.config.globalProperties.$$ = $$;

app.mount('#app')
