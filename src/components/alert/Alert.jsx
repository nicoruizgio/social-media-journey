import React from 'react'
import { CAlert } from '@coreui/react'

export const Alert = ({alertMessage}) => {
  return (
    <CAlert color="danger">
      {alertMessage}
    </CAlert>
  )
}
