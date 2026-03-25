import { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const AddPetModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', type: 'Dog', breed: '', age: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <Card className="modal-content">
        <header className="modal-header">
          <h2>Add New Pet 🐾</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit}>
          <Input 
            label="Pet's Name" 
            placeholder="e.g. Max" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <div className="input-group">
            <span className="label">Pet Type</span>
            <select 
              className="input-field" 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Dog">Dog 🐶</option>
              <option value="Cat">Cat 🐱</option>
              <option value="Bird">Bird 🦜</option>
              <option value="Other">Other 🐹</option>
            </select>
          </div>

          <Input 
            label="Breed" 
            placeholder="e.g. Golden Retriever" 
            value={formData.breed}
            onChange={(e) => setFormData({...formData, breed: e.target.value})}
          />

          <Input 
            label="Age (Years)" 
            type="number" 
            placeholder="e.g. 2" 
            required
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />

          <div className="modal-actions">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Companion</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddPetModal;
