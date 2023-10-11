import { View, Text } from 'react-native'
import React from 'react'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'

export default function CartScreen({navigation}) {
  const cartItems = useSelector((state)=>state.Cart)
  return (
    <View style={{flex:1}}>
      <NavBar screenName={'Cart'} onPress={()=>navigation.goBack()} />
      <View style={{marginHorizontal:20}}>
        <Text>CartScreen</Text>

      </View>
    </View>
  )
}