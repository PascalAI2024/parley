import { useState, useEffect } from 'react';
import { Match } from '../types';

export const useApiMode = () => {
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    const oddsApiKey = localStorage.getItem('oddsApiKey');
    const sportsDataApiKey = localStorage.getItem('sportsDataApiKey');
    
    // Only set to live mode if we have both required API keys
    const hasRequiredKeys = oddsApiKey && sportsDataApiKey;
    setIsDemo(!hasRequiredKeys);
  }, []);

  return {
    isDemo,
    clearCache: () => {
      localStorage.removeItem('SPORTS_DATA_CACHE');
      localStorage.removeItem('ODDS_CACHE');
      localStorage.removeItem('NEWS_CACHE');
    }
  };
};