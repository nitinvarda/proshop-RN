import { View, Text,Animated, StatusBar, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'

export default function ErrorModal({error,setError}) {
    const value = useRef(new Animated.Value(-60)).current

    useEffect(()=>{
        console.log({error})
        if(error?.length > 0){

            startAnimation()
        }
    },[error])

    const startAnimation = ()=>{
        Animated.timing(value,{
            toValue:0,
            duration:400,
            easing:Easing.in(),
            useNativeDriver:true,

        }).start(()=>stopAnimation())
    }

    const stopAnimation = () =>{
        Animated.timing(value,{
            toValue:-60,
            duration:400,
            easing:Easing.in(),
            delay:3000,
            useNativeDriver:true
        }).start(()=>setError(''))
    }
  return (
    <View style={{
        position:'absolute',
        width:'100%',
        zIndex:100,
    }}>
    <Animated.View style={{
        
        backgroundColor:'red',
        width:'100%',
        height:50,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        transform:[{translateY:value}]
    }}>
      <Text style={{color:'white',fontSize:18}}>{error}</Text>
    </Animated.View>
    </View>
  )
}