import client from '@/client'
import { getNameFromTag } from '@/utils/format.util.js'

export function getListDevices(){
  return client.get(`/devices`)
}

export function getMinListDevices(){
  return client.get(`/devices/min`)
}

export function createDevice({description, token, tags}){
  return client.post(`/devices`, {
    description,
    token,
    tags: tags.map(t=>getNameFromTag(t)),
  })
}

