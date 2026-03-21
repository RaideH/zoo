import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * PetDetails Page
 * (Объяснение: Детальная страница питомца. Здесь можно увидеть историю прививок и план ухода)
 */
const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, updatePet } = usePets();
  
  const pet = pets.find(p => p.id === id);

  if (!pet) {
    return (
      <div className="container" style={{padding: '100px', textAlign: 'center'}}>
        <h2>Pet not found! 😿</h2>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const toggleTask = (taskId) => {
    const newTasks = pet.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    updatePet(pet.id, { tasks: newTasks });
  };

  return (
    <div className="pet-details-page container">
      <header className="details-header">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>← Back</Button>
        <div className="pet-main-info">
          <h1>{pet.name} {pet.type === 'Dog' ? '🐶' : '🐱'}</h1>
          <p>{pet.breed} • {pet.age} years old</p>
        </div>
      </header>

      <div className="details-grid">
        {/* Left Column: Health Logs */}
        <section className="health-section">
          <Card>
            <div className="card-header">
              <h3>💉 Health History</h3>
              <Button variant="ghost" size="sm">+ Add Log</Button>
            </div>
            <div className="log-list">
              {pet.healthLogs?.map(log => (
                <div key={log.id} className="log-item">
                  <span className="log-date">{log.date}</span>
                  <span className="log-type">{log.type}</span>
                  <p className="log-note">{log.note}</p>
                </div>
              ))}
              {pet.healthLogs?.length === 0 && <p className="empty-msg">No logs yet.</p>}
            </div>
          </Card>
        </section>

        {/* Right Column: Daily Tasks */}
        <section className="tasks-section">
          <Card>
            <div className="card-header">
              <h3>📅 Daily Routine</h3>
              <Button variant="ghost" size="sm">+ Add Task</Button>
            </div>
            <div className="task-list">
              {pet.tasks?.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <div className="task-info">
                    <strong>{task.title}</strong>
                    <span>{task.time}</span>
                  </div>
                </div>
              ))}
              {pet.tasks?.length === 0 && <p className="empty-msg">No tasks scheduled.</p>}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PetDetails;
