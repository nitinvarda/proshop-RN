import {StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Switch,View,Text} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux'
import {toggleDarkMode,toggleLightMode} from '../../slices/themeSlice'
import NavBar from '../../components/NavBar'
import Assets from '../../assets/Theme'
import ActionButton from '../../components/ActionButton'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLoginMutation, useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const [switchValue,setSwitchValue] = useState(colorScheme=='light' ? false : true)
  const authenticated = useSelector((state)=>state.auth.authenticated);
  const user = useSelector((state)=>state.auth.user);
  const [logoutApi] = useLogoutMutation();



  const dispatch = useDispatch();

  useEffect(()=>{

  },[colorScheme])


  const redirectToLoginScreen = ()=>{
    navigation.navigate("Login")
  }

  const logOutUser =async () =>{
    try {
      // const res = await logoutApi().unwrap();
      // console.log(res);
      dispatch(logout());
      // await AsyncStorage.removeItem('userInfo');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <View style={{width:'100%',height:Platform.OS=="ios" ? 60 : 0,backgroundColor:Assets.Colors(colorScheme).secondary}}>

      </View>
      <NavBar onPress={()=>navigation.goBack()} screenName={'Profile'} />
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {authenticated ? (
            <View style={styles().info}>
              <View style={styles(colorScheme).info_profile}>
                

                  <Text style={{fontSize:40,color:Assets.Colors(colorScheme).textPrimary}}>{user.name?.substring(0,1)}</Text>
               
              </View>
              <View flex style={styles().info_name}>
                <View>
                  <Text style={styles(colorScheme).info_text}>{user.name}</Text>
                
                </View>
                <View >
                  <Text style={styles(colorScheme).info_text}>{user.email}</Text>
                </View>
              </View>
            </View>

          ) : (
            <View  style={styles().login}>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")} activeOpacity={0.5} style={styles(colorScheme).login_btn}>
                <Text style={styles(colorScheme).login_btn_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            {authenticated  && (
              <>
            
            <View style={styles(colorScheme).settings}>
              <TouchableOpacity style={styles().settings_touchable}><Text style={styles(colorScheme).settings_heading}>Edit Profile</Text></TouchableOpacity>
            </View>
            <View style={styles(colorScheme).settings}>
              <TouchableOpacity style={styles().settings_touchable}><Text style={styles(colorScheme).settings_heading}>My Orders</Text></TouchableOpacity>

            </View>
            </>
            )}
            <View style={styles(colorScheme).settings}>
              <Text style={[styles(colorScheme).settings_heading,{paddingVertical:10}]}>Dark mode</Text>
              
              
                <Switch 
                value={colorScheme=='light' ? false : true} 
                onColor={Assets.Colors(colorScheme).secondary} 
                // offColor={Assets.Colors(colorScheme).textPrimary}
                onValueChange={()=> colorScheme=='light' ? dispatch(toggleDarkMode()) : dispatch(toggleLightMode())}
                thumbColor={colorScheme=='light' ? Assets.Colors(colorScheme).primary : Assets.Colors(colorScheme).textPrimary} 
                
                />
              
              
            </View>
            {authenticated  && (

              <View style={styles(colorScheme).settings}>
              <TouchableOpacity style={styles().settings_touchable} onPress={logOutUser}><Text style={styles(colorScheme).settings_heading}>Logout</Text></TouchableOpacity>
            </View>
              )}
          </View>
          

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
    alignItems:'center',
    margin:20
  },
  info_profile:{
    width:120,
    height:120,
    borderRadius:60,
    backgroundColor:Assets.Colors(value).secondary,
    justifyContent:'center',
    alignItems:'center'
  },
  info_name:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  info_text:{
    color:Assets.Colors(value).textPrimary,
    fontSize:18
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
  settings:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    paddingHorizontal:20

  },
  settings_heading:{
    color:Assets.Colors(value).textPrimary,
    fontSize:18
  },
  settings_touchable:{
    paddingVertical:10,
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