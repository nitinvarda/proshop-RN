import { TouchableOpacity,StyleSheet, Modal, Alert, ScrollView } from 'react-native'
import {View,Text} from 'react-native-ui-lib'
import React, { useState } from 'react'
import StatuBar from '../../components/StatuBar'
import NavBar from '../../components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import Assets from '../../assets/Theme'
import Button from '../../components/Button'
import { useCreateOrderMutation } from '../../slices/ordersApiSlice'
import { useNavigation } from '@react-navigation/native'
import { clearCartItems } from '../../slices/cartSlice'
import IosSafeArea from '../../components/IosSafeArea'
import ShippingAddress from '../../components/OrderDetails/ShippingAddress'
import OrderInfo from '../../components/OrderDetails/OrderInfo'
import OrderSummary from '../../components/OrderDetails/OrderSummary'
import Partition from '../../components/Partition'
import PaymentMethod from '../../components/OrderDetails/PaymentMethod'
import ErrorModal from '../../components/ErrorModal'
import { logout } from '../../slices/authSlice'



export default function PlaceOrderScreen(props) {
  const colorScheme = useSelector(state=>state.theme.colorScheme);
  const {cartItems,shippingAddress,paymentMethod,shippingPrice,itemsPrice,taxPrice,totalPrice} = useSelector(state=>state.cart)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [createOrder,{isLoading,error:createOrderError,isError},] = useCreateOrderMutation();
 
  const [error,setError] = useState("");

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
      dispatch(clearCartItems());
     
      navigation.navigate("Profile",{screen:"OrderScreen",params :{orderId:result._id}});
    } catch (err) {
      
      if(err.data?.message =="Not authorized, no token"){
        setError(err.data?.message);
        setTimeout(()=>{
          dispatch(logout());
          navigation.navigate("Profile",{screen:'Login'});
        },2000)
        
      }

    }
  }

 
  


 
  return (
    <View flex >
      <IosSafeArea />
      <NavBar screenName={'Place Order'} onPress={()=>navigation.goBack()} />
      
      <ErrorModal error={error} setError={setError} />
      <View style={{zIndex:99,position:'relative',flex:1,paddingHorizontal:20,backgroundColor:Assets.Colors(colorScheme).primary}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,marginTop:10}}>

        
          <ShippingAddress shippingAddress={shippingAddress}/>
          <Partition />
          <OrderInfo orderItems={cartItems} />
          <Partition />
          <PaymentMethod paymentMethod={paymentMethod}  />
          <Partition />
          <OrderSummary shippingPrice={shippingPrice} itemsPrice={itemsPrice}  taxPrice={taxPrice} totalPrice={totalPrice} />
        </ScrollView>
        <View >

          <Button onPress={placeOrderHandler} title={"Place Order"} style={{marginVertical:20}}  />
        </View>    
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