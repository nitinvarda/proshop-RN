import { View, Text,StyleSheet,TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeNavigator from '../stackNavigators/HomeNavigator';
import LoginNavigator from '../stackNavigators/LoginNavigator';
import ProfileNavigator from '../stackNavigators/ProfileNavigator';
import CartScreen from '../../screens/Home/CartScreen';
import TabBar from '../../components/TabBar';

const BottomTab = createBottomTabNavigator();



export default function BottomNavigator(props) {
    const authenticated = true;
  return (
    <BottomTab.Navigator tabBar={(props)=><TabBar {...props} />} initialRouteName='Home' screenOptions={{headerShown:false}}>
      <BottomTab.Screen name="Home" component={HomeNavigator} />
      <BottomTab.Screen name="Cart" component={CartScreen} />
      <BottomTab.Screen name='Profile' component={ProfileNavigator} />
      
    </BottomTab.Navigator>
  )
}