import { productsListApi } from '../../services/products'

export const loadProduct = (payload) => {
  return async dispatch => {
    let res = await productsListApi({ per: payload.pageSize, page: payload.current })
    let action = {
      type: "PRODUCT_LIST",
      payload: { ...res.data, current: payload.current, pageSize: payload.pageSize }
    }
    dispatch(action)
  }
}