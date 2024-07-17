'use client'
import { useEffect } from 'react';
import Script from 'next/script';

const PricingTable = () => {
  useEffect(() => {
    // This will ensure that the stripe-pricing-table element is properly rendered
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style = {{height: '100vh', display: 'flex'}}>

    </div>
  );
};

export default PricingTable;
