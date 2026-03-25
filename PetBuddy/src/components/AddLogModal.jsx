import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const AddLogModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Vaccine',
    note: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now().toString() });
    setFormData({ date: new Date().toISOString().split('T')[0], type: 'Vaccine', note: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <Card className="modal-content">
        <header className="modal-header">
          <h2>Add Health Log 💉</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit}>
          <Input 
            label="Date" 
            type="date" 
            required 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
          
          <div className="input-group">
            <span className="label">Type</span>
            <select 
              className="input-field" 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Vaccine">Vaccine</option>
              <option value="Checkup">Checkup</option>
              <option value="Medication">Medication</option>
              <option value="Surgery">Surgery</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input 
            label="Note" 
            placeholder="e.g. Rabies booster shot" 
            required
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
          />

          <div className="modal-actions">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Log</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddLogModal;
