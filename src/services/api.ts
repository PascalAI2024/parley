import axios from 'axios';
import { addHours } from 'date-fns';

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;
const SPORTS_DATA_API_KEY = import.meta.env.VITE_SPORTS_DATA_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Cache management
const CACHE_DURATION = 2; // hours
const cache: { [key: string]: { data: any; timestamp: Date } } = {};

const isStale = (timestamp: Date) => {
  return new Date() > addHours(timestamp, CACHE_DURATION);
};

export const fetchOdds = async () => {
  const cacheKey = 'odds';
  if (cache[cacheKey] && !isStale(cache[cacheKey].timestamp)) {
    return cache[cacheKey].data;
  }

  try {
    const response = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${ODDS_API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american`
    );
    
    const data = response.data;
    cache[cacheKey] = { data, timestamp: new Date() };
    return data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error);
    throw error;
  }
};

export const fetchMatchStats = async (homeTeam: string, awayTeam: string) => {
  const cacheKey = `stats-${homeTeam}-${awayTeam}`;
  if (cache[cacheKey] && !isStale(cache[cacheKey].timestamp)) {
    return cache[cacheKey].data;
  }

  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${SPORTS_DATA_API_KEY}`
    );
    
    const teams = response.data;
    const homeTeamData = teams.find((team: any) => team.Name === homeTeam);
    const awayTeamData = teams.find((team: any) => team.Name === awayTeam);
    
    if (!homeTeamData || !awayTeamData) {
      throw new Error(`Invalid team name: ${!homeTeamData ? homeTeam : awayTeam}`);
    }

    const statsResponse = await axios.get(
      `https://api.sportsdata.io/v3/nfl/stats/json/TeamSeasonStats/${new Date().getFullYear()}?key=${SPORTS_DATA_API_KEY}`
    );

    const homeStats = statsResponse.data.find((stat: any) => stat.TeamID === homeTeamData.TeamID);
    const awayStats = statsResponse.data.find((stat: any) => stat.TeamID === awayTeamData.TeamID);

    const data = {
      homeTeam: { ...homeTeamData, stats: homeStats },
      awayTeam: { ...awayTeamData, stats: awayStats }
    };

    cache[cacheKey] = { data, timestamp: new Date() };
    return data;
  } catch (error: any) {
    console.error('Match Stats Error:', error.response?.data || error);
    throw error;
  }
};

export const fetchNews = async (query: string) => {
  const cacheKey = `news-${query}`;
  if (cache[cacheKey] && !isStale(cache[cacheKey].timestamp)) {
    return cache[cacheKey].data;
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    
    const data = response.data.articles.slice(0, 5);
    cache[cacheKey] = { data, timestamp: new Date() };
    return data;
  } catch (error: any) {
    console.error('News API Error:', error.response?.data || error);
    throw error;
  }
};

export const clearCache = () => {
  Object.keys(cache).forEach(key => delete cache[key]);
};