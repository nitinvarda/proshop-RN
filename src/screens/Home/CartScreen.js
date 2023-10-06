import { View, Text } from 'react-native'
import React from 'react'
import NavBar from '../../components/NavBar'

export default function CartScreen(props) {
  return (
    <View>
      <NavBar screenName={'Cart'} />
      <Text>CartScreen</Text>
    </View>
  )
}