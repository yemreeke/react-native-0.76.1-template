import Loading from 'components/Loading';
import Navigation from 'navigation/Navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <Navigation />
      <Loading />
    </SafeAreaProvider>
  );
}

export default App;
