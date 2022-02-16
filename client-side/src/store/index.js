import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import ordersReducer from './reducers/orders/reducer'
import operationsReducer from './reducers/operations/reducer'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state')
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const configureStore = () => {

  const reducers = combineReducers({
    orders: ordersReducer,
    operations: operationsReducer,
  })

  const middleware = [thunk]

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const persistedStore = loadFromLocalStorage()

  const store = createStore(
    reducers,
    persistedStore,
    enhancers(applyMiddleware(...middleware))
  )
  
  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  })

  return store
}