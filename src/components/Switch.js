import { View, Text,Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-ui-lib';

export default function Switch(props) {
    const [clicked,setClicked] = useState(false)
    const value = useRef(new Animated.Value(0)).current;
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    useEffect(()=>{},[value])
    const startAnimation = () =>{
        
            Animated.timing(value,{
                toValue:22,
                duration:500,
                useNativeDriver:true
            }).start(()=>setClicked(true))
    }
    const stopAnimation = () =>{
        
        Animated.timing(value,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start(()=>setClicked(false))
        
    }

 
  return (
    <View style={{width:50,backgroundColor:'white',borderRadius:40}}>
        <AnimatedTouchable onPress={clicked  ? stopAnimation :startAnimation} style={{
            width:25,
            height:25,
            borderRadius:50,
            backgroundColor:'black',
            margin:2,
            transform:[{translateX:value}]
            }}>

        </AnimatedTouchable>
    </View>
  )
}