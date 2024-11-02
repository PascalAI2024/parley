import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPORTSDATA_API_KEY;
const BASE_URL = 'https://api.sportsdata.io/v3/nfl/stats/json';

export interface TeamStats {
  Score: number;
  TotalYards: number;
  FirstDowns: number;
  Turnovers: number;
}

export const fetchTeamStats = async (teamId: string): Promise<TeamStats> => {
  if (!API_KEY) {
    throw new Error('Sports Data API key not configured');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/TeamSeasonStats/${new Date().getFullYear()}REG`,
      {
        params: {
          key: API_KEY
        }
      }
    );
    
    const teamStats = response.data.find((team: any) => team.TeamID === teamId);
    
    if (!teamStats) {
      throw new Error('Team stats not found');
    }

    return {
      Score: teamStats.Score || 0,
      TotalYards: teamStats.TotalYards || 0,
      FirstDowns: teamStats.FirstDowns || 0,
      Turnovers: teamStats.Turnovers || 0
    };
  } catch (error) {
    console.error('Error fetching team stats:', error);
    throw error;
  }
};