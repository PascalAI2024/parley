import React from 'react';
import { useQuery } from 'react-query';
import { fetchTeamStats, fetchInjuries } from '../../services/sportsDataApi';
import { useApiMode } from '../../hooks/useApiMode';

interface TeamStatsProps {
  teamId: string;
  teamName: string;
}

const TeamStats: React.FC<TeamStatsProps> = ({ teamId, teamName }) => {
  const { isDemoMode } = useApiMode();

  const { data: stats, isLoading: statsLoading } = useQuery(
    ['teamStats', teamId],
    () => fetchTeamStats(teamId),
    { enabled: !isDemoMode && !!teamId }
  );

  const { data: injuries, isLoading: injuriesLoading } = useQuery(
    ['injuries', teamId],
    () => fetchInjuries(teamId),
    { enabled: !isDemoMode && !!teamId }
  );

  if (isDemoMode) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{teamName} Stats</h3>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            Demo Data
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Yards</p>
            <p className="text-xl font-bold">385.5</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Points/Game</p>
            <p className="text-xl font-bold">27.3</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">3rd Down %</p>
            <p className="text-xl font-bold">42.8%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Turnovers</p>
            <p className="text-xl font-bold">1.2</p>
          </div>
        </div>
      </div>
    );
  }

  if (statsLoading || injuriesLoading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{teamName} Stats</h3>
      
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Total Yards</p>
            <p className="text-xl font-bold">{stats.TotalYards}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Points</p>
            <p className="text-xl font-bold">{stats.Score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">3rd Down Conv.</p>
            <p className="text-xl font-bold">{stats.ThirdDownConversions}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Turnovers</p>
            <p className="text-xl font-bold">{stats.Turnovers}</p>
          </div>
        </div>
      )}
      
      {injuries && injuries.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Injury Report</h4>
          <div className="space-y-2">
            {injuries.map((injury, index) => (
              <div 
                key={index}
                className={`text-sm p-2 rounded ${
                  injury.Status === 'Out' 
                    ? 'bg-red-50 text-red-700'
                    : injury.Status === 'Questionable'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {injury.Name} ({injury.Position}) - {injury.Status}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStats;