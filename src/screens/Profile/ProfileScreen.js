import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Switch } from 'react-native-ui-lib'
import { useDispatch, useSelector } from 'react-redux'
import {toggleDarkMode,toggleLightMode} from '../../redux/reducers/AppContextReducer'
import NavBar from '../../components/NavBar'
import Assets from '../../assets/Theme'

export default function ProfileScreen({navigation}) {
  
  const colorScheme = useSelector((state)=>state.AppContext.colorScheme)
  const [switchValue,setSwitchValue] = useState(colorScheme=='light' ? false : true)

  const dispatch = useDispatch();

  useEffect(()=>{

  },[colorScheme])


  return (
    <View>
      <NavBar onPress={()=>navigation.goBack()} screenName={'Profile'} />
      <View style={{marginHorizontal:20}}>
        <Text> {colorScheme=='light' ? 'dark' : 'light'} mode</Text>
        <Switch value={colorScheme=='light' ? false : true} onColor={Assets.Colors(colorScheme).primary} onValueChange={()=> colorScheme=='light' ? dispatch(toggleDarkMode()) :dispatch(toggleLightMode())} />

      </View>
    </View>
  )
}