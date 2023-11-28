import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../redux/constants/constants';
import Assets from '../../assets/Theme';

export default function OrderInfo({orderItems}) {
    const colorScheme = useSelector(state=>state.theme.colorScheme);
  
  return (
    <View>
        <Text style={styles(colorScheme).orderHeading}>Order Items</Text>
        <View>
        {orderItems?.map(item=>(
            <TouchableOpacity style={styles(colorScheme).itemCard} key={item._id}>
            <Image source={{uri:`${BASE_URL}/api/image/${item.image}`}} style={{width:60,height:60,borderRadius:10,objectFit:'contain'}} />
            <View style={styles(colorScheme).itemCardDesc}>
                
                <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{item.name}</Text>
        
                <Text style={{color:Assets.Colors(colorScheme).textPrimary,fontSize:16}}>{item.qty} X {item.price} = {Number(item.qty) * Number(item.price)}</Text>
            </View>
            </TouchableOpacity>
        ))}
        </View>
        
    </View>
  )
}

const styles = (value) => StyleSheet.create({

  orderHeading:{
    paddingBottom:10,
    fontSize:20,
    fontWeight:'bold',
    color:Assets.Colors(value).textPrimary
  },
    itemCard:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:5
      },
      itemCardDesc:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between'
      },
})