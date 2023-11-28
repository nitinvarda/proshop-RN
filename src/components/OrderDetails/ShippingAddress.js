import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Assets from '../../assets/Theme'
import { useSelector } from 'react-redux';

export default function ShippingAddress({shippingAddress}) {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
    const userInfo = useSelector(state=>state.auth.userInfo);

    const {address,city,country,postalCode} = shippingAddress;
  return (
    <React.Fragment>
        <Text style={styles(colorScheme).orderHeading}>Shipping Address</Text>
        <View style={styles(colorScheme).shippingValuesContainer}>
        <Text style={styles(colorScheme).shippingValuesHeading}>Name : </Text>
        <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>{userInfo?.name}</Text>
        </View>
        <View style={styles().shippingValuesContainer}>
        <Text style={styles(colorScheme).shippingValuesHeading}>Email : </Text>
        <Text style={{color:Assets.Colors(colorScheme).textPrimary}} >{userInfo?.email}</Text>
        </View>
        <View style={styles().shippingValuesContainer}>
        <Text style={styles(colorScheme).shippingValuesHeading}>Address : </Text>
        <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>
          {address}, {city}, {country}, {postalCode}</Text>
        </View> 
    </React.Fragment>
  )
}

const styles = (value) =>StyleSheet.create({
    shippingContainer:{

    },
    shippingValuesContainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:5
    },
    shippingValuesHeading:{
      fontWeight:'bold',
      color:Assets.Colors(value).textPrimary,
      fontSize:16
    },
    orderHeading:{
      paddingBottom:10,
      fontSize:18,
      fontWeight:'bold',
      color:Assets.Colors(value).textPrimary
    },
})