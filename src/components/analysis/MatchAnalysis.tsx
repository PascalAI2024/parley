import React from 'react';
import { useQuery } from 'react-query';
import { fetchMatchStats } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface MatchAnalysisProps {
  homeTeam: string;
  awayTeam: string;
}

const MatchAnalysis: React.FC<MatchAnalysisProps> = ({ homeTeam, awayTeam }) => {
  const { data: stats, isLoading, error } = useQuery(
    ['matchStats', homeTeam, awayTeam],
    () => fetchMatchStats(homeTeam, awayTeam),
    {
      enabled: !!homeTeam && !!awayTeam,
      staleTime: 1000 * 60 * 30, // 30 minutes
      retry: 2
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Unable to load match statistics" />;
  }

  if (!stats?.home || !stats?.away) {
    return <div className="text-gray-600">No statistics available for this match</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-4">Match Analysis</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <h4 className="font-semibold">{homeTeam}</h4>
          <div className="mt-2">
            <p>Points Per Game: {stats.home.PointsPerGame?.toFixed(1) || 'N/A'}</p>
            <p>Yards Per Game: {stats.home.YardsPerGame?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="font-semibold">Comparison</h4>
          <div className="mt-2">
            <p>Home vs Away</p>
            <p>Head to Head</p>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="font-semibold">{awayTeam}</h4>
          <div className="mt-2">
            <p>Points Per Game: {stats.away.PointsPerGame?.toFixed(1) || 'N/A'}</p>
            <p>Yards Per Game: {stats.away.YardsPerGame?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Key Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium">Offense</h5>
            <p>Pass Yards: {stats.home.PassingYardsPerGame?.toFixed(1) || 'N/A'}</p>
            <p>Rush Yards: {stats.home.RushingYardsPerGame?.toFixed(1) || 'N/A'}</p>
          </div>
          <div>
            <h5 className="font-medium">Defense</h5>
            <p>Points Allowed: {stats.home.PointsAllowedPerGame?.toFixed(1) || 'N/A'}</p>
            <p>Yards Allowed: {stats.home.YardsAllowedPerGame?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalysis;