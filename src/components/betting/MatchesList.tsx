import React from 'react';
import { format } from 'date-fns';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { getTeamInfo } from '../../services/teamData';

interface MatchesListProps {
  matches: any[];
  onSelectMatch: (match: any) => void;
  selectedMatches: string[];
  isLoading?: boolean;
  error?: Error | null;
}

const MatchesList: React.FC<MatchesListProps> = ({
  matches,
  onSelectMatch,
  selectedMatches,
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center bg-white rounded-lg shadow">
        No matches available at the moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const isSelected = selectedMatches.includes(match.id);
        const homeTeamInfo = getTeamInfo(match.home_team);
        const awayTeamInfo = getTeamInfo(match.away_team);
        
        const bookmaker = match.bookmakers?.[0];
        const odds = bookmaker?.markets?.find(m => m.key === 'h2h')?.outcomes;
        const homeOdds = odds?.find(o => o.name === match.home_team)?.price;
        const awayOdds = odds?.find(o => o.name === match.away_team)?.price;

        return (
          <div
            key={match.id}
            className={`p-4 rounded-lg border ${
              isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            } hover:shadow-md transition-all cursor-pointer`}
            onClick={() => onSelectMatch(match)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <img src={homeTeamInfo.logo} alt={match.home_team} className="w-6 h-6" />
                  <p className="font-medium">{match.home_team}</p>
                  <span className="text-sm text-gray-500">vs</span>
                  <img src={awayTeamInfo.logo} alt={match.away_team} className="w-6 h-6" />
                  <p className="font-medium">{match.away_team}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {format(new Date(match.commence_time), 'MMM d, h:mm a')}
                </p>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-500">Home:</span>{' '}
                    <span className="font-medium">{homeOdds > 0 ? `+${homeOdds}` : homeOdds}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Away:</span>{' '}
                    <span className="font-medium">{awayOdds > 0 ? `+${awayOdds}` : awayOdds}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchesList;