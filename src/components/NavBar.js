
import React from 'react'
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View,Text} from 'react-native-ui-lib'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Assets from '../assets/Theme';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';



export default function NavBar(props) {
    const colorScheme = useSelector((state)=>state.theme.colorScheme)
  return (
    <View style={{backgroundColor:Assets.Colors(colorScheme).secondary,paddingVertical:10}} >
        <StatusBar backgroundColor={Assets.Colors(colorScheme).secondary} barStyle={colorScheme =='dark' ? 'light-content' :'dark-content'} />
        <View centerV row style={{marginHorizontal:20,}}>
            <Ionicons name='arrow-back' color={Assets.Colors(colorScheme).textPrimary} size={28} onPress={props.onPress} />
            <Text style={{fontSize:20,marginLeft:10,color:Assets.Colors(colorScheme).textPrimary}}>{props.screenName}</Text>
        </View>
    </View>
  )
}

NavBar.propTypes = {
  screenName:PropTypes.string,
  onPress:PropTypes.func
}