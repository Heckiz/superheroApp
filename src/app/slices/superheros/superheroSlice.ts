import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Result} from '../../../interfaces/superheros';
import {addPowerstats, initialState} from './helpers';
import {AppDispatch, RootState} from '../../store';

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
    const {randomSuperheros} = getState().superheros;
    randomSuperheros.list.length === 6
      ? dispatch(cleanRandomSuperheros()) && dispatch(addRandomSuperheros(data))
      : dispatch(addRandomSuperheros(data));
    return data;
  }
});

const superheroSlice = createSlice({
  name: 'superhero',
  initialState: initialState,
  reducers: {
    addSuperhero({myTeam}, action: PayloadAction<Result>) {
      const {goods, bads, ids, totalStats} = myTeam;
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
    addRandomSuperheros({randomSuperheros}, action: PayloadAction<Result>) {
      randomSuperheros.list.unshift(action.payload);
      randomSuperheros.ids.unshift(action.payload.id);
    },
    cleanRandomSuperheros({randomSuperheros}) {
      randomSuperheros.list.pop();
      randomSuperheros.ids.pop();
    },
    openModal({modal}, action: PayloadAction<Result>) {
      modal.visible = true;
      modal.character = action.payload;
    },
    closeModal({modal}) {
      modal.visible = false;
      modal.character = null;
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
