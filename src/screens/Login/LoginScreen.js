import { SafeAreaView,StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native-ui-lib'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Assets from '../../assets/Theme'
import { useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorModal from '../../components/ErrorModal'

export default function LoginScreen(props) {
  const colorScheme = useSelector(state=>state.theme.colorScheme);

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [loginView,setLoginView] = useState(true);
  const [error,setError] = useState("")

  const dispatch = useDispatch();


  const [login]  = useLoginMutation();

  


  const loginUser = async() =>{
    try {
      const res = await login({email,password}).unwrap();
    
      dispatch(setCredentials({user:res}));
    } catch (error) {
    
      setError(error.message);
    }

  }

  const signupUser = async() =>{

  }

  
  return (
    <SafeAreaView style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <NavBar onPress={()=>props.navigation.goBack()} screenName={loginView ? "Login" : "Sign Up"} />
      <ErrorModal error={error} setError={setError} />
      <View flex marginH-20 marginT-40>
        {!loginView && (
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>Name</Text>
            <TextInput style={styles(colorScheme).textfield} value={userName} onChangeText={(text)=>setUserName(text)} />
          </View>
        )}
        <View marginV-15>
          <Text style={styles(colorScheme).formHeader}>Email</Text>
          <TextInput style={styles(colorScheme).textfield} value={email} onChangeText={(text)=>setEmail(text)} />
        </View>
        <View marginV-15>
          <Text style={styles(colorScheme).formHeader}>Password</Text>
          <TextInput style={styles(colorScheme).textfield} secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} />
        </View> 
        <View>
         
          <TouchableOpacity onPress={()=>setLoginView(!loginView)}>
            
            <Text style={styles(colorScheme).links}>create account</Text>
          </TouchableOpacity>
        </View>
        <View marginT-50>
          <Button title={loginView ? 'Login' : 'Sign up'} onPress={loginView ? loginUser : signupUser} />
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