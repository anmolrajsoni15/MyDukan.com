import React from 'react'
import "./CheckoutSteps.css";
import { Typography, Stepper, StepLabel, Step } from '@mui/material'
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded"
import LibraryAddCheckRounded from "@mui/icons-material/LibraryAddCheckRounded"
import AccountBalanceRounded from "@mui/icons-material/AccountBalanceRounded"

function CheckoutSteps({activeStep}) {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingRounded/>,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckRounded/>,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceRounded/>,
        },
    ];

    const setpStyles = {
        boxSizing: "border-box",
    }

  return (
    <>
        <Stepper alternativeLabel activeStep={activeStep} style={setpStyles}>
            {steps.map((item, index) => (
                <Step key={index} active={activeStep === index ? true: false} completed={activeStep >= index ? true: false}>
                    <StepLabel 
                    style={{
                        color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                    }} 
                    icon={item.icon}>
                        {item.label}
                    </StepLabel>
                </Step>
            ))}

        </Stepper>
    </>
  )
}

export default CheckoutSteps