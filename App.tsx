import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/app/store';
import MainNav from './src/navigation/mainNav';

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNav />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
