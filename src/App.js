import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import Routes from './routes';
import { store, persistor } from './store1';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <GlobalStyle />
      </PersistGate>
    </Provider>
  );
}

export default App;
