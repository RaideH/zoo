import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const formatCardNumber = (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(' ');
    return v;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content payment-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        <div className="modal-header">
          <h2>Premium Checkout</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {isSuccess ? (
          <div className="success-state">
            <div className="success-icon">✅</div>
            <h3>Payment Successful!</h3>
            <p>Your <strong>{plan?.name}</strong> is now active. Welcome to the elite pack! 🐾</p>
            <Button variant="primary" onClick={onClose} style={{ marginTop: '20px' }}>Done</Button>
          </div>
        ) : (
          <>
            <div className="card-preview">
              <div className="card-chip"></div>
              <div className="card-number-display">
                {cardNumber || '•••• •••• •••• ••••'}
              </div>
              <div className="card-footer-display">
                <div>
                  <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Card Holder</div>
                  <div>{name.toUpperCase() || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Expires</div>
                  <div>{expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              <Input 
                label="Cardholder Name" 
                placeholder="Ivan Ivanov" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <Input 
                label="Card Number" 
                placeholder="0000 0000 0000 0000" 
                maxLength="19"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                required 
              />
              <div className="payment-row">
                <Input 
                  label="Expiry Date" 
                  placeholder="MM/YY" 
                  maxLength="5"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  required 
                />
                <Input 
                  label="CVV" 
                  placeholder="•••" 
                  maxLength="3"
                  type="password"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="btn-full" 
                disabled={isProcessing}
                style={{ marginTop: '10px' }}
              >
                {isProcessing ? 'Processing...' : `Pay $${plan?.price || 0}`}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
