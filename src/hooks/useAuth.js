import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
    const [auth,setAuth] = useState(false);
    const [userInfo,setUserInfo] = useState({})
    useEffect(()=>{
        getFromAsync();
    },[userInfo])

    const getFromAsync  = async()=>{
        try {
            const user = await AsyncStorage.getItem('userInfo');
    
           
            if(user){
                setAuth(true);
                setUserInfo(JSON.parse(user));
            }
        } catch (error) {
            console.log(error)
        }
    }


  return {auth,userInfo}
}