import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { User } from '../screens/User';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator
      screenOptions={{
        headerShown:false,
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="User"
        component={User}
      />
    </Navigator>
  )
}