import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function SearchBar(props) {
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Search')} style={{
      marginVertical:10,
      backgroundColor:'#f2f2f2',
      borderRadius:50,
      paddingLeft:20,
      borderWidth: colorScheme=='dark'? 0 : 1,
      borderColor:Assets.Colors(colorScheme).textPrimary
      }}>
      <Text style={{padding:10}}>Search...</Text>
    </TouchableOpacity>
  )
}