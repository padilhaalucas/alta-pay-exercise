import { useMemo, useCallback } from 'react'
import { actions as orderActions, selectors as orderSelectors } from '../store/reducers/orders/index'

import { useDispatch, useSelector } from 'react-redux' 
import { bindActionCreators } from 'redux'

export const useOrdersActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
      {
        getOrders: orderActions.getOrders,
        getOrderByID: orderActions.getOrderByID,
        createOrder: orderActions.createOrder,
      },
      dispatch
    ), [dispatch]
  )

  const getOrders = useCallback(() => actions.getOrders(), [actions])
  const getOrderByID = useCallback((id) => actions.getOrderByID(id), [actions])
  const createOrder = useCallback((data) => actions.createOrder(data), [actions])

  return {
    getOrders,
    getOrderByID,
    createOrder
  }
}

export const useOrders = () => {

  const loaded = useSelector(state => orderSelectors.loaded(state))
  const loading = useSelector(state => orderSelectors.loading(state))
  const error = useSelector(state => orderSelectors.error(state))
  const allOrders = useSelector(state => orderSelectors.all(state))

  return {
    loaded,
    loading,
    error,
    allOrders
  }
}
