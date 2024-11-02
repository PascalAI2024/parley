import React, { useState } from 'react';
import Settings from '../settings/Settings';
import ApiStatus from '../status/ApiStatus';
import { useApiMode } from '../../hooks/useApiMode';
import { useQueryClient } from 'react-query';

const Header: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isDemo, clearCache } = useApiMode();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Clear local storage cache
    clearCache();
    // Invalidate all React Query cache
    await queryClient.invalidateQueries();
    // Reset refresh state after a short delay
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
      {/* Top Bar with API Status */}
      <div className="border-b border-blue-700/50">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <ApiStatus />
          {isDemo && (
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
              Demo Mode Active
            </span>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
                BetSmart
              </span>
              <span className="ml-2 text-2xl font-light text-blue-200">Assistant</span>
            </div>
            <div className="hidden md:flex space-x-1 items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-blue-200">Live</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button className="px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-lg transition-colors">
              Games
            </button>
            <button className="px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-lg transition-colors">
              My Bets
            </button>
            <button className="px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-lg transition-colors">
              Analysis
            </button>
            <div className="w-px h-6 bg-blue-700/50 mx-2"></div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center space-x-2 px-4 py-2 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg transition-colors ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Settings</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-blue-700/50 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Header;