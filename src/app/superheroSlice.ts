import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Result} from '../interfaces/superheros';
import {AppDispatch, RootState} from './store';

interface DataState {
  superheros: Result[];
  randomSuperheros: Result[];
  modal: {visible: boolean; character: Result | null};
  loading: boolean;
  error: boolean;
}

const initialState: DataState = {
  superheros: [],
  randomSuperheros: [],
  modal: {visible: false, character: null},
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

const superheroSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
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
} = superheroSlice.actions;
export default superheroSlice.reducer;
