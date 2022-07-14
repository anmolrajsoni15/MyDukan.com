import React from 'react'
import "./OrderSuccess.css"
import CheckCircle from "@mui/icons-material/CheckCircle"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function OrderSuccess() {
  return (
    <div className='orderSuccess'>
        <CheckCircle/>
        <Typography>
            Your Order has been Placed successfully.
        </Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess