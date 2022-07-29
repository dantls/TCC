import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes  } from './auth.routes';
import { AppRoutes  } from './app.routes';

import { useAuth } from '../hooks/auth';


export function Routes(){
  const { user } = useAuth();
  // console.log(Object.keys(user).length !== 0)
  return(
    <NavigationContainer>
      {/* <AuthRoutes/> */}
      { ( Object.keys(user).length !== 0 ) ? <AppRoutes/> : <AuthRoutes />}
    </NavigationContainer>
  );
}