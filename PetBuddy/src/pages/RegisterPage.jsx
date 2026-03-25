import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendWelcomeEmail } from '../utils/email';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      setIsSubmitting(true);
      setError(null);
      try {
        await signup(email, password, name);
        
        sendWelcomeEmail({ name, email }).catch(err => console.error("EmailJS Error:", err));
        navigate('/dashboard');
      } catch (err) {
        setError(err.message || 'Error occurred during registration.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="auth-page container">
      <Card className="auth-card">
        <h2 className="text-center auth-title">Join PetCare Pro</h2>
        <p className="text-center auth-subtitle">The best way to care for your companions</p>
        
        {error && <div style={{ color: 'var(--blood)', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input 
            label="Full Name" 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            label="Email Address" 
            type="email" 
            id="email" 
            placeholder="hello@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            id="password" 
            placeholder="Choose a strong password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            <div style={{ marginTop: '-10px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '5px', height: '4px', marginBottom: '5px' }}>
                {[...Array(4)].map((_, i) => {
                  let score = 0;
                  if (password.length > 5) score += 1;
                  if (password.length > 7 && /[A-Z]/.test(password)) score += 1;
                  if (/[0-9]/.test(password)) score += 1;
                  if (/[^A-Za-z0-9]/.test(password)) score += 1;
                  
                  let bg = 'var(--border)';
                  if (i < score) {
                    if (score <= 1) bg = 'var(--blood)'; 
                    else if (score === 2) bg = 'var(--warning)'; 
                    else if (score === 3) bg = 'var(--secondary)'; 
                    else bg = 'var(--success)'; 
                  }
                  
                  return (
                    <div 
                      key={i} 
                      style={{ 
                        flex: 1, 
                        background: bg, 
                        borderRadius: '2px',
                        transition: 'background-color 0.3s'
                      }} 
                    />
                  );
                })}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {(() => {
                  let score = 0;
                  if (password.length > 5) score += 1;
                  if (password.length > 7 && /[A-Z]/.test(password)) score += 1;
                  if (/[0-9]/.test(password)) score += 1;
                  if (/[^A-Za-z0-9]/.test(password)) score += 1;

                  if (score <= 1) return 'Weak password';
                  if (score === 2) return 'Fair password';
                  if (score === 3) return 'Good password';
                  return 'Strong password';
                })()}
              </span>
            </div>
          )}
          
          <Button type="submit" className="btn-full" style={{marginTop: '10px'}} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <p className="auth-footer text-center">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
