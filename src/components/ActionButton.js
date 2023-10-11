import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux'

export default function ActionButton(props) {
    const colorScheme = useSelector((state)=>state.AppContext.colorScheme)
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5} style={{
        position:'absolute',
        bottom:10,
        left:20,
        right:20,
        backgroundColor:Assets.Colors(colorScheme).textPrimary,
        padding:15,
        borderRadius:10
        }}>
      <Text style={{textAlign:'center',color:Assets.Colors(colorScheme).primary,fontSize:20}}>Add to Bag</Text>
    </TouchableOpacity>
  )
}