import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import OrderScreen from '../../screens/Profile/OrderScreen';
import OrderListScreen from '../../screens/Profile/OrderListScreen';
import UsersScreen from '../../screens/Profile/UsersScreen';
import ProductsScreen from '../../screens/Profile/ProductsScreen';
import OrdersScreen from '../../screens/Profile/OrdersScreen';
import LoginNavigator from './LoginNavigator';
import { useSelector } from 'react-redux';

const Profile = createStackNavigator();

export default function ProfileNavigator(props) {
  const authenticated = useSelector(state=>state.auth.authenticated)
  return (
    <Profile.Navigator initialRouteName='ProfileScreen'  screenOptions={{
      headerShown:false,
      
    }}>
      <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
      {
        authenticated ? (
          <>
            <Profile.Screen name="OrderScreen" component={OrderScreen} />
            <Profile.Screen name="OrderListScreen" component={OrderListScreen}/>
            <Profile.Screen name="UsersScreen" component={UsersScreen} />
            <Profile.Screen name="ProductsScreen" component={ProductsScreen} />
            <Profile.Screen name="OrdersScreen" component={OrdersScreen} />
          </>
        ) : (
          <Profile.Screen name="LoginNavigator" component={LoginNavigator} />
        )
      }
    </Profile.Navigator>
  )
}