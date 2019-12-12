import { call } from '../core/sse'

export async function getUser() {
  return call('userInfo')
}