import {Powerstats, Result} from '../../../interfaces/superheros';

export interface DataState {
  superheros: Result[];
  randomSuperheros: {
    ids: string[];
    switchList: boolean;
    listOne: Result[];
    listTwo: Result[];
  };
  modal: {visible: boolean; character: Result | null};
  myTeam: {
    editable: boolean;
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
  randomSuperheros: {ids: [], switchList: false, listOne: [], listTwo: []},
  modal: {visible: false, character: null},
  myTeam: {
    editable: false,
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

type handleOption = 'add' | 'remove';

export const handlePowerstats = (
  myStats: Powerstats,
  newStats: Powerstats,
  operatorParam: handleOption,
) => {
  const {combat, durability, intelligence, power, speed, strength} = newStats;

  const addStats = (oldValue: number, newValue: number) => {
    return '' + (oldValue + newValue);
  };
  const removeStats = (oldValue: number, newValue: number) => {
    return '' + (oldValue - newValue);
  };

  const handleOperator = operatorParam === 'add' ? addStats : removeStats;

  myStats.combat = handleOperator(+myStats.combat, +combat ? +combat : 0);
  myStats.durability = handleOperator(
    +myStats.durability,
    +durability ? +durability : 0,
  );
  myStats.intelligence = handleOperator(
    +myStats.intelligence,
    +intelligence ? +intelligence : 0,
  );
  myStats.power = handleOperator(+myStats.power, +power ? +power : 0);
  myStats.speed = handleOperator(+myStats.speed, +speed ? +speed : 0);
  myStats.strength = handleOperator(
    +myStats.strength,
    +strength ? +strength : 0,
  );
};
