import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

/**
 * AddTaskModal component
 * (Объяснение: Всплывающее окно для добавления задачи в ежедневный план)
 */
const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    time: '08:00'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now().toString(), completed: false });
    setFormData({ title: '', time: '08:00' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <Card className="modal-content">
        <header className="modal-header">
          <h2>Add Routine Task 📅</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit}>
          <Input 
            label="Task Name" 
            placeholder="e.g. Morning Walk" 
            required 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          
          <Input 
            label="Time" 
            type="time" 
            required
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />

          <div className="modal-actions">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Task</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTaskModal;
