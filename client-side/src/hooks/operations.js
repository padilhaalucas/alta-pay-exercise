import { useMemo, useCallback } from 'react'
import { actions as operationActions, selectors as operationSelectors } from '../store/reducers/operations/index'

import { useDispatch, useSelector } from 'react-redux' 
import { bindActionCreators } from 'redux'

export const useOperationsActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
      {
        abstractOperation: operationActions.abstractOperation,
      },
      dispatch
    ), [dispatch]
  )

  const abstractOperation = useCallback((id, type, data) => actions.abstractOperation(id, type, data), [actions])

  return { abstractOperation }
}

export const useOperations = () => {

  // Reserve
  const isReserveLoaded = useSelector(state => operationSelectors.isReserveLoaded(state))
  const isReserveLoading = useSelector(state => operationSelectors.isReserveLoading(state))
  const reserveError = useSelector(state => operationSelectors.reserveError(state))
  const lastReserved = useSelector(state => operationSelectors.lastReserved(state))
  
  // Release
  const isReleaseLoaded = useSelector(state => operationSelectors.isReleaseLoaded(state))
  const isReleaseLoading = useSelector(state => operationSelectors.isReleaseLoading(state))
  const releaseError = useSelector(state => operationSelectors.releaseError(state))  
  const lastReleased = useSelector(state => operationSelectors.lastReleased(state))
  
  // Refund
  const isRefundLoaded = useSelector(state => operationSelectors.isRefundLoaded(state))
  const isRefundLoading = useSelector(state => operationSelectors.isRefundLoading(state))
  const refundError = useSelector(state => operationSelectors.refundError(state))
  const lastRefunded = useSelector(state => operationSelectors.lastRefunded(state))
  
  // Capture
  const isCaptureLoaded = useSelector(state => operationSelectors.isCaptureLoaded(state))
  const isCaptureLoading = useSelector(state => operationSelectors.isCaptureLoading(state))
  const captureError = useSelector(state => operationSelectors.captureError(state))
  const lastCaptured = useSelector(state => operationSelectors.lastCaptured(state))

  return {
    isReserveLoaded,
    isReserveLoading,
    reserveError,
    lastReserved,

    isReleaseLoaded,
    isReleaseLoading,
    releaseError,
    lastReleased,

    isRefundLoaded,
    isRefundLoading,
    refundError,
    lastRefunded,

    isCaptureLoaded,
    isCaptureLoading,
    captureError,
    lastCaptured
  }
}
