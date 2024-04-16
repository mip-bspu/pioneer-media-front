import { watch, reactive, toRef } from 'vue'

const STORAGE_KEY = "pioneer_manage_media"

let store = reactive({
  localStorage: {},
  
  sessionStorage: {
    user: null
  },
})


class Users{
  constructor(user){
    this.user = user;
  }

  getTags(){ return this.user.value?.tags || null }
  getGroups(){ return this.user.value?.groups || null }
  getLogin(){ return this.user.value?.login || null }
  isUser(){ return !!this.user.value }


  setTags(tags){
    if(this.isUser()){ 
      this.user.value.tags = tags 
    }
  }

  setUser(user){
    this.user.value = user    
  }
}


const scopes = {
  "users": new Users( toRef(store.sessionStorage, 'user') )
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

export function isAuth(){
  return scopes["users"].isUser()
}

export function useStore(scope){
  if(scope === undefined) return { store }
 
  return {
    store: scopes[scope]
  }
}

