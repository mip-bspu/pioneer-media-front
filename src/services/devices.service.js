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

export function updateDevice(old_token, {token, description, tags}){
  return client.put(`/devices/${old_token}`, {
    new_token: token,
    description,
    tags: tags.map(t=>getNameFromTag(t)),
  })
}

