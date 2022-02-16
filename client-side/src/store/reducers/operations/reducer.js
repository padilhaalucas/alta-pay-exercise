import * as actionTypes from './actionTypes'
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  loaded: null,
  loading: null,
  error: null,
  res: {}
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

const reserveReducer = createReducer(initialState, {
  [actionTypes.RESERVE_REQUEST]: get,
  [actionTypes.RESERVE_REQUEST_FAIL]: error,
  [actionTypes.RESERVE_REQUEST_SUCCESS]: (state, action) => {
    success(state)

    state.res = action?.res?.data
  },
})

const releaseReducer = createReducer(initialState, {
  [actionTypes.RELEASE_REQUEST]: get,
  [actionTypes.RELEASE_REQUEST_FAIL]: error,
  [actionTypes.RELEASE_REQUEST_SUCCESS]: (state, action) => {
    success(state)

    state.res = action?.res?.data
  },
})

const refundReducer = createReducer(initialState, {
  [actionTypes.REFUND_REQUEST]: get,
  [actionTypes.REFUND_REQUEST_FAIL]: error,
  [actionTypes.REFUND_REQUEST_SUCCESS]: (state, action) => {
    success(state)
    
    state.res = action?.res?.data
  },
})

const captureReducer = createReducer(initialState, {
  [actionTypes.CAPTURE_REQUEST]: get,
  [actionTypes.CAPTURE_REQUEST_FAIL]: error,
  [actionTypes.CAPTURE_REQUEST_SUCCESS]: (state, action) => {
    success(state)
    
    state.res = action?.res?.data
  },
})

export default function reducer(state = initialState, action={}) {
  return {
    reserve: reserveReducer(state, action),
    release: releaseReducer(state.operations, action),
    refund: refundReducer(state.operations, action),
    capture: captureReducer(state.operations, action),
  }
}
