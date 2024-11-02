import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Bet } from '../../types';

interface ParlayBuilderProps {
  bets: Bet[];
  onRemoveBet: (id: string) => void;
  totalOdds: number;
  potentialWin: number;
}

export const ParlayBuilder: React.FC<ParlayBuilderProps> = ({
  bets,
  onRemoveBet,
  totalOdds,
  potentialWin
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Parlay Builder</h2>
        <TransitionGroup className="space-y-2">
          {bets.map((bet) => {
            const nodeRef = useRef(null);
            return (
              <CSSTransition
                key={bet.id}
                nodeRef={nodeRef}
                timeout={300}
                classNames="bet"
              >
                <div ref={nodeRef} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-medium">{bet.teamName}</p>
                    <p className="text-sm text-gray-600">{bet.odds}</p>
                  </div>
                  <button
                    onClick={() => onRemoveBet(bet.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        
        {bets.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Odds: {totalOdds.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Potential Win: ${potentialWin.toFixed(2)}</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Place Bet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParlayBuilder;