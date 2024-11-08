import Loading from 'components/Loading';
import Navigation from 'navigation/Navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store, { persistor } from 'store/Store';

function App(): React.JSX.Element {

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
          <Loading />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;
