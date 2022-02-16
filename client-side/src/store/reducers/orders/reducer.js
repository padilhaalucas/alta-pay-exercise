import * as actionTypes from './actionTypes'
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  loaded: null,
  loading: null,
  error: null,
  all: []
}

function get(state) {
  state.loaded = false
  state.loading = true
  state.error = null
}

function error(state, action) {
  state.loaded = true
  state.loading = false
  state.error = action.error
}

function success(state) {
  state.loaded= true
  state.loading = false
  state.error = false
}

const getOrdersReducer = createReducer(initialState, {
  [actionTypes.GET_ORDERS_REQUEST]: get,
  [actionTypes.GET_ORDERS_REQUEST_FAIL]: error,
  [actionTypes.GET_ORDERS_REQUEST_SUCCESS]: (state, action) => {

    state.all = action?.res?.data
    success(state)
  },
})

const getOrderByIDReducer = createReducer(initialState, {
  [actionTypes.GET_ORDER_BY_ID_REQUEST]: get,
  [actionTypes.GET_ORDER_BY_ID_REQUEST_FAIL]: error,
  [actionTypes.GET_ORDER_BY_ID_REQUEST_SUCCESS]: (state, action) => {

    state.currentOrder = action?.res?.data
    success(state)
  },
})

const createOrderReducer = createReducer(initialState, {
  [actionTypes.CREATE_ORDER_REQUEST]: get,
  [actionTypes.CREATE_ORDER_REQUEST_FAIL]: error,
  [actionTypes.CREATE_ORDER_REQUEST_SUCCESS]: (state, action) => {

    state.createdOrder = action?.res?.data
    success(state)
  },
})

export default function reducer(state = initialState, action={}) {
  return {
    get: getOrdersReducer(state.orders, action),
    create: createOrderReducer(state.orders, action),
  }
}
