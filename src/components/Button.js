import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';
import Assets from '../assets/Theme';
import { useSelector } from 'react-redux';

export default function Button(props) {
    const colorScheme = useSelector((state)=>state.theme.colorScheme)

    

      
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={[styles(colorScheme).btn,props.style]}>
      <Text style={[styles(colorScheme).btnText,props.titleProps]}>{props.title}</Text>
    </TouchableOpacity>
  )

}

const styles = (value) => StyleSheet.create({
    btn:{
        backgroundColor:Assets.Colors(value).textPrimary,
        padding:15,
        borderRadius:10,
        textAlign:'center'
    },
    btnText:{
        color:Assets.Colors(value).primary,
        textAlign:'center',
        fontSize:18
    }
})

Button.propTypes = {
    title:PropTypes.string,
    onPress:PropTypes.func,
    style:PropTypes.object,
    titleProps:PropTypes.object
}