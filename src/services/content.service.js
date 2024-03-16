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