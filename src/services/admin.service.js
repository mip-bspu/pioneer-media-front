import client from '@/client'

export function getUsers(){
  return client.get('/admin/users')
}

export function setActiveUser({id, active}){
  return client.post(`/admin/users/${id}/active`, { active })
}