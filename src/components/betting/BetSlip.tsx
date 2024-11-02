import React, { useState } from 'react';
import { Game } from '../../services/demoData';
import { getTeamInfo } from '../../services/teamData';
import { fetchTeamAnalysis } from '../../services/analysisService';
import { useQuery } from 'react-query';
import { useApiMode } from '../../hooks/useApiMode';

interface BetSlipProps {
  selectedMatch?: Game;
}

interface Bet {
  id: string;
  type: string;
  team: string;
  odds: number;
  stake: string;
  matchId: string;
}

const BetSlip: React.FC<BetSlipProps> = ({ selectedMatch }) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [error, setError] = useState<string>('');
  const [expandedBet, setExpandedBet] = useState<string | null>(null);
  const { isDemoMode } = useApiMode();

  // Fetch analysis for selected teams
  const analyses = useQuery(
    ['betAnalyses', bets.map(b => b.team).join(',')],
    async () => {
      const analyses = await Promise.all(
        bets.map(bet => fetchTeamAnalysis(bet.team))
      );
      return Object.fromEntries(
        bets.map((bet, i) => [bet.id, analyses[i]])
      );
    },
    {
      enabled: bets.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  const addBet = (team: string, odds: number) => {
    if (!selectedMatch) return;
    
    // Check if we already have a bet for this match
    const existingMatchBet = bets.find(b => b.matchId === selectedMatch.id);
    if (existingMatchBet) {
      setError('You already have a bet for this match');
      return;
    }

    const newBet = {
      id: `${selectedMatch.id}-${team}`,
      type: 'Moneyline',
      team,
      odds,
      stake: '10',
      matchId: selectedMatch.id
    };

    setBets(prev => [...prev, newBet]);
    setExpandedBet(newBet.id);
    setError('');
  };

  const removeBet = (id: string) => {
    setBets(prev => prev.filter(b => b.id !== id));
    if (expandedBet === id) setExpandedBet(null);
    setError('');
  };

  const updateStake = (id: string, stake: string) => {
    setBets(prev => prev.map(bet => 
      bet.id === id ? { ...bet, stake } : bet
    ));
  };

  const calculatePotentialWin = (stake: string, odds: number) => {
    const stakeNum = parseFloat(stake) || 0;
    return odds > 0 
      ? (stakeNum * (odds / 100)).toFixed(2)
      : (stakeNum * (100 / Math.abs(odds))).toFixed(2);
  };

  const placeBets = () => {
    if (bets.some(bet => !bet.stake || parseFloat(bet.stake) <= 0)) {
      setError('Please enter a valid stake amount for all bets');
      return;
    }

    if (isDemoMode) {
      alert('Demo Mode: Bets cannot be placed. Add your API key in settings to enable real betting.');
      return;
    }

    // In a real implementation, this would make an API call
    alert(`Placed ${bets.length} bet(s) successfully!`);
    setBets([]);
    setError('');
  };

  if (!selectedMatch) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">Select a match to place bets</p>
        </div>
      </div>
    );
  }

  const homeTeam = getTeamInfo(selectedMatch.homeTeam);
  const awayTeam = getTeamInfo(selectedMatch.awayTeam);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Bet Slip</h2>
        {isDemoMode && (
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Demo Mode
            </span>
            <button 
              onClick={() => alert('Add your API key in settings to enable real betting')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              ⓘ
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Match Selection */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src={homeTeam.logo} alt={homeTeam.name} className="w-6 h-6" />
              <span className="text-sm font-medium">vs</span>
              <img src={awayTeam.logo} alt={awayTeam.name} className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-500">{selectedMatch.league}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addBet(selectedMatch.homeTeam, selectedMatch.homeOdds)}
              className="p-3 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: homeTeam.primaryColor }}
            >
              <div className="font-medium">{homeTeam.name}</div>
              <div className="text-lg font-bold" style={{ color: homeTeam.primaryColor }}>
                {selectedMatch.homeOdds > 0 ? `+${selectedMatch.homeOdds}` : selectedMatch.homeOdds}
              </div>
            </button>

            <button
              onClick={() => addBet(selectedMatch.awayTeam, selectedMatch.awayOdds)}
              className="p-3 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: awayTeam.primaryColor }}
            >
              <div className="font-medium">{awayTeam.name}</div>
              <div className="text-lg font-bold" style={{ color: awayTeam.primaryColor }}>
                {selectedMatch.awayOdds > 0 ? `+${selectedMatch.awayOdds}` : selectedMatch.awayOdds}
              </div>
            </button>
          </div>
        </div>

        {/* Active Bets */}
        {bets.map((bet) => (
          <div key={bet.id} className="rounded-lg border">
            <div className="p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">{bet.team}</div>
                  <div className="text-xs text-gray-500">{bet.type}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setExpandedBet(expandedBet === bet.id ? null : bet.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedBet === bet.id ? '▼' : '▶'}
                  </button>
                  <button
                    onClick={() => removeBet(bet.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Stake ($)</label>
                  <input
                    type="number"
                    value={bet.stake}
                    onChange={(e) => updateStake(bet.id, e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">To Win</div>
                  <div className="text-sm font-medium text-green-600">
                    ${calculatePotentialWin(bet.stake, bet.odds)}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            {expandedBet === bet.id && (
              <div className="p-3 border-t">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Quick Analysis</h4>
                  {isDemoMode && (
                    <span className="text-xs text-yellow-600">Sample Data</span>
                  )}
                </div>
                {analyses.isLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 bg-gray-100 rounded"></div>
                    ))}
                  </div>
                ) : analyses.data?.[bet.id] ? (
                  <div className="space-y-2">
                    {analyses.data[bet.id].map((item, i) => (
                      <div
                        key={i}
                        className={`text-sm p-2 rounded ${
                          item.impact === 'positive'
                            ? 'bg-green-50 text-green-700'
                            : item.impact === 'negative'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{item.key}:</span> {item.value}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No analysis available</div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Place Bet Button */}
        {bets.length > 0 && (
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <div>Total Odds: <span className="font-medium">
                  {bets.reduce((acc, bet) => acc * (1 + bet.odds/100), 1).toFixed(2)}
                </span></div>
                <div>Potential Payout: <span className="font-medium text-green-600">
                  ${bets.reduce((acc, bet) => acc + parseFloat(calculatePotentialWin(bet.stake, bet.odds)), 0).toFixed(2)}
                </span></div>
              </div>
              <button
                onClick={placeBets}
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  isDemoMode 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isDemoMode ? '🔒 Demo: Place Bet' : 'Place Bet'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetSlip;