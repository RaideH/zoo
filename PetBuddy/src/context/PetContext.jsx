import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from './AuthContext';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const fetchPets = async () => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    const { data, error } = await supabase
      .from('pets')
      .select('*, healthLogs:health_logs(*), tasks(*), weightLogs:weight_logs(*)');
      
    if (error) {
      console.error('Error fetching pets:', error.message);
    } else {
      setPets(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, [user, isAuthenticated]);

  const addPet = async (pet) => {
    const { data, error } = await supabase
      .from('pets')
      .insert({ 
        user_id: user.id, 
        name: pet.name, 
        type: pet.type, 
        breed: pet.breed, 
        age: pet.age 
      })
      .select()
      .single();
      
    if (!error && data) {
      setPets(prev => [...prev, { ...data, healthLogs: [], tasks: [], weightLogs: [] }]);
    }
  };

  const removePet = async (id) => {
    const { error } = await supabase.from('pets').delete().eq('id', id);
    if (!error) {
      setPets(prev => prev.filter(p => p.id !== id));
    }
  };

  const addHealthLog = async (petId, log) => {
    const { data, error } = await supabase
      .from('health_logs')
      .insert({ pet_id: petId, date: log.date, type: log.type, note: log.note })
      .select()
      .single();
      
    if (!error && data) {
      setPets(prev => prev.map(p => p.id === petId ? { ...p, healthLogs: [...(p.healthLogs||[]), data] } : p));
    }
  };

  const addTask = async (petId, task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ pet_id: petId, title: task.title, time: task.time, completed: false })
      .select()
      .single();
      
    if (!error && data) {
      setPets(prev => prev.map(p => p.id === petId ? { ...p, tasks: [...(p.tasks||[]), data] } : p));
    }
  };

  const toggleTask = async (taskId, completed) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', taskId)
      .select()
      .single();
      
    if (!error && data) {
      setPets(prev => prev.map(p => {
        if (!p.tasks) return p;
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? data : t)
        };
      }));
    }
  };

  const addWeightLog = async (petId, log) => {
    const { data, error } = await supabase
      .from('weight_logs')
      .insert({ pet_id: petId, date: log.date, weight: log.weight })
      .select()
      .single();
      
    if (!error && data) {
      setPets(prev => prev.map(p => p.id === petId ? { ...p, weightLogs: [...(p.weightLogs||[]), data] } : p));
    }
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
