import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AddLogModal from '../components/AddLogModal';
import AddTaskModal from '../components/AddTaskModal';
import WeightChart from '../components/WeightChart';
import HealthTimeline from '../components/ui/HealthTimeline';
import PetIDCardModal from '../components/PetIDCardModal';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, addHealthLog, addTask, toggleTask, addWeightLog } = usePets();
  
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState(false);
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

  const handleToggleTask = (taskId) => {
    const task = pet.tasks.find(t => t.id === taskId);
    if (task) {
      toggleTask(taskId, !task.completed);
    }
  };

  const handleAddHealthLog = (log) => {
    addHealthLog(pet.id, log);
  };

  const handleAddTask = (task) => {
    addTask(pet.id, task);
  };

  const handleAddWeightLog = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    addWeightLog(pet.id, { date: new Date().toISOString().split('T')[0], weight: parseFloat(newWeight) });
    setNewWeight('');
  };

  return (
    <div className="pet-details-page container page-transition">
      <header className="details-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>← Back</Button>
          <div className="pet-main-info">
            <h1>{pet.name} {pet.type === 'Dog' ? '🐶' : '🐱'}</h1>
            <p>{pet.breed} • {pet.age} years old</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsIDCardOpen(true)} style={{ border: '2px solid var(--primary)', color: 'var(--primary)' }}>
          🪪 View Pet ID
        </Button>
      </header>

      <AddLogModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)} 
        onAdd={handleAddHealthLog}
      />

      <AddTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onAdd={handleAddTask}
      />

      <PetIDCardModal 
        isOpen={isIDCardOpen} 
        onClose={() => setIsIDCardOpen(false)} 
        pet={pet}
      />

      <div className="details-grid">
        <section className="health-section">
          <Card>
            <div className="card-header">
              <h3>💉 Health Timeline</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsLogModalOpen(true)}>+ Add Log</Button>
            </div>
            <HealthTimeline logs={pet.healthLogs} />
          </Card>
        </section>

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
                    onChange={() => handleToggleTask(task.id)}
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
            <form onSubmit={handleAddWeightLog} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
