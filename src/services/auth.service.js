import client from '@/client'

export function login({login, password}){
  return client.post('/auth', {
      login,
      password
  })
}


export function logout(){
  
}

export function inAnyGroup(userGroups, groups){
  for(let group of groups){
    if( userGroups.find(g=>g === group) ) return true 
  }

  return false
}