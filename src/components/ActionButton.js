import { View, Text,TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux'
import Button from './Button'
import PropType from 'prop-types';

export default function ActionButton(props) {
    
  return (
    <View style={{
      position:'absolute',
        bottom:Platform.OS =="ios" ?  50 : 20,
        left:20,
        right:20,
    }}>
      <Button onPress={props.onPress} title={props.buttonText} style={props.buttonStyle}  />
    </View>
  )
}

ActionButton.prototype = {
  onPress:PropType.func,
  buttonText:PropType.string,
  buttonStyle:PropType.object
}