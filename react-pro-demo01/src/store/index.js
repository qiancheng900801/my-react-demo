import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import notices from './reducers/notices'
import products from './reducers/products'

const rootReducers = combineReducers({ notices, products })

const store = createStore(rootReducers, compose(applyMiddleware(...[thunk])))

export default store