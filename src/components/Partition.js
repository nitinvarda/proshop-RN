import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux';

export default function Partition() {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
  return ( <View style={styles(colorScheme).partition} />)
}

const styles = (value) => StyleSheet.create({
    partition:{
        width:'100%',
        borderWidth:1,
        marginVertical:20,
        borderColor:Assets.Colors(value).textPrimary
      },
})