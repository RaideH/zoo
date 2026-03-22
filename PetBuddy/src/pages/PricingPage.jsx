import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PRICING_PLANS = [
  {
    name: "Basic Paws",
    price: "0",
    features: [
      { text: "Up to 2 pets", included: true },
      { text: "Basic health tracking", included: true },
      { text: "Daily task scheduling", included: true },
      { text: "Advanced Weight Charts", included: false },
      { text: "Priority Email Support", included: false },
    ],
    buttonText: "Get Started",
    buttonVariant: "ghost",
    isPopular: false,
    staggerClass: "stagger-1"
  },
  {
    name: "Pro Pack",
    price: "9",
    features: [
      { text: "Unlimited pets", included: true, highlight: true },
      { text: "Advanced Health tracking", included: true },
      { text: "Unlimited daily tasks", included: true },
      { text: "Advanced Weight Charts", included: true, highlight: true },
      { text: "Priority Support", included: true, highlight: true, color: "var(--primary)" },
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "primary",
    isPopular: true,
    staggerClass: "stagger-2"
  }
];

const PricingCard = ({ plan }) => {
  const cardStyle = {
    width: '350px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    ...(plan.isPopular ? { border: '2px solid var(--primary)', position: 'relative' } : {})
  };

  return (
    <Card hoverEffect={true} className={plan.staggerClass} style={cardStyle}>
      {plan.isPopular && (
        <div style={{
          position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--primary)', color: 'white', padding: '6px 16px',
          borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px'
        }}>
          MOST POPULAR
        </div>
      )}
      
      <h3>{plan.name}</h3>
      
      <div style={{ fontSize: '3.5rem', fontWeight: '800', margin: '20px 0', color: plan.isPopular ? 'var(--primary)' : 'var(--text-dark)' }}>
        ${plan.price}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mo</span>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', textAlign: 'left', color: 'var(--text-muted)' }}>
        {plan.features.map((feature, idx) => (
          <li key={idx} style={{ 
            marginBottom: '10px', 
            opacity: feature.included ? 1 : 0.5,
            color: feature.color || (feature.highlight && feature.included ? 'var(--text-dark)' : 'inherit')
          }}>
            {feature.highlight ? <strong>{feature.included ? '✓' : '✗'} {feature.text}</strong> : <>{feature.included ? '✓' : '✗'} {feature.text}</>}
          </li>
        ))}
      </ul>
      
      <div style={{ marginTop: 'auto' }}>
        <Link to="/register">
          <Button variant={plan.buttonVariant} style={{ width: '100%', justifyContent: 'center' }}>
            {plan.buttonText}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Simple, <span className="text-gradient">Transparent Pricing</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 60px' }}>
          Choose the perfect plan for you and your furry friends. No hidden fees, cancel anytime.
        </p>

        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {PRICING_PLANS.map(plan => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
