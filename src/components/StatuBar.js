import { View, Text, Platform, StatusBar } from 'react-native'
import React from 'react'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'; 


export default function StatuBar(props) {
  
    const colorScheme = useSelector((state)=>state.theme.colorScheme)

  
    return  Platform.OS=='ios' ? (
        <View style={{width:'100%',height:Platform.OS=="ios" ? 60 : 0,backgroundColor:Assets.Colors(colorScheme).secondary}}>

      </View>
    )
     :<StatusBar 
    backgroundColor={Assets.Colors(colorScheme).secondary} 
    barStyle={colorScheme =='dark' ? 'light-content' :'dark-content'} 
    />
  
}

// StatuBar.propTypes = {
//     platform: PropTypes.string.isRequired,
//   };