import React from 'react';
import { useQuery } from 'react-query';

interface ApiStatusProps {
  className?: string;
}

const ApiStatus: React.FC<ApiStatusProps> = ({ className = '' }) => {
  // Check Odds API status
  const oddsStatus = useQuery('oddsApiStatus', async () => {
    const apiKey = localStorage.getItem('oddsApiKey');
    if (!apiKey) return 'disconnected';
    
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${apiKey}&regions=us&markets=h2h&oddsFormat=american`
      );
      return response.ok ? 'connected' : 'error';
    } catch {
      return 'error';
    }
  }, {
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  // Check SportsData.io API status
  const sportsDataStatus = useQuery('sportsDataApiStatus', async () => {
    const apiKey = localStorage.getItem('sportsDataApiKey');
    if (!apiKey) return 'disconnected';
    
    try {
      const response = await fetch(
        `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${apiKey}`
      );
      return response.ok ? 'connected' : 'error';
    } catch {
      return 'error';
    }
  }, {
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  // Check News API status
  const newsStatus = useQuery('newsApiStatus', async () => {
    const apiKey = localStorage.getItem('newsApiKey');
    if (!apiKey) return 'disconnected';
    
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=NFL&apiKey=${apiKey}&pageSize=1`
      );
      return response.ok ? 'connected' : 'error';
    } catch {
      return 'error';
    }
  }, {
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(oddsStatus.data || 'disconnected')} animate-pulse`} />
        <span className="text-xs text-gray-600">
          Odds API: {getStatusText(oddsStatus.data || 'disconnected')}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(sportsDataStatus.data || 'disconnected')} animate-pulse`} />
        <span className="text-xs text-gray-600">
          Sports Data: {getStatusText(sportsDataStatus.data || 'disconnected')}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(newsStatus.data || 'disconnected')} animate-pulse`} />
        <span className="text-xs text-gray-600">
          News API: {getStatusText(newsStatus.data || 'disconnected')}
        </span>
      </div>
    </div>
  );
};

export default ApiStatus;