import React from 'react';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';


import { useFonts,RobotoSlab_400Regular,
  RobotoSlab_500Medium,RobotoSlab_700Bold} from '@expo-google-fonts/roboto-slab';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { Routes } from './src/routes';
import AppProvider from '@src/hooks';
import { TabsRoutes } from '@src/routes/tabs.routes';
import { Appointments } from '@src/screens/Appointments';

export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold
  })
  if(!fontsLoaded){
    // return <AppLoading />
  }

  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent"/>
      <AppProvider>
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
      </AppProvider>
    </>
  );
}
