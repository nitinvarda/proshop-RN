// import { View, Text,TouchableOpacity,StyleSheet,createAnimatedComponent, Animated, Easing } from 'react-native'
// import React, { useRef } from 'react'
// import PropTypes from 'prop-types';
// import Assets from '../assets/Theme';
// import { useSelector } from 'react-redux';
// import Entypo from 'react-native-vector-icons/Entypo'
// import Feather from 'react-native-vector-icons/Feather'


// export default function Button(props) {
//     const colorScheme = useSelector((state)=>state.theme.colorScheme)
//     const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
//     const value = useRef(new Animated.Value(-60)).current;
//     const boxValue = useRef(new Animated.Value(-260)).current;
   

//     const opacity = value.interpolate({
//       inputRange:[-50,0,100,200],
//       outputRange:[1,0.75,0.5,0]
//     })
//     const boxOpacity = value.interpolate({
//       inputRange:[-60,0,150,180,200],
//       outputRange:[0,0.25,0.5,1,0]
//     })
//     const boxScale = boxValue.interpolate({
//       inputRange:[-260,-160,-60],
//       outputRange:[3,2,1]
//     })

//     const successTransform = value.interpolate({
//       inputRange:[200,300,400,500],
//       outputRange:[-200,-100,-50,-20]
//     })
//     const successOpacity = value.interpolate({
//       inputRange:[-60,200,400,500],
//       outputRange:[0,0.25,0.5,1]
//     })
//   const onClick = () =>{
//     startAnimation()
//     props.onPress()
//   }

//   const startAnimation = () =>{
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(value,{
//           toValue:200,
//           duration:1000,
//           useNativeDriver:true,
//           easing:Easing.in(),
//         }),
//         Animated.timing(boxValue,{
//           toValue:0,
//           duration:1000,
//           useNativeDriver:true,
//           easing:Easing.in()
//         })
//       ]),
//       Animated.timing(value,{
//         toValue:500,
//         duration:500,
//         useNativeDriver:true,
//         easing:Easing.in()
//       })
//     ]).start(()=>{
//       setTimeout(()=>stopAllAnimation(),2000);
//     });
//   }

//   const stopAllAnimation = () =>{
//     value.setValue(-60);
//     boxValue.setValue(-260);
//   }
//   return (
//     <View  activeOpacity={0.5} onPress={onClick} style={[styles(colorScheme).btn,props.style]}>
//       <Animated.View style={{
//         position:'absolute',
//         alignItems:'center',
//         justifyContent:'center',
//         height:50,
//         transform:[{translateX:value}]

//         }}>
//         <Entypo name='shopping-cart' color={'white'} size={18} />
//       </Animated.View>
//       <Animated.View style={{
//         position:'absolute',
//         left:0,right:0,
//         alignItems:'center',
//         justifyContent:'center',
//         height:50,
      
//         transform:[{translateY:boxValue},{scale:boxScale}],
//         opacity:boxOpacity

//         }}>
//         <Feather name='box' color={'black'} size={20} />
//       </Animated.View>
//       <TouchableOpacity onPress={onClick} activeOpacity={0.5}>
//         <Animated.Text style={[styles(colorScheme).btnText,{opacity:opacity}]}>{props.title}</Animated.Text>

//       </TouchableOpacity>
//       <Animated.View
//       style={{
//         position:'absolute',
//         left:20,
//         height:55,
//         flexDirection:'row',
//         justifyContent:'center',
//         alignItems:'center',
//         width:'110%',
//         transform:[{translateX:successTransform}],
//         opacity:successOpacity,
//         backgroundColor:'green',
//         borderRadius:10
//       }}
//       >
//         <Animated.Text style={{color:'white',fontWeight:'bold',fontSize:16}}>Added Successfully</Animated.Text>
//       </Animated.View>
//     </View>
//   )
// }

// const styles = (value) => StyleSheet.create({
//     btn:{
//         backgroundColor:Assets.Colors(value).textPrimary,
//         padding:15,
//         borderRadius:10,
//         textAlign:'center'
//     },
//     btnText:{
//         color:Assets.Colors(value).primary,
//         textAlign:'center',
//         fontSize:18,
//         fontWeight:'bold'
//     }
// })

// Button.propTypes = {
//     title:PropTypes.string,
//     onPress:PropTypes.func,
//     style:PropTypes.object
// }