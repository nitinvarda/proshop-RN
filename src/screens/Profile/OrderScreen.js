import { View, Text,StyleSheet,Image, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
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

export default function OrderScreen(props) {
  const {navigation,route} = props;
  const orderId = route.params?.orderId
  const {data,isLoading,error,refetch} = useGetOrderByIdQuery(orderId)
  const colorScheme = useSelector(state=>state.theme.colorScheme);
  const userInfo = useSelector(state=>state.auth.userInfo);
  const [orderDetails,setOrderDetails] = useState({});
  const itemsPrice = data?.orderItems.reduce((total,item)=>{
    return total + Number(item.price)
  },0)
  
  // pay
  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  const [createOrder,{isLoading:createOrderLoading,error:createOrderError}] = useCreateOrderMutation();
  const [payOrder,{isLoading:payOrderLoading,error:payOrderError}] = usePayOrderMutation();
  const [deliverOrder,{isLoading:deliverOrderLoading,error:deliverOrderError}] = useDeliverOrderMutation();
  const [accessToken,setAccessToken] = useState();
  const [loading,setLoading]= useState(false);
  const [payPalUrl,setPaypalUrl] = useState(null);

  useEffect(()=>{
    
  },[orderId])

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
        
      const token = await generateToken();
      const result = await createPaypalOrder(token,{cartItems:data?.orderItems,totalPrice:data?.totalPrice,itemsPrice,shippingPrice:data?.shippingPrice,taxPrice:data?.taxPrice,address});
      setAccessToken(token);
      setLoading(false)

      if(!!result?.links){
   
        const findUrl = result?.links.find(data=>data.rel == "approve")

        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log({error})
    }
  }

  const paymentSucess = async (id) => {
    try {
        const res = await capturePayment(id, accessToken)
   
       
        await payOrder({orderId,details:res})
        
        Alert.alert("Payment sucessfull","Your order have been placed and paid successfully",[{
          text:'OK',onPress:()=>{
            dispatch(clearCartItems());
            navigation.navigate("ProfileScreen",{screen:"OrdersScreen",params:"hello"});
          }
        }])
        
    } catch (error) {
        console.log("error raised in payment capture", error)
    }

      
    if (webViewState.url.includes('https://example.com/cancel')) {
      clearPayPalState()
      return;
    }
    if (webViewState.url.includes('https://example.com/return')) {
        const urlValues = queryString.parseUrl(webViewState.url)
        
        const { token } = urlValues.query
        if (!!token) {
            paymentSucess(token)
        }

    }
  }
  const onUrlChange = (webViewState) =>{
   
    if (webViewState.url.includes('https://example.com/cancel')) {
      clearPayPalState()
      return;
    }
    if (webViewState.url.includes('https://example.com/return')) {
        const urlValues = queryString.parseUrl(webViewState.url)
        console.log("my urls value", urlValues)
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
    }
  }


  
  return (
    <SafeAreaView style={{flex:1}}>
      <NavBar screenName={"Order"} onPress={()=>props.navigation.goBack()}  />
      {isLoading ? (
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={"large"} />
        </View>
      ) :
      error? (
        <View>

        </View>
      ) :
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,marginHorizontal:20,marginBottom:10}}>
        <View>
          <Text style={styles(colorScheme).orderHeading}>Shipping</Text>
          <View style={styles(colorScheme).shippingValuesContainer}>
            <Text style={styles(colorScheme).shippingValuesHeading}>Name : </Text>
            <Text>{data?.user?.name}</Text>
          </View>
          <View style={styles().shippingValuesContainer}>
            <Text style={styles(colorScheme).shippingValuesHeading}>Email : </Text>
            <Text>{data?.user?.email}</Text>
          </View>
          <View style={styles().shippingValuesContainer}>
            <Text style={styles(colorScheme).shippingValuesHeading}>Address : </Text>
            <Text>{data?.shippingAddress?.address}, {data?.shippingAddress?.city}, {data?.shippingAddress?.country}, {data?.shippingAddress?.postalCode}</Text>
          </View>
          <View style={{backgroundColor:data?.isDelivered ? "#00b300" : "#ff6666",padding:15,borderRadius:10}}>
              {data?.isDelivered ? 
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Delivered</Text> :
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Not Delivered</Text>
              }
            </View>
          
        </View>
        <View style={styles(colorScheme).partition} />
        <View>
        <Text style={styles(colorScheme).orderHeading}>Payment Method</Text>
        <View style={styles().shippingValuesContainer}>
          <Text style={styles(colorScheme).shippingValuesHeading}>Payment : </Text>
          <Text>{data?.paymentMethod}</Text>
          
        </View>
         
            <View style={{backgroundColor:data?.isPaid ? "#00b300" : "#ff8080",padding:15,borderRadius:10}}>
              {data?.isPaid ? 
              <Text style={{fontWeight:'bold',color:'white',fontSize:16}}>Paid</Text> :
              <Text style={{fontWeight:'bold'}}>Not Paid</Text>
              }
            </View>
          
           
        </View>
        <View style={styles(colorScheme).partition} />
        <View>
          <Text style={styles(colorScheme).orderHeading}>Order Items</Text>
          <View>
            {data?.orderItems?.map(item=>(
              <TouchableOpacity style={styles(colorScheme).itemCard} key={item._id}>
                <Image source={{uri:`${BASE_URL}/api/image/${item.image}`}} style={{width:60,height:60,borderRadius:10,objectFit:'contain'}} />
                <View style={styles(colorScheme).itemCardDesc}>
                 
                    <Text>{item.name}</Text>
            
                  <Text>{item.qty} X {item.price} = {Number(item.qty) * Number(item.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
        </View>
        <View style={styles(colorScheme).partition} />
        <View>
          <Text style={styles(colorScheme).orderHeading}>Order Summary</Text>
          <View>
            <View style={styles(colorScheme).priceItems}>
              <Text>items</Text>
              <Text>{itemsPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text>Shipping</Text>
              <Text>{data?.shippingPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text>tax</Text>
              <Text>{data?.taxPrice}</Text>

            </View>
            <View style={styles(colorScheme).priceItems}>
              <Text>total</Text>
              <Text>{data?.totalPrice}</Text>

            </View>
          </View>
        </View>
        {!userInfo?.isAdmin  && !data?.isPaid && (

          <View style={{paddingVertical:10}}>
          <Button  title={"Paypal"} onPress={()=>payWithPaypal()} />
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
      
    </SafeAreaView>
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
    fontWeight:'bold'
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