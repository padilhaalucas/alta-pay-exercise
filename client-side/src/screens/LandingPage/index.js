import React, { useCallback, useState, useEffect } from 'react'

import { useOrdersActions, useOrders } from '../../hooks/orders'
import { useOperationsActions, useOperations } from '../../hooks/operations'
import { useAlertActions } from '../../hooks/alerts/alerts'

import Grid from '../../components/Grid/index'
import CollapsibleTable from '../../components/Table/index'
import PopUpForm from '../../components/PopUpForm/index'
import Button from '../../components/Button'

import '../../styles/globals.scss'

const LandingPage = () => {
  const { getOrders } = useOrdersActions()
  const { abstractOperation } = useOperationsActions()
  const { allOrders } = useOrders()

  const [open, setOpen] = useState(false)

  const {
    isReserveLoaded,
    isReserveLoading,
    reserveError,

    isReleaseLoaded,
    isReleaseLoading,
    releaseError,

    isRefundLoaded,
    isRefundLoading,
    refundError,

    isCaptureLoaded,
    isCaptureLoading,
    captureError
  } = useOperations()

  

  const { handleCornerAlerts } = useAlertActions({ shouldReload: false })

  useEffect(() => {
    if (isReserveLoaded) {
      handleCornerAlerts({
        loaded: isReserveLoaded,
        error: reserveError,
        resolvedMessage: !!reserveError ? 'An error occured. Try again later.' : 'You reserved with success!',
        success: reserveError === false
      })
    } else if (isReleaseLoaded) {
      handleCornerAlerts({
        loaded: isReleaseLoaded,
        error: releaseError,
        resolvedMessage: !!releaseError ? 'An error occured. Try again later.' : 'You released with success!',
        success: releaseError === false
      })
    } else if (isRefundLoaded) {
      handleCornerAlerts({
        loaded: isRefundLoaded,
        error: refundError,
        resolvedMessage: !!refundError ? 'An error occured. Try again later.' : 'You refunded with success!',
        success: refundError === false
      })
    } else if (isCaptureLoaded) {
      handleCornerAlerts({
        loaded: isCaptureLoading,
        error: captureError,
        resolvedMessage: !!captureError ? 'An error occured. Try again later.' : 'You captured with success!',
        success: captureError === null
      })
    } else return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReserveLoaded,
    isReserveLoading,
    reserveError,
    isReleaseLoaded,
    isReleaseLoading,
    releaseError,
    isRefundLoaded,
    isRefundLoading,
    refundError,
    isCaptureLoaded,
    isCaptureLoading,
    captureError
  ])

  const handleClickOpen = () => setOpen(true)

  const renderOrderTable = () => <CollapsibleTable onOperation={abstractOperation} orders={allOrders} />

  const renderOrdersList = useCallback(() => (
    <Grid className="c-fg">
      <Grid.Col className="py-3">
        <h2 className="h-3 ta-flex-start mb-1 mt-5">
          ALL ORDERS
        </h2>
        { renderOrderTable() }
      </Grid.Col>
    </Grid>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [allOrders])

  const renderForm = useCallback(() => {
    const callback = (x) => setOpen(x)
    return <PopUpForm open={open} parentCallback={callback} />
  }, [open])

  const renderEmptyComponent = () => (
    <div className='col--ctr vh-height-70'>
      <h1 className='ff-text fs-lg'>Click "All Orders" to see your orders.</h1>
    </div>
  )

  return (
    <div className={`grid--inner pVer-5 ${open ? 'blurBackground': ''}`}>
      <div className='row--sb'>
        <h1 className='ff-text fs-xl'>ALTA PAY | <span className='fs-lg'>Orders</span></h1>

        <div className='row--sa'>
          <Button type='primary' className='mHor-1' onClick={getOrders}>All Orders</Button>
          <Button type='primary' className='mHor-1' onClick={handleClickOpen}>Create Order</Button>
        </div>
      </div>
      { !open && (allOrders?.length > 0 ? renderOrdersList() : renderEmptyComponent()) }

      { open && renderForm() }
    </div>
  )
}

export default LandingPage