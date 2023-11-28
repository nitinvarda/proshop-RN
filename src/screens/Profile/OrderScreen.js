import { View, Text,StyleSheet,Image, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from '../../components/NavBar'
import { useCreateOrderMutation, useGetOrderByIdQuery, usePayOrderMutation,useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { useSelector,useDispatch } from 'react-redux';
import Assets from '../../assets/Theme';
import { BASE_URL } from '../../redux/constants/constants';
import Button from '../../components/Button';
import {generateToken,createPaypalOrder, capturePayment} from '../../utils/paypalApi'
import WebView from 'react-native-webview';
import queryString from 'query-string';
import { clearCartItems } from '../../slices/cartSlice';
import Loading from '../../components/Loading';
import OrderInfo from '../../components/OrderDetails/OrderInfo';
import ShippingAddress from '../../components/OrderDetails/ShippingAddress';
import PaymentMethod from '../../components/OrderDetails/PaymentMethod';
import OrderSummary from '../../components/OrderDetails/OrderSummary';
import Partition from '../../components/Partition';
import IosSafeArea from '../../components/IosSafeArea';
import ErrorModal from '../../components/ErrorModal';

export default function OrderScreen(props) {
  const {navigation,route} = props;
  const orderId = route.params?.orderId

  const {data,isLoading,error:getOrderError,refetch} = useGetOrderByIdQuery(orderId)
  const colorScheme = useSelector(state=>state.theme.colorScheme);
  const userInfo = useSelector(state=>state.auth.userInfo);
  const [orderDetails,setOrderDetails] = useState({});
 
  
  // pay
  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const [createOrder,{isLoading:createOrderLoading,error:createOrderError}] = useCreateOrderMutation();
  const [payOrder,{isLoading:payOrderLoading,error:payOrderError}] = usePayOrderMutation();
  const [deliverOrder,{isLoading:deliverOrderLoading,error:deliverOrderError}] = useDeliverOrderMutation();
  const [accessToken,setAccessToken] = useState();
  const [payPalUrl,setPaypalUrl] = useState(null);
  const WebViewRef = useRef();
  
  
  const [loading,setLoading]= useState(isLoading || createOrderLoading || payOrderLoading || deliverOrderLoading);
  const [error,setError] = useState(getOrderError || payOrderError || createOrderError || deliverOrderError)

  const itemsPrice = data?.orderItems.reduce((acc,item)=> acc+item.price * item.qty,0);
 

  const clearPayPalState = () =>{
    setPaypalUrl(null);
    setAccessToken(null);
  }

  const payWithPaypal = async() =>{
    try {
     
         const address ={
            "address_line_1": data?.shippingAddress?.address,
            "admin_area_2": data?.shippingAddress?.city,
            "postal_code": data?.shippingAddress?.postalCode,
            "admin_area_1":"Illinois",
            "country_code": data?.shippingAddress?.country
        }
       
        const orderParams = {
          cartItems:data?.orderItems,
          totalPrice:data?.totalPrice,
          itemsPrice,
          shippingPrice:data?.shippingPrice,
          taxPrice:data?.taxPrice,address
        }
        
      const token = await generateToken();
      const result = await createPaypalOrder(token,orderParams);
  
      setAccessToken(token);
      setLoading(false)

      if(!!result?.links){
   
        const findUrl = result?.links.find(data=>data.rel == "approve")
  
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
     setError(error.message)
    }
  }

  const paymentSucess = async (id) => {
    try {
        const res = await capturePayment(id, accessToken)
   
   
        await payOrder({orderId,details:res})
        
        Alert.alert("Payment sucessfull","Your order have been placed and paid successfully",[{
          text:'OK',onPress:()=>{
            
            refetch();

            // navigation.navigate("ProfileScreen",{screen:"OrdersScreen",params:"hello"});
          }
        }])
        
    } catch (error) {
        console.log("error raised in payment capture", error)
        setError(error.message)
    }

      
    
  }
  const onUrlChange = (webViewState) =>{
   
    if (webViewState.url.includes('https://example.com/cancel')) {
      clearPayPalState()
      return;
    }
    if (webViewState.url.includes('https://example.com/return')) {
        clearPayPalState();
        const urlValues = queryString.parseUrl(webViewState.url)
        // console.log("my urls value", urlValues)
        const { token } = urlValues.query
        if (!!token) {
            paymentSucess(token)
        }

    }
  }

  const deliverOrderHandler = async() =>{
    try {
      await deliverOrder(orderId);
      refetch();

    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  
  // if(getOrderError){
  //   setError(getOrderError.message)
  // }
  // else if(payOrderError){
  //   setError(payOrderError.message)
  // }
  // else if(createOrderError){
  //   setError(createOrderError.message)
  // }
  // else if(deliverOrderError){
  //   setError(deliverOrderError.message)
  // }

 
  return (
    <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <IosSafeArea />
      <NavBar screenName={"Order"} onPress={()=>navigation.navigate("OrdersScreen")}  />
      <ErrorModal error={error } setError={setError} />
      {loading ? (
        <Loading />
      ) :
      
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,marginHorizontal:20,marginBottom:10}}>
        <View>
          <Text style={styles(colorScheme).orderHeading}>#{data?._id}</Text>
          <ShippingAddress 
            shippingAddress={{
                address:data?.shippingAddress?.address,
                country:data?.shippingAddress?.country,
                postalCode:data?.shippingAddress?.postalCode,
                city:data?.shippingAddress?.city,
                
              }} 
            />
          <View style={{backgroundColor:data?.isDelivered ? "#00b300" : "#ff6666",padding:15,borderRadius:10}}>
              {data?.isDelivered ? 
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Delivered</Text> :
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Not Delivered</Text>
              }
            </View>
          
        </View>
        <Partition />
        <View>
          
            <PaymentMethod paymentMethod={data?.paymentMethod} />
            <View style={{backgroundColor:data?.isPaid ? "#00b300" : "#ff6666",padding:15,borderRadius:10}}>
              {data?.isPaid ? 
              <View>

              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Paid</Text>
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>{new Date(data?.paidAt).toString().substring(0,24)}</Text>
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Reference Id : {data?.paymentResult.id}</Text>
              </View>
                :
              (<Text style={{fontWeight:'bold',color:'white'}}>Not Paid</Text>)
              }
            </View>
        </View>
        <Partition />
        <OrderInfo orderItems={data?.orderItems} />
        <Partition />
        <OrderSummary 
          itemsPrice={itemsPrice} 
          shippingPrice={data?.shippingPrice} 
          taxPrice={data?.taxPrice} 
          totalPrice={data?.totalPrice} />
        
        {!userInfo?.isAdmin  && !data?.isPaid && (

          <View style={{paddingVertical:10}}>
          <Button  title={"Paypal"} onPress={payWithPaypal} />
        </View>
          )}
          {userInfo &&  userInfo.isAdmin  && data.isPaid && !data.isDelivered && (
            <View style={{paddingVertical:10}}>

            <Button  title={"Make as Delivered"} onPress={deliverOrderHandler} />
            </View>
          )}
          <Modal visible={!!payPalUrl}  >
          <TouchableOpacity onPress={clearPayPalState}>
            <Text>Close</Text>
          </TouchableOpacity>
          <View style={{flex:1}}>
              <WebView
              
                source={{uri:payPalUrl}}
                onNavigationStateChange={onUrlChange}
              />
          </View>
    </Modal>

      </ScrollView>
    }
      
    </View>
  )
}


const styles = (value) => StyleSheet.create({
  partition:{
    width:'100%',
    borderWidth:1,
    marginVertical:20,
    borderColor:Assets.Colors(value).textPrimary
  },
  orderHeading:{
    paddingVertical:10,
    fontSize:20,
    fontWeight:'bold',
    color:Assets.Colors(value).textPrimary
  },
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
  itemCard:{
    flexDirection:'row',
    alignItems:'center'
  },
  itemCardDesc:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between'
  },
  priceItems:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
})