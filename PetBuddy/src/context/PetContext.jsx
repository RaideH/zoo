import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }
    
    const savedPets = localStorage.getItem(`pets_${user.id}`);
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      setPets([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && !loading) {
      localStorage.setItem(`pets_${user.id}`, JSON.stringify(pets));
    }
  }, [pets, user, loading]);

  const addPet = (pet) => {
    const newPet = { 
      id: crypto.randomUUID(),
      ...pet,
      healthLogs: [],
      tasks: [],
      weightLogs: []
    };
    setPets(prev => [...prev, newPet]);
  };

  const removePet = (id) => {
    setPets(prev => prev.filter(p => p.id !== id));
  };

  const addHealthLog = (petId, log) => {
    const newLog = { id: crypto.randomUUID(), ...log };
    setPets(prev => prev.map(p => p.id === petId ? { ...p, healthLogs: [...(p.healthLogs||[]), newLog] } : p));
  };

  const addTask = (petId, task) => {
    const newTask = { id: crypto.randomUUID(), ...task, completed: false };
    setPets(prev => prev.map(p => p.id === petId ? { ...p, tasks: [...(p.tasks||[]), newTask] } : p));
  };

  const toggleTask = (taskId, completed) => {
    setPets(prev => prev.map(p => ({
      ...p,
      tasks: p.tasks?.map(t => t.id === taskId ? { ...t, completed } : t) || []
    })));
  };

  const addWeightLog = (petId, log) => {
    const newLog = { id: crypto.randomUUID(), ...log };
    setPets(prev => prev.map(p => p.id === petId ? { ...p, weightLogs: [...(p.weightLogs||[]), newLog] } : p));
  };

  return (
    <PetContext.Provider value={{ 
      pets, 
      loading, 
      addPet, 
      removePet, 
      addHealthLog, 
      addTask, 
      toggleTask, 
      addWeightLog 
    }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => useContext(PetContext);
