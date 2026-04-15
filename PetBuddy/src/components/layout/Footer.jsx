
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ color: 'white' }}>
              <span className="logo-icon">🐾</span>
              <span className="logo-text">PetBuddy</span>
            </Link>
            <p>Elevating pet care through premium management tools and interactive health tracking.</p>
          </div>

          <div className="link-group">
            <h4>Platform</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="link-group">
            <h4>Support</h4>
            <Link to="#">Help Center</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Contact Us</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <p>&copy; 2024 PetBuddy. All rights reserved.</p>
            <p style={{ fontWeight: '600', color: 'var(--primary-light)' }}>
              Built with ❤️ by <span style={{ color: 'white', borderBottom: '1px solid var(--primary)' }}>Henry Karapetyan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
