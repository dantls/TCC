import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {View, ActivityIndicator} from 'react-native';
import { AuthRoutes  } from './auth.routes';
import { AppRoutes  } from './app.routes';

import { useAuth } from '../hooks/auth';

export function Routes(){
  const { user , loading} = useAuth();

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor:'#312E38'}}>
        <ActivityIndicator size="large" color="#999"/>
      </View>
    )
  }
  // console.log(Object.keys(user).length !== 0)
  return(
    <NavigationContainer>
      {/* <AuthRoutes/> */}
      { user ? <AppRoutes/> : <AuthRoutes />}
      {/* {true? <AppRoutes/> : <AuthRoutes />} */}
    </NavigationContainer>
  );
}