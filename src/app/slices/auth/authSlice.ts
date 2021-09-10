import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  logged: boolean;
  user: string;
  token: string | null;
};

const initialState: AuthState = {
  logged: false,
  user: '',
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.logged = true;
      state.user = action.payload;
    },
    logOut: state => {
      state.logged = false;
      state.user = '';
    },
  },
});

export const {logIn} = authSlice.actions;

export default authSlice.reducer;
