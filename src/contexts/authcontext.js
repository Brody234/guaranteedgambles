import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {

    // Retrieve token and user data from local storage or an API
    const savedToken = localStorage.getItem('token');
    let savedUser = localStorage.getItem('user');
    if (savedUser != "undefined") savedUser = JSON.parse(savedUser)

    if (savedToken) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoading(false)
  }, []);


  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
