import React from 'react'; 
import { Platform } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {Home} from '@screens/Home';
import {Favorite} from '@screens/Favorite';
import {Recent} from '@screens/Recent';
import {Profile} from '@screens/Profile';
// import {Client} from '@screens/Client';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
  const theme = useTheme();
  return(

  <Navigator
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: theme.COLORS.PRIMARY_900,
      tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
      tabBarLabelPosition: 'beside-icon', 
      tabBarStyle: {
        height: 68,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      }
    }}
  >
    <Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="home"
            size={20}
            color={color}
          />
        ))
      }}
    />
    <Screen
      name="Favoritos"
      component={Favorite}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="favorite"
            size={20}
            color={color}
          />
        ))
      }}
    />
    {/* <Screen
      name="Cliente"
      component={Client}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="person-add"
            size={size}
            color={color}
          />
        ))
      }}
    /> */}
   
    <Screen
      name="Recentes"
      component={Recent}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="recent-actors"
            size={20}
            color={color}
          />
        ))
      }}
    />
    <Screen
      name="Perfil"
      component={Profile}
      options={{
        tabBarIcon: (({ size, color }) => (
          <FontAwesome5
            name="user-edit"
            size={20}
            color={color}
          />
        ))
      }}
    />
    </Navigator>
  )
}