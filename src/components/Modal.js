import { View, Text,StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

export default function Modal({open}) {
    
  return open && (
    <View style={styles().container}>
      <Text>Modal</Text>
    </View>
  )
}

const styles = () =>StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        width:windowWidth,
        height:windowHeight/2,
        backgroundColor:'white'
    }
})