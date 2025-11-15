import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const appName = "Padi Guard"; // Assuming this is the application name

  return (
    <footer className="agrius-footer">
      <div className="agrius-footer-container">
        <div className="agrius-footer-section agrius-about-us">
          <h3>About {appName}</h3>
          <p>Padi Guard is an innovative application designed to help farmers detect common rice leaf diseases early, providing timely insights and recommendations to protect their crops and ensure better yields.</p>
        </div>

        <div className="agrius-footer-section agrius-social-media">
          <h3>Connect With Us</h3>
          <div className="agrius-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="agrius-social-icon"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="agrius-social-icon"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="agrius-social-icon"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="agrius-social-icon"><FaLinkedin /></a>
          </div>
        </div>

        <div className="agrius-footer-section agrius-contact-info">
          <h3>Contact Info</h3>
          <p>Email: info@padiguard.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="agrius-footer-bottom">
        <p>&copy; {currentYear} {appName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
