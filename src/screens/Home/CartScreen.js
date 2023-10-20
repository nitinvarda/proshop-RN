import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CartScreen({navigation}) {
  const cartItems = useSelector((state)=>state.cart)
  const [items,SetItems] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    getCartItems()
  },[])

  const getCartItems = async()=>{
    try {
      setLoading(true);
      const items = await AsyncStorage.getItem("cartItems");
      if(items){
        SetItems(JSON.parse(items));
      }

      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <View style={{flex:1}}>
      <NavBar screenName={'Cart'} onPress={()=>navigation.goBack()} />
      <View style={{marginHorizontal:20}}>
        <Text>CartScreen</Text>
        {loading ? (
          <View>
            <ActivityIndicator size={'large'}  />
          </View>
        ) : (
          <View>
            {items.map(item=>{
              return(
                <View>
                  <Text>{item.name}</Text>
                </View>
              )
            })}
          </View>
        )}

      </View>
    </View>
  )
}