import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage = () => {
  return (
    <div className="landing-page page-transition">
      {}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Manage Your Pet's Life <br/>
              <span className="text-gradient">With Professional Precision</span>
            </h1>
            <p className="hero-subtitle">
              PetCare Pro is the ultimate dashboard for tracking health, dietary needs, and daily routines of your beloved companions.
            </p>
            <div className="hero-actions">
              <Link to="/register">
                <Button variant="primary" className="btn-large">Start Free Trial</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="btn-large">View Demo</Button>
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-card-1">
              <Card hoverEffect={true}>
                <h4>💉 Next Vaccination</h4>
                <p>Rabies - Nov 24</p>
              </Card>
            </div>
            <div className="floating-card-2">
              <Card hoverEffect={true}>
                <h4>🦴 Daily Activity</h4>
                <p>Goal: 10,000 steps</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="features bg-gray">
        <div className="container">
          <h2 className="section-title text-center">Everything You Need</h2>
          <div className="feature-grid">
            <Card hoverEffect={true} className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Health Tracking</h3>
              <p>Log weight, vaccines, and medical history systematically.</p>
            </Card>
            <Card hoverEffect={true} className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Smart Schedules</h3>
              <p>Never miss a feeding or walking session with our interactive calendar.</p>
            </Card>
            <Card hoverEffect={true} className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multi-Device</h3>
              <p>Access your dashboard on desktop, tablet, or smartphone.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
