import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Powerstats, Result} from '../interfaces/superheros';
import {AppDispatch, RootState} from './store';

interface DataState {
  superheros: Result[];
  randomSuperheros: Result[];
  modal: {visible: boolean; character: Result | null};
  myTeam: {
    ids: string[];
    goods: [Result | null, Result | null, Result | null];
    bads: [Result | null, Result | null, Result | null];
    totalStats: Powerstats;
  };
  loading: boolean;
  error: boolean;
}

const initialState: DataState = {
  superheros: [],
  randomSuperheros: [],
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
};

export const fetchSuperheros = createAsyncThunk<
  Result[],
  string,
  {dispatch: AppDispatch; state: RootState}
>('fetchSuperheros', async (params, {getState, dispatch}) => {
  const {data} = await axios.get(
    `https://superheroapi.com/api/2054933857978228/${params}`,
  );
  if (params.startsWith('search/')) {
    return data.results;
  } else {
    getState().superheros.randomSuperheros.length === 6
      ? dispatch(cleanRandomSuperheros()) && dispatch(addRandomSuperheros(data))
      : dispatch(addRandomSuperheros(data));
    return data;
  }
});

const addPowerstats = (myStats: Powerstats, newStats: Powerstats) => {
  const {combat, durability, intelligence, power, speed, strength} = newStats;

  myStats.combat = String(
    Number(myStats.combat) + Number(combat) ? Number(combat) : 0,
  );

  myStats.durability = String(
    Number(myStats.durability) + Number(durability) ? Number(durability) : 0,
  );

  myStats.intelligence = String(
    Number(myStats.intelligence) + Number(intelligence)
      ? Number(intelligence)
      : 0,
  );

  myStats.power = String(
    Number(myStats.power) + Number(power) ? Number(power) : 0,
  );

  myStats.speed = String(
    Number(myStats.speed) + Number(speed) ? Number(speed) : 0,
  );

  myStats.strength = String(
    Number(myStats.strength) + Number(strength) ? Number(strength) : 0,
  );
};

const superheroSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
    addSuperhero(state, action: PayloadAction<Result>) {
      const {goods, bads, ids, totalStats} = state.myTeam;
      const {alignment} = action.payload.biography;
      const {powerstats} = action.payload;

      const indexGood = goods.indexOf(null);
      const indexBad = bads.indexOf(null);
      if (alignment === 'good' && indexGood !== -1) {
        goods[indexGood] = action.payload;
        ids.push(action.payload.id);
        addPowerstats(totalStats, powerstats);
      }
      if (alignment === 'bad' && indexBad !== -1) {
        bads[indexBad] = action.payload;
        ids.push(action.payload.id);
        addPowerstats(totalStats, powerstats);
      }
    },
    addRandomSuperheros(state, action: PayloadAction<Result>) {
      state.randomSuperheros.unshift(action.payload);
    },
    cleanRandomSuperheros(state) {
      state.randomSuperheros.pop();
    },
    openModal(state, action: PayloadAction<Result>) {
      state.modal.visible = true;
      state.modal.character = action.payload;
    },
    closeModal(state) {
      state.modal.visible = false;
      state.modal.character = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSuperheros.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchSuperheros.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.superheros = action.payload;
          state.loading = false;
          state.error = false;
        },
      )
      .addCase(fetchSuperheros.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  addRandomSuperheros,
  cleanRandomSuperheros,
  openModal,
  closeModal,
  addSuperhero,
} = superheroSlice.actions;
export default superheroSlice.reducer;
