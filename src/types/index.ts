export interface Character {
  name: string;
  birth_year: string;
}

export interface Planet {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  rotation_period: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Character | null;
  searchCount: number;
  lastSearchTime: number;
}
