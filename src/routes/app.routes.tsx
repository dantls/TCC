import React from 'react'; 

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
import {TabsRoutes} from './tabs.routes';


export function AppRoutes(){
  return(
      <Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        <Screen
          name="MainBottom"
          component={TabsRoutes}
        />
      </Navigator>
  )
}