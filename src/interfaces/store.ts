import {Powerstats, Result} from './superheros';

export interface Team {
  ids: string[];
  goods: [Result | null, Result | null, Result | null];
  bads: [Result | null, Result | null, Result | null];
  totalStats: Powerstats;
}

export interface DataState {
  superheros: Result[];
  randomSuperheros: {
    ids: string[];
    switchList: boolean;
    listOne: Result[];
    listTwo: Result[];
  };
  modal: {visible: boolean; character: Result | null};
  myTeams: {
    teamSelected: 'teamA' | 'teamB' | 'teamC';
    teamA: Team;
    teamB: Team;
    teamC: Team;
    editable: boolean;
  };
  loading: boolean;
  error: boolean;
  user: {
    logged: boolean;
    token: string | null;
  };
}
