import { Image,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { BASE_URL } from '../redux/constants/constants'
import Assets from '../assets/Theme'
import {View,Text} from 'react-native-ui-lib'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CartProduct({item,onDelete,onDecreaseCount,onIncreaseCount,onPress}) {
    const colorScheme = useSelector((state)=>state.theme.colorScheme)
  
    const decreaseDisabled = Number(item.qty) <= 1 ;
    const increaseDisabled = Number(item.qty) >=6;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles(colorScheme).container}>
      <View>
        <Image source={{uri:`${BASE_URL}/api/image/${item.image}`}} style={{width:110,height:110,borderRadius:10,objectFit:'contain'}} />
      </View>
      <View style={styles(colorScheme).details_container}>
        <Text style={styles(colorScheme).item_name}>{item.name}</Text>
        <Text flex style={{fontSize:16,color:Assets.Colors(colorScheme).textPrimary}}>${item.price}</Text>
        <View flex row  style={{justifyContent:'space-between',alignItems:'center',}}>
            <View style={{flex:2 ,borderRadius:5}}  row>
                <TouchableOpacity disabled={decreaseDisabled} onPress={onDecreaseCount}   style={[styles(colorScheme,decreaseDisabled).item_count ,{borderTopLeftRadius:5,borderBottomLeftRadius:5}]}>
                    <AntDesign name='minus' size={18} color={Assets.Colors(colorScheme).secondary} />
                </TouchableOpacity>
                <View  flex center style={{backgroundColor:'white'}}>
                    <Text style={{fontSize:16}}>{item.qty}</Text>
                </View>
                <TouchableOpacity disabled={increaseDisabled} onPress={onIncreaseCount}   style={[styles(colorScheme,increaseDisabled).item_count,{borderTopRightRadius:5,borderBottomRightRadius:5}]}>
                    <AntDesign name='plus' size={18} color={Assets.Colors(colorScheme).secondary}/>
                </TouchableOpacity>
               
            </View>
            <View flex style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={onDelete} >

                    <MaterialIcons name='delete-outline' color={'#FF2525'} size={24} />
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

CartProduct.propTypes = {
    item:PropTypes.object,
    onDelete:PropTypes.func,
    onIncreaseCount:PropTypes.func,
    onDecreaseCount:PropTypes.func,
    onPress:PropTypes.func
}

const styles = (value,disabled)=> StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:15,
        // borderWidth:1,
        borderRadius:10,
        backgroundColor:value =='light' ? '#cccccc' : Assets.Colors(value).secondary
      
    
    },
    details_container:{
        flexDirection:'column',
        justifyContent:'space-between',
        flex:1,
        marginLeft:20,
        marginRight:10,
        
    },
    item_name:{
        flex:1.5,
        flexShrink:1,
        fontSize:16,
        color:Assets.Colors(value).textPrimary

    },
    item_count:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Assets.Colors(value).textPrimary,
        opacity:disabled ? 0.5 : 1,
        padding:3
    }
})
