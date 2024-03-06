import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import { router } from "@/router"

import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '@/assets/style.css'


const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  lang: quasarLang
})

app.use(router)

app.mount('#app')
