import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ 
      padding: '60px 20px', 
      textAlign: 'center', 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh' 
    }}>
      <style>
        {`
          @keyframes float-dog {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes fade-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.1; }
            50% { transform: translateY(-10px); opacity: 0.3; }
          }
          .error-scene {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          .animated-dog {
            display: inline-block;
            font-size: 6rem;
            animation: float-dog 3s ease-in-out infinite;
            margin: 0 20px;
            text-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          .number-4 {
            font-size: 8rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
          }
          .paw-bg {
            position: absolute;
            font-size: 3rem;
            animation: fade-bounce 2s infinite alternate;
          }
        `}
      </style>

      <Card hoverEffect={true} style={{ padding: '60px 40px', maxWidth: '700px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Background Paws */}
        <div className="paw-bg" style={{ top: '30px', left: '40px', animationDelay: '0s' }}>🐾</div>
        <div className="paw-bg" style={{ bottom: '50px', right: '50px', animationDelay: '1s' }}>🐾</div>
        <div className="paw-bg" style={{ top: '60px', right: '80px', animationDelay: '0.5s', fontSize: '2rem' }}>🐾</div>
        <div className="paw-bg" style={{ bottom: '40px', left: '80px', animationDelay: '1.5s', fontSize: '2.5rem' }}>🐾</div>

        <div className="error-scene">
          <span className="number-4">4</span>
          <span className="animated-dog" title="Good boy!">🐶</span>
          <span className="number-4">4</span>
        </div>
        
        <h2 style={{ fontSize: '2.5rem', margin: '20px 0' }} className="text-gradient">
          Oops! The Page Played Fetch...
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 40px auto' }}>
          We pushed the code under the couch, checked the backyard, and even interrogated the cat, but this page is nowhere to be found!
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Throw Ball to Home 🎾
          </Link>
          <Link to="/features" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Sniff Features 👃
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
