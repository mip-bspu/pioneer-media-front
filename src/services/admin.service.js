import client from '@/client'

export function getUsers(){
  return client.get('/admin/users')
}

export function setActiveUser({id, active}){
  return client.post(`/admin/users/${id}/active`, { active })
}

export function updateUser({id, tags, groups}){
  let data = new FormData()

  for(let tag of tags){
    data.append("tags[]", tag.name)
  }

  for(let group of groups){
    data.append("groups[]", group)
  }

  return client.put(`/admin/users/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function getTags({tags = null, types = null}){
  let params = {}
  if( tags ) params["tags"] = tags.join(",")
  if( types ) params["types"] = types.join(",")

  return client.get(`/admin/tags`, {
    params: params
  })
}

export function getGroups(){
  return client.get(`/admin/groups`)
}