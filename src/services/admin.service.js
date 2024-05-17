import client from '@/client'

export function getUsers(){
  return client.get('/admin/users')
}

export function setActiveUser({id, active}){
  return client.post(`/admin/users/${id}/active`, { active })
}

function createFormForUser({login = null, password = null, tags, groups}){
  let data = new FormData()

  login && data.append("login", login)
  password && data.append("password", password)

  for(let tag of tags){
    data.append("tags[]", tag.name)
  }

  for(let group of groups){
    data.append("groups[]", group)
  }

  return data;
}

export function updateUser({id, tags, groups}){
  let data = createFormForUser({tags, groups})

  return client.put(`/admin/users/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function createUser({login, password, tags, groups}){
  let data = createFormForUser({login, password, tags, groups})

  return client.post('/admin/user', data, {
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

export async function getOptions(){
  const options = {
    tags: [],
    groups: []
  }
  
  options.tags = (await getTags({})).data
  options.groups = (await getGroups()).data
  
  return options
}

export function createTag({name, type}) {
  return client.post("/admin/tag", {
    name,
    type
  })
}