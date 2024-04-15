import { watch, reactive } from 'vue'

const STORAGE_KEY = "pioneer_manage_media"

let store = reactive({
  localStorage: {},
  
  sessionStorage: {},
})


const users = {
  getters: {
    getUserTags: ()=>store.sessionStorage.user?.tags || null,
  
    isUser: ()=>!!store.sessionStorage.user,
  },

  setters: {
    setUserTags: (tags)=>{
      if(getters.isUser()){ 
        store.sessionStorage.user.tags = tags 
      }
    },

    setUser: (user)=>{
      console.log(getters.isUser())
    }
  }
}

const scopes = {
  "users": users
}


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


export function useStore(scope){
  if(scope === undefined) return { store }
  
  let localStore = {...scopes[scope].getters, ...scopes[scope].setters}

  return {
    store: localStore
  }
}

