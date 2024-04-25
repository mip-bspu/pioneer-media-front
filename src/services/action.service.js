import client from '@/client'

export function createAction({name, from, to, tags = [], priority = 0, files}){
  let data = createFormForAction({name, from, to, priority, tags, files})

  return client.post('/action', data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function getListActions({tags, page, page_size = 20}){
  return client.get('/action', {
    params: {
      page: page,
      page_size: page_size,
      tags: tags.map(t=>t.name).join(",")
    }
  })
}

export function updateAction(id, {name, from, to, priority, tags}){
  let data = createFormForAction({name, from, to, priority, tags})

  return client.put(`/action/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function deleteAction(id){
  return client.delete(`/action/${id}`)
}

function createFormForAction({name, from, to, priority, tags = [], files = []}){
  let data = new FormData()

  data.append("name", name)
  data.append('from', from)
  data.append('to', to)
  data.append('priority', priority)

  for(let file of files){
    data.append('files[]', file)
  }

  for(let tag of tags){
    data.append('tags[]', tag.name)
  }

  return data
}