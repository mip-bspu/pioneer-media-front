import client from '@/client'

export function getListDevices(){
  return client.get(`/devices`)
}

