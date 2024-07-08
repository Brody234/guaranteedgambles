import { set } from 'date-fns';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true)
  const [affiliateData, setAffiliateData] = useState(null)

  useEffect(() => {

    // Retrieve token and user data from local storage or an API
    const savedToken = localStorage.getItem('token');
    let savedUser = localStorage.getItem('user');
    if (savedUser != "undefined") savedUser = JSON.parse(savedUser)
    let savedAfData = localStorage.getItem('afData')
    try{
      if (savedAfData != "undefined") savedAfData = JSON.parse(savedAfData)
    }
    catch(err){
      savedAfData = null
    }


    if (savedToken) {
      setToken(savedToken);
      setUser(savedUser);
    }
    if(savedAfData){
      setAffiliateData(savedAfData)
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
    setAffiliateData(null)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('afData');

  };

  const setAfData = (val) =>{
    setAffiliateData(val)
    localStorage.setItem('afData', JSON.stringify(val))
  }
 
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, affiliateData, setAfData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
