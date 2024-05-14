import React from 'react';
import {GluestackUIProvider, Text, Center, Divider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Center>
        <Text>Easy</Text>
        <Divider my="$0.5" />
        <Text>Difficult</Text>
      </Center>
    </GluestackUIProvider>
  );
}
