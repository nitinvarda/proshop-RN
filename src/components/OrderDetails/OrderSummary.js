import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Assets from '../../assets/Theme';

export default function OrderSummary(props) {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
    const {itemsPrice,shippingPrice,taxPrice,totalPrice} = props
    console.log(shippingPrice)
  return (
    <View>
          <Text style={styles(colorScheme).orderHeading}>Order Summary</Text>
          <View>
            <View style={styles(colorScheme).priceItems}>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>items</Text>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{itemsPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>Shipping</Text>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{shippingPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>tax</Text>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{taxPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>total</Text>
              <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{totalPrice}</Text>

            </View>
          </View>
        </View>
  )
}

const styles = (value) =>StyleSheet.create({
    priceItems:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

  orderHeading:{
    paddingBottom:10,
    fontSize:18,
    fontWeight:'bold',
    color:Assets.Colors(value).textPrimary
  },
})