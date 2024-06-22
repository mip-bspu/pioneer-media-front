import client from '@/client'

export function getJournal({
    page: page = 0, 
    page_size: page_size = 10, 
    device_id: device_id
  }) {
  return client.get("/journal", {
    params: { page, page_size, device_id: device_id }
  })
}