import React from 'react'
import "./Contact.css"
import {Button} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import mail from "../../../images/mail.png";

function Contact() {
  return (
    <div className="contactContainer">
        <div className="card">
        <h1>
            <span className='heading'>Have any Query?</span>
            <span className='subHeading'>Feel free to Mail us</span>
        </h1>
        <img src={mail} alt="Mail" />
        <a className="mailBtn" href="mailto:anmolworking123@gmail.com">
            <Button><EmailIcon/> anmolworking123@gmail.com</Button>
        </a>
        </div>
    </div>
  )
}

export default Contact