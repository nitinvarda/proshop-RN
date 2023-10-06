import { View, Text,TextInput } from 'react-native'
import React from 'react'

export default function SearchBar(props) {
  return (
    <View style={{marginVertical:20}}>
      <TextInput placeholder='Search...' />
    </View>
  )
}