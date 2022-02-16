import React, { useEffect, useState, useMemo } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'

import Counter from '../Counter/index'

import { useOrdersActions } from '../../hooks/orders'

const PopUpForm = (props) => {
  const { open, parentCallback } = props
  const [isOpen, setIsOpen] = useState(open)
  const [quantityModalIsOpen, setQuantityModalIsOpen] = useState(false)
  const [itemsForCheckout, setItemsForCheckout] = useState([])
  const [orderIsLoading, setOrderIsLoading] = useState(false)

  const { createOrder } = useOrdersActions()
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 10, type: 'number' },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90
    }
  ];
  
  const rows = [
    { id: 1, code: 65456456456, description: 'Versace Cotton Sweatshirt', price: 640 },
    { id: 2, code: 98789789798, description: 'Bottega Veneta Wool Trousers', price: 1235 },
    { id: 3, code: 32132131212, description: 'Canada Goose Down Jacket', price: 595 },
    { id: 4, code: 45466876542, description: 'Balenciaga Cotton T-shirt', price: 435 },
    { id: 5, code: 65498713795, description: 'Burberry Patchwork Shirt', price: 750 },
    { id: 6, code: 65748195476, description: 'Jacquemus Polo Oural Cotton Shirt', price: 180 },
    { id: 7, code: 14973586487, description: 'Tom Ford High Neck Track Jacket', price: 925 },
    { id: 8, code: 87945741668, description: 'Givenchy Print Cotton Hoodie', price: 820 },
    { id: 9, code: 35471894659, description: 'Balenciaga poplin Shirt', price: 410 }
  ];

  const buttonText = useMemo(() => {
    return orderIsLoading ? 'Loading...' : 'Confirm'
  }, [orderIsLoading])

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleConfirmOrder = () => {
    setOrderIsLoading(true)

    setTimeout(() => {
      createOrder({ orderLines: itemsForCheckout })
      setOrderIsLoading(false)
      parentCallback(false)
    }, 1000)
  }

  function OpenSelectQuantity(item, i) {

    let auxLabel = item?.description?.split(' ')
    auxLabel.pop()

    const label = auxLabel.join(' ')
  
    return (
      <div className='row--sa mVer-1'>
        <h1 className={'rem-width-30 ff-text'}>
          {label}
        </h1>
        <Grid container direction='row' alignItems='center'>
          <Grid item xs={12} direction='column' alignItems='center' justify='center' style={{display: 'flex', marginLeft: '2vw'}}>
            <Counter onCounter={(data) => item['quantity'] = data}/>
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderQuantityDialog = () => {
    return (
      <Dialog fullWidth={true} maxWidth={'sm'} open={quantityModalIsOpen} onClose={() => parentCallback(false)}>
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <div style={{ width: '100%' }}>
            <DialogContentText className='mVer-1'>
              Choose quantity of each product 
            </DialogContentText>
            <div style={{ height: 400 }}>
              {itemsForCheckout?.map((item, i) => {
                return OpenSelectQuantity(item, i)
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setItemsForCheckout([])
            setQuantityModalIsOpen(false)
            setIsOpen(true)
          }}>Back</Button>
          <Button isLoading={orderIsLoading} onClick={handleConfirmOrder}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div>
      <Dialog fullWidth={true} maxWidth={'sm'} open={isOpen} onClose={() => parentCallback(false)}>
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <div style={{ width: '100%' }}>
            <DialogContentText className='mVer-1'>
              Choose your products 
            </DialogContentText>
            <div style={{ height: 400 }}>
              <DataGrid
                onRowClick={(row) => setItemsForCheckout([...itemsForCheckout, row?.row])}
                checkboxSelection={true}
                rows={rows}
                columns={columns}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => parentCallback(false)}>Cancel</Button>
          <Button disabled={itemsForCheckout?.length === 0} onClick={() => {
            setIsOpen(false)
            setQuantityModalIsOpen(true)
          }}>Next</Button>
        </DialogActions>
      </Dialog>

      { quantityModalIsOpen && renderQuantityDialog() }
    </div>
  )
}

export default PopUpForm
