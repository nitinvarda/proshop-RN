import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Assets from '../../assets/Theme';

export default function PaymentMethod({paymentMethod}) {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
  return (
    <React.Fragment>
        <Text style={styles(colorScheme).orderHeading}>Payment Method</Text>
        <View style={styles().shippingValuesContainer}>
        <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{paymentMethod}</Text>
        
        </View>
    </React.Fragment>
  )
}

const styles = (value) =>StyleSheet.create({
    orderHeading:{
        paddingBottom:10,
        fontSize:18,
        fontWeight:'bold',
        color:Assets.Colors(value).textPrimary
      },
    shippingContainer:{

    },
    shippingValuesContainer:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:5,
      borderWidth:1,
      borderRadius:10,
      paddingHorizontal:20,
      paddingVertical:10,
      borderColor:Assets.Colors(value).textPrimary
    },
    shippingValuesHeading:{
      fontWeight:'bold',
      color:Assets.Colors(value).textPrimary,
      fontSize:16
    },
})