const defaultVal = {
  list: [],
  page: 1,
  total: 0
}
const products = (state = defaultVal, action) => {
  console.log(action);
  switch (action.type) {
    case 'PRODUCT_LIST':
      return { ...state, list: action.payload.products, current: action.payload.current, total: action.payload.totalCount }
    default:
      return state
  }
}

export default products