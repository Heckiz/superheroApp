import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Result} from '../interfaces/superheros';
import {AppDispatch, RootState} from './store';

interface DataState {
  superheros: Result[];
  randomSuperheros: Result[];
  loading: boolean;
  error: boolean;
}

const initialState: DataState = {
  superheros: [],
  randomSuperheros: [],
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
    getState().superheros.randomSuperheros.length === 5
      ? dispatch(restartRandomSuperheros()) &&
        dispatch(addRandomSuperheros(data))
      : dispatch(addRandomSuperheros(data));
    return data;
  }
});

const superheroSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
    addRandomSuperheros(state, action: PayloadAction<Result>) {
      state.randomSuperheros.push(action.payload);
    },
    restartRandomSuperheros(state) {
      state.randomSuperheros = [];
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

export const {addRandomSuperheros, restartRandomSuperheros} =
  superheroSlice.actions;
export default superheroSlice.reducer;
