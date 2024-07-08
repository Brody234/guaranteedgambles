import { createContext, useState, useContext, useEffect } from 'react';

const AffContext = createContext();

export const AffProvider = ({ children }) => {
  const [affiliate, setAffiliateId] = useState({});

  const setAffiliate = (val) => {
    setAffiliateId(val)
    localStorage.setItem('affiliate', JSON.stringify(val));
  }

  useEffect(() => {

    let savedAffiliate = localStorage.getItem('affiliate');
    if (savedAffiliate != "undefined") savedAffiliate = JSON.parse(savedAffiliate)

    if (savedAffiliate) {
      setAffiliateId(savedAffiliate);
    }
    else{
      setAffiliateId({})
    }
  }, []);

  return (
    <AffContext.Provider value={{ affiliate, setAffiliate }}>
      {children}
    </AffContext.Provider>
  );
};

export const useAff = () => useContext(AffContext);
