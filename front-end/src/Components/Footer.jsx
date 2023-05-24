import React from 'react';
import './Footer.css'; // Import the CSS file for styling
const Footer=()=> {
    return ( <footer className="footer"> <div className="footer-content"> <p>&copy;
    {
        new Date().getFullYear()
    }
    Anupam Vaishy. All rights reserved.</p>
     <nav> <ul className="footer-links">
         <li><a href="/">Home</a></li> <li><a href="/about">About</a></li> <li><a href="/contact">Contact</a></li> <li><a href="/terms">Terms of Service</a></li> <li><a href="/privacy">Privacy Policy</a></li> </ul> </nav> </div> </footer>);
}

export default Footer;