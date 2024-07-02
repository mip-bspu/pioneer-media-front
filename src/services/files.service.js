import client from '@/client'

export function getFile(uuid){
  return client.get(`/files/${uuid}/file`, {
    responseType: 'blob'
  })
}

export function getUrlFile(uuid) {
  return `${client.getUri()}/files/${uuid}/file`
}