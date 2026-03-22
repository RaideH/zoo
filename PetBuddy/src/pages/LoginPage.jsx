import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendLoginNotification } from '../utils/email';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Login Page
 * (Объяснение: Страница входа. Мы имитируем успех при вводе любых данных для демо-версии)
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Mock login implementation
      login({ email, name: email.split('@')[0] });
      
      // Send login notification (asynchronous)
      sendLoginNotification({ email }).catch(err => console.error("EmailJS Error:", err));
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page container">
      <Card className="auth-card">
        <h2 className="text-center auth-title">Welcome Back</h2>
        <p className="text-center auth-subtitle">Log in to your PetCare Pro account</p>
        
        <form onSubmit={handleSubmit}>
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
            placeholder="••••••••" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button type="submit" className="btn-full" style={{marginTop: '10px'}}>
            Sign In
          </Button>
        </form>
        
        <p className="auth-footer text-center">
          Don't have an account? <Link to="/register">Create one for free</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
