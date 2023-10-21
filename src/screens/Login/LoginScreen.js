import { SafeAreaView,StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {View, Text} from 'react-native-ui-lib'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'
import { useSelector } from 'react-redux'
import Assets from '../../assets/Theme'

export default function LoginScreen(props) {
  const colorScheme = useSelector(state=>state.theme.colorScheme)
  const [login,setLogin] = useState(true)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <NavBar onPress={()=>props.navigation.navigate("Home")} screenName={login ? "Login" : "Sign Up"} />
      <View flex marginH-20 marginT-40>
        {!login && (
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>Name</Text>
            <TextInput style={styles(colorScheme).textfield} />
          </View>
        )}
        <View marginV-15>
          <Text style={styles(colorScheme).formHeader}>Email</Text>
          <TextInput style={styles(colorScheme).textfield} />
        </View>
        <View marginV-15>
          <Text style={styles(colorScheme).formHeader}>Password</Text>
          <TextInput style={styles(colorScheme).textfield} />
        </View> 
        <View>
          <Text style={styles(colorScheme).links}>forgot password?</Text>
          <TouchableOpacity onPress={()=>setLogin(!login)}>
            
            <Text style={styles(colorScheme).links}>create account</Text>
          </TouchableOpacity>
        </View>
        <View marginT-50>
          <Button title={login ? 'Login' : 'Sign up'} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = (value)=> StyleSheet.create({
  textfield:{
    padding:8,
    borderRadius:5,
    backgroundColor:Assets.Colors(value).secondary
  },
  formHeader:{
    fontSize:16,
    marginBottom:10,
    color:Assets.Colors(value).textPrimary
  },
  links:{
    fontSize:16,
    color:Assets.Colors(value).textPrimary
  }
})