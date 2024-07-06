import { createContext, useState, useContext, useEffect } from 'react';

const OppContext = createContext();

export const OppProvider = ({ children }) => {
  const [opportunities, setOpportunitiesTo] = useState([]);

  const setOpportunities = (val) => {
    setOpportunitiesTo(val)
    localStorage.setItem('opportunity', JSON.stringify(val));
  }

  useEffect(() => {

    let savedOpportunities = localStorage.getItem('opportunity');
    if (savedOpportunities != "undefined") savedOpportunities = JSON.parse(savedOpportunities)

    if (savedOpportunities) {
      setOpportunities(savedOpportunities);
    }
  }, []);

  return (
    <OppContext.Provider value={{ opportunities, setOpportunities }}>
      {children}
    </OppContext.Provider>
  );
};

export const useOpp = () => useContext(OppContext);
