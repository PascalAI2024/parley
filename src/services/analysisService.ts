import { Cache } from './cache';

const NEWS_CACHE_KEY = 'SPORTS_NEWS_CACHE';
const ANALYSIS_CACHE_KEY = 'TEAM_ANALYSIS_CACHE';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface Analysis {
  key: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
}

// Enhanced demo news with more realistic and varied content
const DEMO_NEWS: { [key: string]: NewsItem[] } = {
  'Kansas City Chiefs': [
    {
      title: "Mahomes' Outstanding Performance Leads Chiefs to Victory",
      description: "Patrick Mahomes throws for 400+ yards in commanding win",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "NFL Network" }
    },
    {
      title: "Chiefs Defense Shows Improvement in Recent Games",
      description: "Defensive unit records multiple turnovers and sacks",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "Sports Analysis" }
    }
  ],
  'Buffalo Bills': [
    {
      title: "Bills' Offensive Line Concerns Ahead of Big Game",
      description: "Key injuries might impact protection schemes",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "ESPN" }
    },
    {
      title: "Allen's Rushing Ability Creates Matchup Problems",
      description: "Quarterback's dual-threat capability proves crucial",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "NFL Insider" }
    }
  ],
  'default': [
    {
      title: "NFL Week Preview: Key Matchups to Watch",
      description: "Breaking down the most important games this week",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "Sports Central" }
    },
    {
      title: "Injury Report Updates Across the League",
      description: "Latest status on key players for upcoming games",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "NFL Updates" }
    }
  ]
};

const DEMO_ANALYSIS: { [key: string]: Analysis[] } = {
  'Kansas City Chiefs': [
    { key: 'Home Record', value: '7-1', impact: 'positive' },
    { key: 'Points/Game', value: '28.5', impact: 'positive' },
    { key: 'Key Players', value: 'All starters available', impact: 'positive' },
    { key: 'Recent Trend', value: 'Won last 4 home games', impact: 'positive' }
  ],
  'Buffalo Bills': [
    { key: 'Away Record', value: '4-4', impact: 'neutral' },
    { key: 'Recent Form', value: 'Won last 3', impact: 'positive' },
    { key: 'Injuries', value: 'Starting RB questionable', impact: 'negative' },
    { key: 'Weather Impact', value: 'Favorable conditions', impact: 'positive' }
  ],
  'Dallas Cowboys': [
    { key: 'Home Record', value: '6-2', impact: 'positive' },
    { key: 'Defense Rank', value: '#3 Overall', impact: 'positive' },
    { key: 'Weather', value: 'Clear conditions', impact: 'neutral' },
    { key: 'Momentum', value: 'Coming off big win', impact: 'positive' }
  ],
  'Philadelphia Eagles': [
    { key: 'Road Record', value: '5-3', impact: 'positive' },
    { key: 'Offense Rank', value: '#2 Scoring', impact: 'positive' },
    { key: 'Rest Days', value: 'Short week', impact: 'negative' },
    { key: 'Head-to-Head', value: 'Won last meeting', impact: 'positive' }
  ]
};

export const fetchTeamNews = async (teamName: string): Promise<NewsItem[]> => {
  const cachedNews = Cache.get<NewsItem[]>(`${NEWS_CACHE_KEY}_${teamName}`);
  if (cachedNews) return cachedNews;

  // Use team-specific demo news if available, otherwise use default
  const demoNews = DEMO_NEWS[teamName] || DEMO_NEWS['default'];
  
  // Store in cache for 2 hours
  Cache.set(`${NEWS_CACHE_KEY}_${teamName}`, demoNews, 7200);
  
  return demoNews;
};

export const fetchTeamAnalysis = async (teamName: string): Promise<Analysis[]> => {
  const cachedAnalysis = Cache.get<Analysis[]>(`${ANALYSIS_CACHE_KEY}_${teamName}`);
  if (cachedAnalysis) return cachedAnalysis;

  const analysis = DEMO_ANALYSIS[teamName] || [
    { key: 'Recent Form', value: 'Mixed results', impact: 'neutral' },
    { key: 'Team Status', value: 'No major concerns', impact: 'neutral' },
    { key: 'Historical', value: 'Limited data', impact: 'neutral' },
    { key: 'Trend', value: 'Stable performance', impact: 'neutral' }
  ];

  // Store in cache for 2 hours
  Cache.set(`${ANALYSIS_CACHE_KEY}_${teamName}`, analysis, 7200);
  
  return analysis;
};