import client from '@/client'

export function getListContent(tags = [], page = 0, page_size = 20){
  return client.get(`/content`, {
    params: {
      page: page,
      page_size: page_size,
      tags: tags.join(",")
    }
  })
}

export function updateContent(contentId, {name = "", from = "", to = "", tags = [], file = null}){
  let form = new FormData()
  
  form.append("name", name || "")
  form.append("from", from || "")
  form.append("to", to || "")
  form.append("tags", JSON.stringify(tags.map(tag=>tag.name)))

  if( file ){
    form.append("file", file)
  }

  return client.put(`/content/${contentId}`, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}