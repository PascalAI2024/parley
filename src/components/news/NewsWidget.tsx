import React from 'react';
import { useQuery } from 'react-query';
import { fetchTeamNews } from '../../services/analysisService';

interface NewsWidgetProps {
  selectedMatch?: {
    homeTeam: string;
    awayTeam: string;
  };
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ selectedMatch }) => {
  const { data: homeNews, isLoading: homeLoading } = useQuery(
    ['news', selectedMatch?.homeTeam],
    () => selectedMatch ? fetchTeamNews(selectedMatch.homeTeam) : Promise.resolve([]),
    { enabled: !!selectedMatch }
  );

  const { data: awayNews, isLoading: awayLoading } = useQuery(
    ['news', selectedMatch?.awayTeam],
    () => selectedMatch ? fetchTeamNews(selectedMatch.awayTeam) : Promise.resolve([]),
    { enabled: !!selectedMatch }
  );

  if (!selectedMatch) {
    return null;
  }

  if (homeLoading || awayLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Latest News</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!homeNews?.length && !awayNews?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Latest News</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-center">No news available for this match.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Latest News</h2>
      
      <div className="space-y-4">
        {/* Home Team News */}
        {homeNews && homeNews.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {selectedMatch.homeTeam} News
            </h3>
            <div className="space-y-2">
              {homeNews.slice(0, 3).map((news, index) => (
                <div
                  key={index}
                  className="block p-3 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-medium text-sm">{news.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {news.source.name} • {new Date(news.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Away Team News */}
        {awayNews && awayNews.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {selectedMatch.awayTeam} News
            </h3>
            <div className="space-y-2">
              {awayNews.slice(0, 3).map((news, index) => (
                <div
                  key={index}
                  className="block p-3 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-medium text-sm">{news.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {news.source.name} • {new Date(news.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsWidget;