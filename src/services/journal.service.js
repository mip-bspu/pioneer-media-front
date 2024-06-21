import client from '@/client'

export function getJournal(page = 0, page_size = 10) {
  return client.get("/journal", {
    params: { page, page_size }
  })
}