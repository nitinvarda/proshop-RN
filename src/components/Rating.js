import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Assets from '../assets/Theme'
import { useSelector } from 'react-redux';



export default function Rating({value}) {
  const colorScheme = useSelector((state)=>state.theme.colorScheme);
   
  return (
    <View style={styles.mainContainer} >
      {value >= 1 ? <Icon size={20} name='star' color={Assets.Colors(colorScheme).textPrimary} /> : value >=0.5 ? <Icon size={20} name='start-half-empty' color={Assets.Colors(colorScheme).textPrimary} /> : <Icon size={20} name='star-o' color={Assets.Colors(colorScheme).textPrimary} />}
      {value >= 2 ? <Icon size={20} name='star' color={Assets.Colors(colorScheme).textPrimary} /> : value >=1.5 ? <Icon size={20} name='start-half-empty' color={Assets.Colors(colorScheme).textPrimary} /> : <Icon size={20} name='star-o' color={Assets.Colors(colorScheme).textPrimary} />}
      {value >= 3 ? <Icon size={20} name='star' color={Assets.Colors(colorScheme).textPrimary} /> : value >=2.5 ? <Icon size={20} name='start-half-empty' color={Assets.Colors(colorScheme).textPrimary} /> : <Icon size={20} name='star-o' color={Assets.Colors(colorScheme).textPrimary} />}
      {value >= 4 ? <Icon size={20} name='star' color={Assets.Colors(colorScheme).textPrimary} /> : value >=3.5 ? <Icon size={20} name='start-half-empty' color={Assets.Colors(colorScheme).textPrimary} /> : <Icon size={20} name='star-o' color={Assets.Colors(colorScheme).textPrimary} />}
      {value >= 5 ? <Icon size={20} name='star' color={Assets.Colors(colorScheme).textPrimary} /> : value >=4.5 ? <Icon size={20} name='start-half-empty' color={Assets.Colors(colorScheme).textPrimary} /> : <Icon size={20} name='star-o' color={Assets.Colors(colorScheme).textPrimary} />}
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    
})