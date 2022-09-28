import React from 'react'; 

import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
import {TabsRoutes} from './tabs.routes';
import { Dashboard } from '../screens/Dashboard';
import { Home } from '../screens/Home';
import { Appointments } from '../screens/Appointments';
import { AppointmentsCreated } from '../screens/AppointmentsCreated';
import {Profile} from '@screens/Profile';

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
        <Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Screen
          name="Appointments"
          component={Appointments}
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