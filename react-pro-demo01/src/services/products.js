import { get, post, del, put } from '../pages/utils/request'
// 获取商品列表
export const productsListApi = (data) => {
  return get('/api/v1/admin/products', data)
}

// 新增商品
export const productsAddApi = (data) => {
  return post(`/api/v1/admin/products`, data)
}

// 编辑商品
export const productsEditApi = (id, data) => {
  return put(`/api/v1/admin/products/${id}`, data)
}

// 删除商品
export const productsDelApi = (id) => {
  return del(`/api/v1/admin/products/${id}`)
}

// 查询商品信息
export const productsInfoApi = (id) => {
  return get(`/api/v1/admin/products/${id}`)
}