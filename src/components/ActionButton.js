import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux'
import Button from './Button'

export default function ActionButton(props) {
    
  return (
    <View style={{
      position:'absolute',
        bottom:10,
        left:20,
        right:20,
    }}>
      <Button onPress={props.onPress} title={props.buttonText}  />
    </View>
  )
}