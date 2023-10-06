import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Switch } from 'react-native-ui-lib'
import { useDispatch, useSelector } from 'react-redux'
import {toggleDarkMode,toggleLightMode} from '../../redux/reducers/AppContextReducer'

export default function ProfileScreen(props) {
  
  const colorScheme = useSelector((state)=>state.AppContext.colorScheme)
  const [switchValue,setSwitchValue] = useState(colorScheme=='light' ? false : true)

  const dispatch = useDispatch();

  useEffect(()=>{

  },[colorScheme])


  return (
    <View>
      <Text>ProfileScreen</Text>
      <View>
        <Text> {colorScheme=='light' ? 'dark' : 'light'} mode</Text>
        <Switch value={colorScheme=='light' ? false : true} onValueChange={()=> colorScheme=='light' ? dispatch(toggleDarkMode()) :dispatch(toggleLightMode())} />

      </View>
    </View>
  )
}