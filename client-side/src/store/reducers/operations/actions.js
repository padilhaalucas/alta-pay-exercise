import axios from 'axios'
import * as actionTypes from './actionTypes'

import baseUrl from '../../../utils/url'

const abstractOperation = (id, type, data) => {
  return (dispatch) => {

    if (!type) {
      dispatch({ type: actionTypes.FALLBACK })
    }

    dispatch({
      type: `${type?.toUpperCase()}_REQUEST`,
      payload: data
    })

    axios.post(`${baseUrl}/shopOrders/${id}/${type}`, data, {})
      .then((res) => {
        if (res) {
          dispatch({
            type: `${type?.toUpperCase()}_REQUEST_SUCCESS`,
            res
          })
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: `${type?.toUpperCase()}_REQUEST_FAIL`,
            error
          })
        }
      })
  }
} 


export { abstractOperation }
