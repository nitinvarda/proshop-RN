import { ActivityIndicator, TouchableOpacity,StyleSheet, ScrollView, FlatList } from 'react-native'
import {View,Text} from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartProduct from '../../components/CartProduct'
import Assets from '../../assets/Theme'
import Button from '../../components/Button'
import useCart from '../../hooks/useCart'
import { loadInitialState } from '../../slices/cartSlice'

export default function CartScreen({navigation}) {
  // const cartItems = useSelector((state)=>state.cart)
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const [loading,setLoading] = useState(false)

  // const {cartItems:items,loading,subTotal,decreaseCount,increaseCount,deleteItem} = useCart();
  const {cartItems,itemsPrice,shippingPrice,taxPrice,totalPrice} = useSelector(state=>state.cart);

  const dispatch = useDispatch();
 

  useEffect(()=>{
    checkAsyncStorage();
  },[])

  const checkAsyncStorage = async() =>{
    try {
      const cart = await AsyncStorage.getItem('cart');
     
      if(cart){
        const cartItems = JSON.parse(cart);
        console.log(cartItems)
        dispatch(loadInitialState(cartItems))

      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAllItems = async()=>{
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

 

  const getProductById = (id) =>{
    return cartItems.length > 0 ? cartItems.filter(product=>product.id==id) : {}
  }

  // const decreaseCount = (id) =>{
  //   const product = getProductById(id);
    
    
  // }
  

  return (
    <View style={{flex:1}}>
      <NavBar screenName={'Cart'} onPress={()=>navigation.goBack()} />
      <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
        {loading ? (
          <View>
            <ActivityIndicator size={'large'}  />
          </View>
        ) : cartItems.length > 0 ?  (
          <View flex>
              <View style={{flex:1}}>
              <FlatList 
                data={cartItems}
                
              
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1,paddingHorizontal:20}}
                ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
                ListFooterComponent={
                  <>
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
                    <Button title={"Proceed to checkout"} style={{marginVertical:20}}  />
                    </>
                }
              
                renderItem={({item,index})=>{
                  return(
                    <View paddingV-10>
                      <CartProduct 
                        key={index} 
                        item={item} 
                        onIncreaseCount={()=>increaseCount(item.id)} 
                        onDecreaseCount={()=>decreaseCount(item.id)} 
                        onDelete={() => deleteItem(item.id)} 
                        onPress={()=>navigation.navigate("Product",{id:item.id})}
                        />
                    </View>
                  )
                }}
                />
              </View>
              <View style={{marginHorizontal:20}}>
  
              </View>
          </View>
          
          
        ) : (
            <View flex center >
              <Text style={styles(colorScheme).empty_message}>Your Shopping Cart is Empty</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles().empty}><Text style={styles(colorScheme).empty_redirect}>Browse Products</Text></TouchableOpacity>
            </View>
          )}

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