import React from 'react'
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import logo from "../../../images/logo.png"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import "./Footer.css";

function Footer() {
  return (
    <footer id = "footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="Appstore" />
        </div>
        <div className="midFooter">
            <img src={logo} alt="MyDukan.com" />
            <p>High Quality is our first priority</p>
            <p>Copyrights 2022 &copy; AnmolRajSoni</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.linkedin.com/in/anmol-raj-soni/" target="_blank"><LinkedInIcon/></a>
            <a href="https://www.instagram.com/anmol_raj_soni/" target="_blank"><InstagramIcon/></a>
            <a href="https://twitter.com/AnmolRajSoni2" target="_blank"><TwitterIcon/></a>
        </div>
    </footer>
  )
}

export default Footer