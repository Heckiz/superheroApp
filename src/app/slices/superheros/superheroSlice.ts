import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Result} from '../../../interfaces/superheros';
import {handlePowerstats, initialState} from './helpers';
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
    changeTeam({myTeams}, action: PayloadAction<'teamA' | 'teamB' | 'teamC'>) {
      myTeams.teamSelected = action.payload;
    },
    switchEditable({myTeams}) {
      myTeams.editable = !myTeams.editable;
    },
    removeCharacter({myTeams}, action: PayloadAction<Result>) {
      const {teamSelected} = myTeams;
      const team = myTeams[teamSelected];

      const {id, biography, powerstats} = action.payload;

      team.ids = team.ids.filter(slotId => {
        return id !== slotId;
      });

      const slot = biography.alignment === 'good' ? team.goods : team.bads;
      slot.forEach((character, index) => {
        if (character?.id === id) {
          slot[index] = null;
        }
      });
      handlePowerstats(team.totalStats, powerstats, 'remove');
    },
    addSuperhero({myTeams}, action: PayloadAction<Result>) {
      const {teamSelected} = myTeams;
      const team = myTeams[teamSelected];
      const {goods, bads, totalStats} = team;
      const {powerstats, biography} = action.payload;

      const indexGood = goods.indexOf(null);
      const indexBad = bads.indexOf(null);
      if (indexGood !== -1) {
        biography.alignment === 'good'
          ? (goods[indexGood] = action.payload)
          : (bads[indexBad] = action.payload);
        team.ids.push(action.payload.id);
        handlePowerstats(totalStats, powerstats, 'add');
      }
    },
    addRandomSuperheros({randomSuperheros}, action: PayloadAction<Result>) {
      const {list, ids} = randomSuperheros;

      list.unshift(action.payload);
      ids.unshift(action.payload.id);
    },
    cleanRandomSuperheros({randomSuperheros}) {
      const {list, ids} = randomSuperheros;

      list.pop();
      ids.pop();
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
  removeCharacter,
  switchEditable,
  changeTeam,
} = superheroSlice.actions;
export default superheroSlice.reducer;
