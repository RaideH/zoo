import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * PetContext - Managing Pet Data
 * (Объяснение: Здесь мы храним список всех ваших животных. 
 * Используем localStorage, чтобы ваши питомцы "жили" вечно!)
 */
const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPets = localStorage.getItem('petcare_pets');
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    } else {
      // Small seed data for the first visit
      const initialPets = [
        { 
          id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3,
          healthLogs: [{ id: 'h1', date: '2024-03-15', type: 'Vaccine', note: 'Rabies booster' }],
          tasks: [{ id: 't1', title: 'Morning Walk', time: '08:00', completed: false }]
        },
        { 
          id: '2', name: 'Misty', type: 'Cat', breed: 'Persian', age: 2,
          healthLogs: [{ id: 'h2', date: '2024-02-10', type: 'Checkup', note: 'Healthy weight' }],
          tasks: [{ id: 't2', title: 'Evening Feed', time: '19:00', completed: true }]
        }
      ];
      setPets(initialPets);
      localStorage.setItem('petcare_pets', JSON.stringify(initialPets));
    }
    setLoading(false);
  }, []);

  const addPet = (pet) => {
    const newPet = { 
      ...pet, 
      id: Date.now().toString(),
      healthLogs: [],
      tasks: []
    };
    const newPets = [...pets, newPet];
    setPets(newPets);
    localStorage.setItem('petcare_pets', JSON.stringify(newPets));
  };

  const updatePet = (id, updatedFields) => {
    const newPets = pets.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setPets(newPets);
    localStorage.setItem('petcare_pets', JSON.stringify(newPets));
  };

  const removePet = (id) => {
    const newPets = pets.filter(p => p.id !== id);
    setPets(newPets);
    localStorage.setItem('petcare_pets', JSON.stringify(newPets));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, removePet, loading }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => useContext(PetContext);
