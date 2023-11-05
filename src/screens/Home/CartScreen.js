import { ActivityIndicator, TouchableOpacity,StyleSheet, ScrollView, FlatList } from 'react-native'
import {View,Text} from 'react-native-ui-lib'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartProduct from '../../components/CartProduct'
import Assets from '../../assets/Theme'
import Button from '../../components/Button'

export default function CartScreen({navigation}) {
  const cartItems = useSelector((state)=>state.cart)
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const [items,SetItems] = useState([])
  const [loading,setLoading] = useState(false)
  const [subTotal,setSubTotal] = useState(0)

  useEffect(()=>{
    // deleteAllItems()
    getCartItems();
  
  },[])

  const deleteAllItems = async()=>{
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

  const getCartItems = async()=>{
    try {
      setLoading(true);
      const items = await AsyncStorage.getItem("cartItems");
      
      if(items){
        const cartItems = JSON.parse(items)
        SetItems(cartItems);
        getSubTotal(cartItems);
      }
      
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const getSubTotal = (cartItems) =>{
    const sumCost = (total,item) =>{
      return total + item.price
    }
    const subTotalValue = cartItems.reduce(sumCost,0)
    setSubTotal(subTotalValue)

  }

  const deleteItem = async(id) =>{
      try {
        

          if(items.length > 0){
              const newItems = items.filter(product=>product.id!==id)
              console.log(newItems)
              SetItems(newItems)
              getSubTotal(newItems)
              await AsyncStorage.setItem('cartItems',JSON.stringify(newItems))
          }
      } catch (error) {
          console.log(error);
      }
  }

  const getProductById = (id) =>{
    return items.length > 0 ? items.filter(product=>product.id==id) : {}
  }

  const decreaseCount = (id) =>{
    const product = getProductById(id);
    
    
  }
  const increaseCount = (id) =>{
    const product = getProductById(id);
    console.log(product)
  }

  return (
    <View style={{flex:1}}>
      <NavBar screenName={'Cart'} onPress={()=>navigation.goBack()} />
      <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
        {loading ? (
          <View>
            <ActivityIndicator size={'large'}  />
          </View>
        ) : items.length > 0 ?  (
          <View flex>
              <View style={{flex:1}}>
              <FlatList 
                data={items}
                
              
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1,paddingHorizontal:20}}
      ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
                ListFooterComponent={
                  <>
                  <View style={{borderTopWidth:1,borderBottomWidth:1}}>
                      <View>
                        <View  row spread>
                          <Text>Subtotal</Text>
                          <Text>${subTotal}</Text>
                        </View>
                        
                        <View>
                          <Text>Delivery fee</Text>
                        </View>
                        <View>
                          <Text>total</Text>
                        </View>
                      </View>
                    </View>
                    <Button title={"Proceed to checkout"} style={{marginVertical:20}}  />
                    </>
                }
              
                renderItem={({item,index})=>{
                  return(
                    <View paddingV-10>
                      <CartProduct key={index} item={item} onIncreaseCount={()=>increaseCount(item.id)} onDecreaseCount={()=>decreaseCount(item.id)} onDelete={() => deleteItem(item.id)} />
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
    
  }
})