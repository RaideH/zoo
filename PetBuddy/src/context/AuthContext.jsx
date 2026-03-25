import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('petcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    const newUser = { id: crypto.randomUUID(), email, user_metadata: { name } };
    localStorage.setItem('petcare_user', JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser };
  };

  const login = async (email, password) => {
    const newUser = { id: crypto.randomUUID(), email, user_metadata: { name: email.split('@')[0] } };
    localStorage.setItem('petcare_user', JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser };
  };

  const logout = async () => {
    localStorage.removeItem('petcare_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
