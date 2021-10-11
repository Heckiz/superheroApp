import {configureStore} from '@reduxjs/toolkit';
import superherosReducer from './slices/superheros/superheroSlice';
import authReducer from './slices/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedSuperheros = persistReducer(persistConfig, superherosReducer);
const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    superheros: persistedSuperheros,
    auth: persistedAuth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
