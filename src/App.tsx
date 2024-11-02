import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Header from './components/layout/Header';
import QuickStats from './components/layout/QuickStats';
import MatchesList from './components/betting/MatchesList';
import MatchAnalysis from './components/analysis/MatchAnalysis';
import NewsWidget from './components/news/NewsWidget';
import ParlayBuilder from './components/betting/ParlayBuilder';
import { fetchOdds } from './services/api';

const App: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [parlayBets, setParlayBets] = useState<any[]>([]);

  const { data: matches, isLoading, error } = useQuery('matches', fetchOdds, {
    refetchInterval: 1000 * 60 * 5, // Refresh every 5 minutes
  });

  const handleMatchSelect = (match: any) => {
    setSelectedMatch(match);
  };

  const addToParlayBet = (bet: any) => {
    setParlayBets(prev => [...prev, bet]);
  };

  const removeParlayBet = (id: string) => {
    setParlayBets(prev => prev.filter(bet => bet.id !== id));
  };

  const clearParlayBets = () => {
    setParlayBets([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <QuickStats />
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MatchesList 
              matches={matches || []}
              onSelectMatch={handleMatchSelect}
              selectedMatches={parlayBets.map(bet => bet.id)}
              isLoading={isLoading}
              error={error as Error}
            />
          </div>
          <div className="space-y-4">
            {selectedMatch && (
              <MatchAnalysis 
                homeTeam={selectedMatch.home_team}
                awayTeam={selectedMatch.away_team}
              />
            )}
            <NewsWidget selectedMatch={selectedMatch} />
          </div>
        </div>
      </main>

      <ParlayBuilder
        bets={parlayBets}
        onRemoveBet={removeParlayBet}
        onClearBets={clearParlayBets}
        totalOdds={parlayBets.reduce((acc, bet) => acc * bet.odds, 1)}
        potentialWin={parlayBets.reduce((acc, bet) => acc * bet.odds, 10)}
      />
    </div>
  );
};

export default App;