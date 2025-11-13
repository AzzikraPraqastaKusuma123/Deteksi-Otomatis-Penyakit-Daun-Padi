import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const appName = "Padi Guard"; // Assuming this is the application name

  return (
    <footer className="app-footer">
      <div className="footer-container"> {/* Changed from footer-content to footer-container for better structure */}
        <div className="footer-section about-us">
          <h3>About {appName}</h3>
          <p>Padi Guard is an innovative application designed to help farmers detect common rice leaf diseases early, providing timely insights and recommendations to protect their crops and ensure better yields.</p>
        </div>

        <div className="footer-section social-media">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <p>Email: info@padiguard.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} {appName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
