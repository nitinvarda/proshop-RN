import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProductScreen from '../../screens/Home/ProductScreen';
import CartScreen from '../../screens/Home/CartScreen';
import ShippingScreen from '../../screens/Home/ShippingScreen';
import PaymentScreen from '../../screens/Home/PaymentScreen';
import PlaceOrderScreen from '../../screens/Home/PlaceOrderScreen';
import SearchScreen from '../../screens/Home/SearchScreen';

const Home = createStackNavigator();

export default function HomeNavigator(props) {
  return (
    <Home.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Product"component={ProductScreen}/>
      <Home.Screen name="Cart" component={CartScreen} />
      <Home.Screen name="Shipping" component={ShippingScreen} />
      <Home.Screen name="Payment" component={PaymentScreen} />
      <Home.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <Home.Screen name="Search" component={SearchScreen} />
    </Home.Navigator>
  )
}