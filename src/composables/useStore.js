import { watch, reactive } from 'vue'

const STORAGE_KEY = "pioneer_manage_media"

let store = reactive({
  localStorage: {
    user: {
      tags: ['blg']
    }
  },
  
  sessionStorage: {}
})


Object.assign(
  store.localStorage, 
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") 
)

Object.assign(
  store.sessionStorage,
  JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}")
)


watch(
  ()=>store.localStorage,
  ()=>localStorage.setItem(STORAGE_KEY, JSON.stringify(store.localStorage)),
  {deep: true}
)

watch(
  ()=>store.sessionStorage,
  ()=>sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store.sessionStorage)),
  {deep: true}
)


export function useStore(){

  return {
    store
  }
}

