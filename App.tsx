import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import MainNav from './src/navigation/mainNav';

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <MainNav />
      </Provider>
    </>
  );
};

export default App;
