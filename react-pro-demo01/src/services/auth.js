import { post } from '../pages/utils/request'
export function loginApi(data) {
  return post('/api/v1/auth/manager_login', data)

}