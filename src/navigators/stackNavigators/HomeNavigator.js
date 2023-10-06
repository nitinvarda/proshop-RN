import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProductScreen from '../../screens/Home/ProductScreen';
import CartScreen from '../../screens/Home/CartScreen';
import ShippingScreen from '../../screens/Home/ShippingScreen';
import PaymentScreen from '../../screens/Home/PaymentScreen';
import PlaceOrderScreen from '../../screens/Home/PlaceOrderScreen';

const Home = createStackNavigator();

export default function HomeNavigator(props) {
  return (
    <Home.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false}}>
      <Home.Screen name="HomeScreen" component={HomeScreen} />
      <Home.Screen name="ProductScreen"component={ProductScreen}/>
      <Home.Screen name="CartScreen" component={CartScreen} />
      <Home.Screen name="ShippingScreen" component={ShippingScreen} />
      <Home.Screen name="PaymentScreen" component={PaymentScreen} />
      <Home.Screen name="PlaceOrderScreen" component={PlaceOrderScreen} />
    </Home.Navigator>
  )
}