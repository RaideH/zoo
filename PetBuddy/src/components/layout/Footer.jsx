import React from 'react';

/**
 * Footer component
 * (Объяснение: Подвал сайта с копирайтом и полезными ссылками)
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>🐾 PetCare Pro</h3>
          <p>Premium management software for modern pet owners.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PetCare Pro. Developed as a Final Project.</p>
      </div>
    </footer>
  );
};

export default Footer;
