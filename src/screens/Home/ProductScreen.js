import { View, Text,Image,Dimensions,  ActivityIndicator,Button, Platform,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../components/ActionButton';
import Assets from '../../assets/Theme';
import {useParams} from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import {addItem,loadInitialState} from '../../slices/cartSlice';
import {useGetProductDetailQuery} from '../../slices/productsApiSlice';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../redux/constants/constants';
import StatusBar from '../../components/StatuBar';
import Rating from '../../components/Rating';
import { Picker } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductScreen(props) {
  const {params} = useRoute();
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const {data:item,isLoading,error} = useGetProductDetailQuery(params?.id);
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  
  // const item = props.route?.params?.item;

  useEffect(()=>{
    loadInitialState(item)
  },[])

  const clearlocal = async()=>{
    try {
        await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async()=>{
    try {

      const product = {
        id: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        countInStock: item.countInStock,
        qty
      }
      const cartItems = await AsyncStorage.getItem("cartItems");
    

      if(cartItems){
        const parsedCartItems = JSON.parse(cartItems);
        const productPresentInCart = parsedCartItems.filter(cartItem=>cartItem.id === item._id );
        
        console.log({cart:productPresentInCart,parsedCartItems})
        if(productPresentInCart.length > 0){
          const removeFromCart = parsedCartItems.filter(cartItems=>cartItems.id !== item._id);
          
          const updatedItem = {
            ...productPresentInCart[0],
            qty : productPresentInCart[0].qty + 1
          }
          
          await AsyncStorage.setItem("cartItems",JSON.stringify([...removeFromCart,updatedItem]))
        }
        else{
          console.log([...parsedCartItems,product])
          await AsyncStorage.setItem("cartItems",JSON.stringify([...parsedCartItems,product]))

        }
      }
      else{
        // console.log([product])
        // await AsyncStorage.setItem("cartItems",JSON.stringify([product]))
      }
    } catch (error) {
      console.log(error)
    }
  }

 
  
  return (
    <View   style={{flex:1}}>
      
      {isLoading ? (
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator  size={'large'} color={'#333333'}/>
        </View>
      ) : error? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{error?.data?.message}</Text>
        </View>
      ) : (
        <View style={{flex:1}}>
          <View style={{position:'absolute',zIndex:1,left:20,top:20}}>
            <Ionicons name='arrow-back' size={30} onPress={()=>props.navigation.goBack()} />
    
          </View>
           <StatusBar theme={'black'}  />
        <ScrollView style={{
          backgroundColor:Assets.Colors(colorScheme).primary
        }}>
          <View style={{
            width:windowWidth,
            height:windowHeight/2
          }}>
            <Image 
              source={{uri:`${BASE_URL}/api/image/${item.image}`}} 
              style={{
                width:'100%',
                objectFit:'cover',
                height:'100%'
                }} />

          </View>
    
              <View style={{paddingHorizontal:20}}>
                <Text style={{fontSize:24,color:Assets.Colors(colorScheme).textPrimary}}>{item.name}</Text>
                <View style={styles.price_qty_container}>

                  <Text style={{fontSize:22,color:Assets.Colors(colorScheme).textPrimary}}>$ {item.price}</Text>
                  <View style={{borderWidth:1, width:60, paddingHorizontal:10,}}>

                  
                  <Picker 
                    label={qty} 
                    value={qty} 
                    onChange={(value)=>setQty(value)} 
                    labelColor={Assets.Colors(colorScheme).textPrimary} 
                    topBarProps={{title: 'Quantity'}}
                    trailingAccessory={<FontAwesome5 name="chevron-down" />}
                    containerStyle={styles.qtyContainer}
                    labelProps={{fontSize:18}}
                    >
                    {[...Array(3).keys()].map((item,index)=>(
                      <Picker.Item key={index+1} value={item+1} label={item+1} labelStyle={styles.picker_label} />
                    ))}
                  </Picker>
                  </View>
                </View>
                <View>
                  
                  <Rating value={item.rating} />
                </View>
                <View style={{marginTop:20}}>
    
                  <Text style={{
                    fontSize:18,
                    color:Assets.Colors(colorScheme).textPrimary
                  }}>{item.description}</Text>
                </View>
              </View>
    
        </ScrollView>
        <ActionButton onPress={()=>addToCart()} buttonText={"Add to Cart"} />
        </View>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  price_qty_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  qtyContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
   
  },
  picker_label:{

  }
})