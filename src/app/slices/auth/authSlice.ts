import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  logged: boolean;
  token: string | null;
};

const initialState: AuthState = {
  logged: false,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: {logged, token},
      }: PayloadAction<{logged: boolean; token: string}>,
    ) => {
      state.logged = logged;
      state.token = token;
    },
  },
});

export const {setCredentials} = authSlice.actions;

export default authSlice.reducer;
