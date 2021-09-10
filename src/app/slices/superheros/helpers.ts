import {Powerstats, Result} from '../../../interfaces/superheros';

export interface DataState {
  superheros: Result[];
  randomSuperheros: {
    ids: string[];
    list: Result[];
  };
  modal: {visible: boolean; character: Result | null};
  myTeam: {
    ids: string[];
    goods: [Result | null, Result | null, Result | null];
    bads: [Result | null, Result | null, Result | null];
    totalStats: Powerstats;
  };
  loading: boolean;
  error: boolean;
  user: {
    logged: boolean;
    token: string | null;
  };
}

export const initialState: DataState = {
  superheros: [],
  randomSuperheros: {ids: [], list: []},
  modal: {visible: false, character: null},
  myTeam: {
    ids: [],
    goods: [null, null, null],
    bads: [null, null, null],
    totalStats: {
      combat: '0',
      durability: '0',
      intelligence: '0',
      power: '0',
      speed: '0',
      strength: '0',
    },
  },
  loading: false,
  error: true,
  user: {
    logged: false,
    token: null,
  },
};

export const addPowerstats = (myStats: Powerstats, newStats: Powerstats) => {
  const {combat, durability, intelligence, power, speed, strength} = newStats;

  myStats.combat = '' + (+myStats.combat + (+combat ? +combat : 0));
  myStats.durability =
    '' + (+myStats.durability + (+durability ? +durability : 0));
  myStats.intelligence =
    '' + (+myStats.intelligence + (+intelligence ? +intelligence : 0));
  myStats.power = '' + (+myStats.power + (+power ? +power : 0));
  myStats.speed = '' + (+myStats.speed + (+speed ? +speed : 0));
  myStats.strength = '' + (+myStats.strength + (+strength ? +strength : 0));
};
