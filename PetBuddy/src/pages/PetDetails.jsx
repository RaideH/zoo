import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AddLogModal from '../components/AddLogModal';
import AddTaskModal from '../components/AddTaskModal';
import WeightChart from '../components/WeightChart';

/**
 * PetDetails Page
 * (Объяснение: Детальная страница питомца. Здесь можно увидеть историю прививок и план ухода)
 */
const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, updatePet } = usePets();
  
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');

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

  const addHealthLog = (log) => {
    const newLogs = [...(pet.healthLogs || []), log];
    updatePet(pet.id, { healthLogs: newLogs });
  };

  const addTask = (task) => {
    const newTasks = [...(pet.tasks || []), task];
    updatePet(pet.id, { tasks: newTasks });
  };

  const addWeightLog = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    const newLogs = [...(pet.weightLogs || []), { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], weight: parseFloat(newWeight) }];
    updatePet(pet.id, { weightLogs: newLogs });
    setNewWeight('');
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

      <AddLogModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)} 
        onAdd={addHealthLog}
      />

      <AddTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onAdd={addTask}
      />

      <div className="details-grid">
        {/* Left Column: Health Logs */}
        <section className="health-section">
          <Card>
            <div className="card-header">
              <h3>💉 Health History</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsLogModalOpen(true)}>+ Add Log</Button>
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
              <Button variant="ghost" size="sm" onClick={() => setIsTaskModalOpen(true)}>+ Add Task</Button>
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

      <section className="weight-section" style={{ marginTop: '30px' }}>
        <Card>
          <div className="card-header">
            <h3>📈 Weight Tracker</h3>
            <form onSubmit={addWeightLog} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="number" 
                step="0.1" 
                className="input-field"
                placeholder="Weight (kg)" 
                value={newWeight} 
                onChange={e => setNewWeight(e.target.value)} 
                style={{ width: '120px', padding: '8px' }}
              />
              <Button type="submit" size="sm" style={{ padding: '8px 16px' }}>Add</Button>
            </form>
          </div>
          <WeightChart logs={pet.weightLogs} />
        </Card>
      </section>
    </div>
  );
};

export default PetDetails;
