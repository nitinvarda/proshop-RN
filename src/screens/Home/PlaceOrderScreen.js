import { TouchableOpacity,StyleSheet, Modal, Alert,Button } from 'react-native'
import {View,Text} from 'react-native-ui-lib'
import React, { useState } from 'react'
import StatuBar from '../../components/StatuBar'
import NavBar from '../../components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import Assets from '../../assets/Theme'
// import Button from '../../components/Button'
import { useCreateOrderMutation } from '../../slices/ordersApiSlice'
import { useNavigation } from '@react-navigation/native'


export default function PlaceOrderScreen(props) {
  const colorScheme = useSelector(state=>state.theme.colorScheme);
  const {cartItems,shippingAddress,paymentMethod,shippingPrice,itemsPrice,taxPrice,totalPrice} = useSelector(state=>state.cart)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [createOrder,{isLoading,error}] = useCreateOrderMutation();
 


  const placeOrderHandler = async()=>{
    try {
      const result = await createOrder({
        orderItems:cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice

      }).unwrap();
    
      // navigation.navigate("Profile",{screen:"OrdersScreen"});
    } catch (error) {
      console.log(error)
    }
  }
  


 
  return (
    <View flex >
      <NavBar screenName={'Order'} onPress={()=>navigation.goBack()} />
      <View margin-20>

    
      <View style={styles(colorScheme).total_section}>
                      
        <View  row spread paddingT-5>
          <Text style={styles(colorScheme).total_value_heading} >Subtotal</Text>
          <Text style={styles(colorScheme).total_value}>${itemsPrice}</Text>
        </View>
        
        <View row spread paddingT-5>
          <Text style={styles(colorScheme).total_value_heading}>tax</Text>
          <Text style={styles(colorScheme).total_value}>${taxPrice}</Text>
        </View>
        <View row spread paddingT-5>
          <Text style={styles(colorScheme).total_value_heading}>total</Text>
          <Text style={styles(colorScheme).total_value} >${totalPrice}</Text>
        </View>
      
    </View>
    <Button onPress={placeOrderHandler} title="order" />
    {/* <Button onPress={placeOrderHandler} title={"Place Order"} style={{marginVertical:20}}  /> */}
    </View>     
   
    </View>
  )
}


const styles = (value) => StyleSheet.create({
  empty:{
    padding:5,
    borderBottomWidth:1,
    borderColor:Assets.Colors(value).textPrimary
  },
  empty_message:{
    color:Assets.Colors(value).textPrimary,
    fontSize:30,
    textAlign:'center'
  },
  empty_redirect:{
    color:Assets.Colors(value).textPrimary,
    
  },
  total_section:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:Assets.Colors(value).textPrimary,
    paddingVertical:5
  },
  total_value:{
    fontSize:16,
    fontWeight:'bold',
    color:Assets.Colors(value).textPrimary
  },
  total_value_heading:{
    color:Assets.Colors(value).textPrimary,
    fontWeight:'bold'
  }
})