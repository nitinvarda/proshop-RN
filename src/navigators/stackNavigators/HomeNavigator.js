import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ProductScreen from '../../screens/Home/ProductScreen';
import CartScreen from '../../screens/Home/CartScreen';
import ShippingScreen from '../../screens/Home/ShippingScreen';
import PaymentScreen from '../../screens/Home/PaymentScreen';
import PlaceOrderScreen from '../../screens/Home/PlaceOrderScreen';
import SearchScreen from '../../screens/Home/SearchScreen';
import LoginScreen from '../../screens/Login/LoginScreen';
import { useSelector } from 'react-redux';
import ProductListScreen from '../../screens/Home/ProductListScreen';
import UserListScreen from '../../screens/Home/UserListScreen';

const Home = createStackNavigator();

export default function HomeNavigator(props) {
  const userInfo = useSelector((state)=>state.auth.userInfo);
  const authenticated = Object.keys(userInfo).length > 0
  useEffect(()=>{

  },[authenticated])

 
  return (
    <Home.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Product"component={ProductScreen}/>
      <Home.Screen name="Cart" component={CartScreen} />
      <Home.Screen name="Search" component={SearchScreen} />


      {authenticated && userInfo.isAdmin && (
        <>
        <Home.Screen name="ProductList" component={ProductListScreen} />
        <Home.Screen name="UserList" component={UserListScreen} />
        </>
      )}
      {authenticated ? (
        <>
        <Home.Screen name="PlaceOrder" component={PlaceOrderScreen} />
        <Home.Screen name="Shipping" component={ShippingScreen} />
        <Home.Screen name="Payment" component={PaymentScreen} />
        </>

      ) :  <Home.Screen name='Login' component={LoginScreen} />
    
      }


    </Home.Navigator>
  )
}