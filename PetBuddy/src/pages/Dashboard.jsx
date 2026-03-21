import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePets } from '../context/PetContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AddPetModal from '../components/AddPetModal';
import { useState } from 'react';

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const { user } = useAuth();
  const { pets, removePet, addPet } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-page container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Here is what's happening with your pets today.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <span>+</span> Add New Pet
        </Button>
      </header>

      <AddPetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addPet}
      />

      <section className="dashboard-stats">
        <Card className="stat-card">
          <h3>{pets.length}</h3>
          <p>Total Pets</p>
        </Card>
        <Card className="stat-card">
          <h3>2</h3>
          <p>Upcoming Tasks</p>
        </Card>
      </section>

      <section className="pet-section">
        <h2 className="section-title">Your Companions</h2>
        <div className="pet-grid">
          {pets.map(pet => (
            <Card key={pet.id} hoverEffect={true} className="pet-list-card">
              <div className="pet-avatar">
                {pet.type === 'Dog' ? '🐶' : '🐱'}
              </div>
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.breed} • {pet.age} years old</p>
              </div>
              <div className="pet-actions">
                <Button variant="ghost" onClick={() => removePet(pet.id)}>Remove</Button>
                <Button variant="secondary" onClick={() => navigate(`/pet/${pet.id}`)}>Details</Button>
              </div>
            </Card>
          ))}
          {pets.length === 0 && (
            <p className="empty-msg">No pets added yet. Click the button above to start!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
