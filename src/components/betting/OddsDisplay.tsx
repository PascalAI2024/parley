import React from 'react';

interface OddsDisplayProps {
  moneyline: string;
  spread?: string;
  total?: string;
}

const OddsDisplay: React.FC<OddsDisplayProps> = ({ moneyline, spread, total }) => {
  return (
    <div className="flex space-x-2 text-sm">
      <button className="bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
        ML {moneyline}
      </button>
      {spread && (
        <button className="bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
          {spread}
        </button>
      )}
      {total && (
        <button className="bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
          O/U {total}
        </button>
      )}
    </div>
  );
};

export default OddsDisplay;