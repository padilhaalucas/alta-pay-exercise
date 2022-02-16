import React, { useState, useMemo, useEffect } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import './styles.module.scss'

const Counter = (props) => {

  const [state, setState] = useState({ counter: 1 })

  const { onCounter, onBlur } = props

  const handleIncrement = () => {
    setState(state => ({ counter: state.counter + 1 }))
  }

  const handleDecrement = () => {
    setState(state => ({ counter: state.counter - 1 }))
  }

  useEffect(() => {
    onCounter(state?.counter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const isMinusDisable = useMemo(() => state.counter === 0, [state]) 

  return (
    <ButtonGroup onBlur={onBlur} size='small' aria-label='small outlined button group'>
      <Button className={'plus-button vw-width-5'} onClick={handleIncrement}>+</Button>
      { <Button className={'counter vw-width-5'}>{state.counter}</Button> }
      { <Button
          className={isMinusDisable ? 'minusButtonDisabled vw-width-5' : 'minusButtonEnabled vw-width-5'}
          disabled={isMinusDisable}
          onClick={handleDecrement}
        >
          -
        </Button>
      }
    </ButtonGroup>
  )
}

export default Counter
