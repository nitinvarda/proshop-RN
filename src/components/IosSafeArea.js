import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Assets from '../assets/Theme';

export default function IosSafeArea() {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
  return (
    Platform.OS =="ios" && (
        <View style={{zIndex:101,width:'100%',height:45,backgroundColor:Assets.Colors(colorScheme).secondary,paddingBottom:10}}>

      </View>
    )
  )
}