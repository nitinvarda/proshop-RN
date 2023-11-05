import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'



export default function Rating({value}) {
   
  return (
    <View style={styles.mainContainer} >
      {value >= 1 ? <Icon size={20} name='star' /> : value >=0.5 ? <Icon size={20} name='start-half-empty' /> : <Icon size={20} name='star-o' />}
      {value >= 2 ? <Icon size={20} name='star' /> : value >=1.5 ? <Icon size={20} name='start-half-empty' /> : <Icon size={20} name='star-o' />}
      {value >= 3 ? <Icon size={20} name='star' /> : value >=2.5 ? <Icon size={20} name='start-half-empty' /> : <Icon size={20} name='star-o' />}
      {value >= 4 ? <Icon size={20} name='star' /> : value >=3.5 ? <Icon size={20} name='start-half-empty' /> : <Icon size={20} name='star-o' />}
      {value >= 5 ? <Icon size={20} name='star' /> : value >=4.5 ? <Icon size={20} name='start-half-empty' /> : <Icon size={20} name='star-o' />}
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})