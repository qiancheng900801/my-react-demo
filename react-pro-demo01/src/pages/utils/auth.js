export const getToken = () => {
  return localStorage.getItem('token')
}
export const setToken = (token) => {
  localStorage.setItem('token', token)
}
export const removeToken = (token) => {
  localStorage.removeItem('token')
}
export const isLogined = () => {
  return localStorage.getItem('token') ? true : false
}