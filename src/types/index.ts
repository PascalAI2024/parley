export interface Odds {
  homeOdds: number | null;
  awayOdds: number | null;
}

export interface Match {
  id: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  odds: Odds;
  status: string;
}

export interface TeamStats {
  TeamID: string;
  Name: string;
  Score: number;
  OpponentScore: number;
  TimeOfPossession: string;
  FirstDowns: number;
  ThirdDownConversions: number;
  FourthDownConversions: number;
  TotalYards: number;
  PassingYards: number;
  RushingYards: number;
  Penalties: number;
  PenaltyYards: number;
  Turnovers: number;
  Fumbles: number;
  Interceptions: number;
}

export interface InjuryReport {
  PlayerID: string;
  Name: string;
  Position: string;
  Status: string;
  Practice: string;
  Updated: string;
  DeclaredInactive: boolean;
}