import { useState } from 'react';
import Button from './ui/Button';

const PetIDCardModal = ({ isOpen, onClose, pet }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !pet) return null;

  const handleCopy = () => {
    const text = `🐾 Pet ID: ${pet.name} (${pet.breed}) | ID: #${pet.id.slice(-6)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content pet-id-card-modal animate-scale-in" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '400px', padding: 0, overflow: 'hidden', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      >
        <div className="id-card-header" style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          padding: '40px 20px', 
          color: 'white', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {}
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
          
          <button className="close-btn" onClick={onClose} style={{ color: 'white', position: 'absolute', top: '15px', right: '15px', opacity: 0.7 }}>×</button>
          
          <div className="id-card-avatar" style={{ 
            width: '110px', 
            height: '110px', 
            background: 'white', 
            borderRadius: '24px', 
            margin: '0 auto 20px',
            fontSize: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            transform: 'rotate(-2deg)'
          }}>
            {pet.type === 'Dog' ? '🐶' : '🐱'}
          </div>
          <h2 style={{ margin: 0, fontSize: '2rem', letterSpacing: '2px', fontWeight: 800 }}>{pet.name.toUpperCase()}</h2>
          <p style={{ opacity: 0.8, letterSpacing: '3px', fontSize: '0.7rem', marginTop: '5px' }}>OFFICIAL PET PASS-ID</p>
        </div>

        <div className="id-card-body" style={{ padding: '35px', backgroundColor: 'var(--bg-card)', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '35px' }}>
            <div className="id-field">
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>Breed</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{pet.breed}</strong>
            </div>
            <div className="id-field">
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>Age</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{pet.age} Years</strong>
            </div>
            <div className="id-field">
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>Identity No.</span>
              <strong style={{ fontSize: '1rem', fontFamily: "'Courier New', Courier, monospace", color: 'var(--primary)' }}>#PCB-{pet.id.slice(-6).toUpperCase()}</strong>
            </div>
            <div className="id-field">
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>Membership</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--success)' }}>Verified</strong>
              </div>
            </div>
          </div>

          <div className="id-card-footer" style={{ borderTop: '2px dashed var(--border)', paddingTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="qr-code-placeholder" style={{ 
              width: '70px', 
              height: '70px', 
              background: 'var(--text-dark)', 
              borderRadius: '12px',
              padding: '8px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', height: '100%' }}>
                {Array(25).fill(0).map((_, i) => (
                  <div key={i} style={{ backgroundColor: Math.random() > 0.4 ? 'white' : 'transparent', borderRadius: '1px' }}></div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase' }}>Issue Authority</p>
              <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>PETCARE PRO GLOBAL</p>
              <div style={{ marginTop: '5px', height: '20px' }}>
                 {}
                 <div style={{ display: 'flex', gap: '1px', height: '100%', justifyContent: 'flex-end', opacity: 0.3 }}>
                   {Array(15).fill(0).map((_, i) => (
                     <div key={i} style={{ width: Math.random() * 3 + 1 + 'px', height: '100%', backgroundColor: 'var(--text-dark)' }}></div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '20px', display: 'flex', gap: '10px', background: 'var(--bg-main)', borderTop: '1px solid var(--border)' }}>
           <Button variant="outline" size="sm" onClick={handleCopy} style={{ flex: 1, fontSize: '0.85rem' }}>
             {copied ? '✅ Copied!' : '🔗 Copy Pet ID'}
           </Button>
           <Button variant="primary" size="sm" onClick={() => window.print()} style={{ flex: 1, fontSize: '0.85rem' }}>
             🖨️ Print Certificate
           </Button>
        </div>
      </div>
    </div>
  );
};

export default PetIDCardModal;
