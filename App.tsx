import React from 'react';
import 'react-native-gesture-handler';
// import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';
import {View, ActivityIndicator} from 'react-native';

import { useFonts,RobotoSlab_400Regular,
  RobotoSlab_500Medium,RobotoSlab_700Bold} from '@expo-google-fonts/roboto-slab';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { Routes } from './src/routes';
import AppProvider from '@src/hooks';

export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold
  })
  if(!fontsLoaded){
    <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor:'#312E38'}}>
       <ActivityIndicator size="large" color="#999"/>
    </View>
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
