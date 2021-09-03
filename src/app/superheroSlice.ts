import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Result} from '../interfaces/superheros';

interface DataState {
  superheros: Result[] | undefined;
  loading: boolean;
  error: boolean;
}

const initialState: DataState = {
  superheros: undefined,
  loading: false,
  error: true,
};

export const fetchSuperheros = createAsyncThunk(
  'fetchSuperheros',
  async (params: string) => {
    const {data} = await axios.get(
      `https://superheroapi.com/api/2054933857978228/${params}`,
    );
    return data.results;
  },
);

const superheroSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {},
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
export default superheroSlice.reducer;
