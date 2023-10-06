import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'



const styles = (props) => StyleSheet.create({
    NavContainer:{
      height:80,
      backgroundColor:'transparent',
      padding:10,
      flexDirection:'row',
      borderRadius:50,
      backgroundColor:'gray',
      position:'absolute',
      bottom:10,
      left:10,
      right:10
    },
    NavElementsContainer:{
      backgroundColor:'gray',
      height:'100%',
      borderRadius:50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
    },
    navElements:{
      backgroundColor:'red',
      flex:1,
      height:'100%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:50
    
    }
  })
export default function TabBar({state,descriptors,navigation}) {
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    return (
      <View>
        
      </View>
        // <View style={styles().NavContainer}>
        //   <Animated.View style={{
        //     position:'absolute',
        //     width:'33.33%',
        //     height:60,
        //     backgroundColor:'red',
        //     margin:10,
        //     zIndex:100,
        //     borderRadius:50,
        //     translateX:fadeAnim
        //     }} />
        //   {state.routes.map((route,index)=>{
        //      const { options } = descriptors[route.key];
        //      const label =
        //        options.tabBarLabel !== undefined
        //          ? options.tabBarLabel
        //          : options.title !== undefined
        //          ? options.title
        //          : route.name;
     
        //      const isFocused = state.index === index;
     
        //      const onPress = () => {
        //        const event = navigation.emit({
        //          type: 'tabPress',
        //          target: route.key,
        //          canPreventDefault: true,
        //        });

        //        Animated.timing(fadeAnim, {
        //         toValue: 125* index+1,
        //         duration: 200,
        //         useNativeDriver: true,
        //       }).start();
     
        //        if (!isFocused && !event.defaultPrevented) {
        //          // The `merge: true` option makes sure that the params inside the tab screen are preserved
        //          navigation.navigate({ name: route.name, merge: true });
        //        }
        //      };
    
            
    
        //     return(
        //       <TouchableOpacity
        //         accessibilityRole="button"
        //         accessibilityState={isFocused ? { selected: true } : {}}
        //         accessibilityLabel={options.tabBarAccessibilityLabel}
        //         testID={options.tabBarTestID}
        //         onPress={onPress}
        //         style={{flex:1,justifyContent:'center',alignItems:'center',borderRadius:50,zIndex:101}}
        //       >
        //         <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        //           {label}
        //         </Text>
        //       </TouchableOpacity>
        //     )
        //   })}
    
        // </View>
      )
}