import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendWelcomeEmail } from '../utils/email';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Register Page
 * (Объяснение: Страница регистрации. Мы создаем "аккаунт" и сразу логиним пользователя)
 */
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // Mock registration implementation
      login({ name, email });
      
      // Send welcome email (asynchronous, don't block navigation)
      sendWelcomeEmail({ name, email }).catch(err => console.error("EmailJS Error:", err));
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page container">
      <Card className="auth-card">
        <h2 className="text-center auth-title">Join PetCare Pro</h2>
        <p className="text-center auth-subtitle">The best way to care for your companions</p>
        
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
          
          <Button type="submit" className="btn-full" style={{marginTop: '10px'}}>
            Create Account
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
