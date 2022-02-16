import axios from 'axios'
import * as actionTypes from './actionTypes'

import baseUrl from '../../../utils/url'

const getOrders = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDERS_REQUEST })

    axios.get(`${baseUrl}/shopOrders/`)
      .then((res) => {
        res && 
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST_SUCCESS, res })
      })
      .catch((err) => {
        err &&
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST_FAIL, err })
      })
  }
}

const getOrderByID = (id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDER_BY_ID_REQUEST })

    axios.get(`${baseUrl}/shopOrders/${id}`)
      .then((res) => {
        res && 
        dispatch({ type: actionTypes.GET_ORDER_BY_ID_REQUEST_SUCCESS, res })
      })
      .catch((err) => {
        err &&
        dispatch({ type: actionTypes.GET_ORDER_BY_ID_REQUEST_FAIL, err })
      })
  }
}



const createOrder = (data) => {

  return (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_ORDER_REQUEST,
      payload: data
    })

    axios.post(`${baseUrl}/shopOrders/`, data, {})
      .then((res) => {
        if (res) {
          dispatch({
            type: actionTypes.CREATE_ORDER_REQUEST_SUCCESS,
            res
          })
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: actionTypes.CREATE_ORDER_REQUEST_FAIL,
            error
          })
        }
      })
  }
} 


export { getOrders, getOrderByID, createOrder }
