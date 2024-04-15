import client from '@/client'

export function login({login, password}){
  return client.post('/auth', {
      login,
      password
  })
}