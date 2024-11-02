import React from 'react';
import OddsDisplay from './OddsDisplay';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  odds: {
    moneyline: string;
    spread?: string;
    total?: string;
  };
}

const MatchCard: React.FC<MatchCardProps> = ({ homeTeam, awayTeam, time, odds }) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <p className="text-sm font-medium">{awayTeam}</p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
            <p className="text-sm font-medium">{homeTeam}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
        <OddsDisplay {...odds} />
      </div>
    </div>
  );
};

export default MatchCard;