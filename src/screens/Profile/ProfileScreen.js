import { View, Text,StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Switch} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux'
import {toggleDarkMode,toggleLightMode} from '../../slices/themeSlice'
import NavBar from '../../components/NavBar'
import Assets from '../../assets/Theme'
import ActionButton from '../../components/ActionButton'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen({navigation}) {
  
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const [switchValue,setSwitchValue] = useState(colorScheme=='light' ? false : true)
  const authenticated = useSelector((state)=>state.auth.authenticated);



  const dispatch = useDispatch();

  useEffect(()=>{

  },[colorScheme])


  const redirectToLoginScreen = ()=>{
    navigation.navigate("Login")
  }

  return (
    <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <View style={{width:'100%',height:Platform.OS=="ios" ? 60 : 0,backgroundColor:Assets.Colors(colorScheme).secondary}}>

      </View>
      <NavBar onPress={()=>navigation.goBack()} screenName={'Profile'} />
      <View style={{marginHorizontal:20,flex:1}}>
        <View style={{flex:1}}>
          {authenticated ? (
            <View style={styles().info}>
              <View style={styles(colorScheme).info_profile}>

              </View>
              <View>

              </View>
            </View>

          ) : (
            <View  style={styles().login}>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")} activeOpacity={0.5} style={styles(colorScheme).login_btn}>
                <Text style={styles(colorScheme).login_btn_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text> {colorScheme=='light' ? 'dark' : 'light'} mode</Text>
         
          <Switch 
            value={colorScheme=='light' ? false : true} 
            onColor={Assets.Colors(colorScheme).textPrimary} 
            offColor={Assets.Colors(colorScheme).textPrimary}
            onValueChange={()=> colorScheme=='light' ? dispatch(toggleDarkMode()) : dispatch(toggleLightMode())}
            thumbColor={colorScheme=='light' ? Assets.Colors(colorScheme).primary : Assets.Colors(colorScheme).textPrimary} 
            
            />

        </View>
        <View style={styles().version}> 
            <Text style={styles(colorScheme).version_text}>version 0.0.1</Text>
        </View>

      </View>
    </View>
  )
}


const styles = (value)=> StyleSheet.create({
  info:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  info_profile:{
    width:120,
    height:120,
    borderRadius:60,
    backgroundColor:Assets.Colors(value).secondary
  },
  info_name:{

  },
  login:{
    marginVertical:80
  },
  login_btn:{
    backgroundColor:Assets.Colors(value).textPrimary,
    paddingVertical:10,
    marginHorizontal:40,
    borderRadius:10
    
  },
  login_btn_text:{
    textAlign:'center',
    color:Assets.Colors(value).primary,
    fontSize:20
  },
  version:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20
  
  },
  version_text:{
    fontSize:18,
    color:Assets.Colors(value).textPrimary
  }
  
})