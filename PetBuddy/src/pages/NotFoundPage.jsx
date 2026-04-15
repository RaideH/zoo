import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '60px 20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Card style={{ padding: '40px', maxWidth: '500px', width: '100%' }}>
        <div style={{ fontSize: '5rem', marginBottom: '10px' }}>🐶</div>
        <h1 style={{ fontSize: '4rem', marginBottom: '10px', color: 'var(--primary)' }}>404</h1>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }} className="text-gradient">
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}>
          Whoops! It looks like your pet might have buried this page in the backyard.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>
          Back to Home
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;
