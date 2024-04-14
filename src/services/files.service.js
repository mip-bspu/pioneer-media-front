import client from '@/client'

export function getFile(uuid){
  return client.get(`/files/${uuid}/file`, {
    responseType: 'blob'
  })
}