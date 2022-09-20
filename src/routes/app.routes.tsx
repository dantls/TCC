import React from 'react'; 

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
// import {TabsRoutes} from './tabs.routes';
import { Dashboard1 } from '../screens/Dashboard1';
import { Dashboard } from '../screens/Dashboard';
import { AppointmentsCreated } from '../screens/AppointmentsCreated';
import {Profile} from '@screens/Profile';

export function AppRoutes(){
  return(
      <Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        {/* <Screen
          name="MainBottom"
          component={TabsRoutes}
        /> */}
        <Screen
          name="Dashboard1"
          component={Dashboard1}
        />
        <Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Screen
          name="AppointmentsCreated"
          component={AppointmentsCreated}
        />
        <Screen
          name="Profile"
          component={Profile}
        />

      </Navigator>
  )
}