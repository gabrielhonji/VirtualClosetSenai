import React from 'react';
import {GluestackUIProvider, SafeAreaView} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import StartNavigator from './src/screens/navigator/Navigator';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView bg='#1E1716'>
          <StartNavigator />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}