import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/Login/LoginScreen';

const Login = createStackNavigator();

export default function LoginNavigator(props) {
  return (
    <Login.Navigator>
     <Login.Screen name='LoginScreen' component={LoginScreen} />
    </Login.Navigator>
  )
}