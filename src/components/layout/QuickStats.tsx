import React from 'react';
import { useApiMode } from '../../hooks/useApiMode';

const QuickStats: React.FC = () => {
  const { isDemoMode } = useApiMode();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-600">Quick Stats</h2>
          {isDemoMode && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Sample Data
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Active Bets</p>
            <p className="text-xl font-bold">3</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Win Rate</p>
            <p className="text-xl font-bold text-green-600">68%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Profit</p>
            <p className="text-xl font-bold text-green-600">$1,234</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">ROI</p>
            <p className="text-xl font-bold text-green-600">12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;