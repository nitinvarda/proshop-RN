import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeNavigator from '../stackNavigators/HomeNavigator';
import LoginNavigator from '../stackNavigators/LoginNavigator';
import ProfileNavigator from '../stackNavigators/ProfileNavigator';
import CartScreen from '../../screens/Home/CartScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomNavigator(props) {
    const authenticated = true;
  return (
    <BottomTab.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <BottomTab.Screen name="Home" component={HomeNavigator} />
      <BottomTab.Screen name='Profile' component={ProfileNavigator} />
      <BottomTab.Screen name="Cart" component={CartScreen} />
      
    </BottomTab.Navigator>
  )
}