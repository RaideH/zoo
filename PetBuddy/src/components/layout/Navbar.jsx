import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text">PetCare Pro</span>
        </Link>
        <div className="nav-links">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          )}

          <div className="nav-buttons" style={{ alignItems: 'center' }}>
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <span className="user-greeting">Hi, {user?.user_metadata?.name || user?.email?.split('@')[0]}!</span>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost">Log in</Button></Link>
                <Link to="/register"><Button variant="primary">Sign Up Free</Button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
