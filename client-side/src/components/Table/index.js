import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Counter from '../Counter/index'

import { formatDate } from '../../utils/calendar'
 
import Button from '../Button/index'

function createData(
  orderNumber,
  transactionsQty,
  itemsQty,
  settledAmount,
  totalAmount,
  items,
  orderId,
  transactions
) {
  return {
    orderNumber,
    transactionsQty,
    itemsQty,
    settledAmount,
    totalAmount,
    items,
    orderId,
    transactions
  }
}

function Row(props) {
  const { row, onOperation } = props
  const [open, setOpen] = React.useState(false)
  const [transactionsIsOpen, setTransactionsIsOpen] = React.useState(false)
  const [quantityModalIsOpen, setQuantityModalIsOpen] = React.useState(false)
  const [isRefunding, setIsRefunding] = React.useState(false)
  const [isCapturing, setIsCapturing] = React.useState(false)
  const [amount, setAmount] = React.useState(0)

  function openSelectQuantity() {
    const handleClose = () => setQuantityModalIsOpen(false)
  
    return (
      <div>
        <Dialog open={quantityModalIsOpen} onClose={handleClose}>
          <DialogTitle>{isRefunding ? 'Refund' : 'Capture'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`How much do you want to ${isRefunding ? 'refund' : 'capture'}?`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id={isRefunding ? 'refund' : 'capture'}
              label="Value"
              type="text"
              variant="standard"
              onBlur={(event) => setAmount(parseFloat(event.target.value))}
            />
          </DialogContent>
          <DialogActions className='mb-1 mHor-1'>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => {
              onOperation(row?.orderId, `${isRefunding ? 'refund' : 'capture'}`, { amount })
              handleClose()
            }}>Choose</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  const renderTransactions = () => (
    <Collapse in={transactionsIsOpen} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" component="div">
          Transactions
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Hour</TableCell>
              <TableCell align="right">Value (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.transactions?.map((item, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {item?.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(item?.date)?.parsedDay}
                </TableCell>
                <TableCell align='right'>
                  {formatDate(item?.date)?.time}
                </TableCell>
                <TableCell align="right">
                  {item?.settledAmount !== 0 ? `${item?.settledAmount}€` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  )

  const renderCollapsable = () => (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <div className='row--sb mVer-2'>
          <div>
            <Button type='primary' className='mHor-1' onClick={() => onOperation(row?.orderId, 'reserve')}>Reserve</Button>
            <Button type='primary' className='mHor-1' onClick={() => onOperation(row?.orderId, 'release')}>Release</Button>
            {/* <Button type='primary' className='mHor-1' onClick={() => onOperation(row?.orderId, 'refund')}>Refund</Button> */}
            <Button type='primary' className='mHor-1' onClick={() => {
              setIsCapturing(false)
              setIsRefunding(true)
              setQuantityModalIsOpen(!quantityModalIsOpen)
            }}>Refund</Button>
            {/* <Button type='primary' className='mHor-1' onClick={() => onOperation(row?.orderId, 'capture')}>Capture</Button> */}
            <Button type='primary' className='mHor-1' onClick={() => {
              setIsRefunding(false)
              setIsCapturing(true)
              setQuantityModalIsOpen(!quantityModalIsOpen)
            }}>Capture</Button>
          </div>

          { row?.transactionsQty > 0 &&
            <div className='row--fe rem-width-9'>
              <h1 className='rem-width-30 ff-text'>All transactions</h1>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setTransactionsIsOpen(!transactionsIsOpen)}
              >
                {transactionsIsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
          }
        </div>

        <div className='row--sb'>
          <Typography variant="h6" component="div">
            Items
          </Typography>
        </div>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row?.items.map((item, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {item.code}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.description}
                </TableCell>
                <TableCell align='right'>{item.quantity}</TableCell>
                <TableCell align="right">{item?.quantity * item.price}€</TableCell>
              </TableRow>
            ))}
            { row?.transactionsQty > 0 &&
              <div>
                <TableCell style={{ paddingBottom: 0, paddingTop: '5rem', paddingLeft: 0 }} colSpan={6}>
                  { renderTransactions() }
                </TableCell>
              </div>
            }
            { quantityModalIsOpen && openSelectQuantity() }
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  )

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.orderNumber}
        </TableCell>
        <TableCell align="right">{row?.transactionsQty}</TableCell>
        <TableCell align="right">{row?.itemsQty}</TableCell>
        <TableCell align="right">{row?.settledAmount}€</TableCell>
        <TableCell align="right">{row?.totalAmount}€</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          { renderCollapsable() }
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    orderNumber: PropTypes.number.isRequired,
    transactionsQty: PropTypes.number.isRequired,
    itemsQty: PropTypes.number.isRequired,
    settledAmount: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

const CollapsibleTable = (props) => {
  const { orders, onOperation } = props

  const rows = orders?.map((order, i) => createData(
    i + 1,                       // orderNumber
    order?.transactions?.length, // transactionsQty
    order?.orderLines?.length,   // itemsQty
    order?.settledAmount,
    order?.orderAmount,
    order?.orderLines,
    order?.id,
    order?.transactions
  ))

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Transactions Qty</TableCell>
            <TableCell align="right">Items Qty</TableCell>
            <TableCell align="right">Settled Amount</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <Row key={i} row={row} onOperation={onOperation} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollapsibleTable
