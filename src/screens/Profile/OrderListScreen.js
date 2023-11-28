import { View, Text, ActivityIndicator, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../../components/NavBar';
import { ExpandableSection, ListItem } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BASE_URL } from '../../redux/constants/constants';
export default function OrderListScreen(props) {
  const {navigation} = props
  const {data,loading,error} = useGetAllOrdersQuery();
  const [expandItem,setExpandItem] = useState();

  return loading ?(
    <View style={{flex:1}}>
      <ActivityIndicator size={"large"} />
    </View>
  ): error ? (
  <View>
    <Text>{error.message}</Text>
  </View>
  ) : 
    (<SafeAreaView style={{flex:1}}>
      <NavBar screenName={"All Orders"} onPress={()=>navigation.navigate("Profile",{screen:'ProfileScreen'})} />
      <ScrollView style={{flex:1,paddingBottom:20}}  >
        {data?.map(order=>(
          <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen",{orderId:order._id})} style={{
            padding:10,
            paddingHorizontal:15,
            borderBottomWidth:StyleSheet.hairlineWidth,
            flexDirection:'row',
            alignItems:'center'
            }} >
            <View style={{flex:1}}>
            <Image source={{uri:`${BASE_URL}/api/image/${order.orderItems[0].image}`}} style={{width:60,height:60,borderRadius:10}} />
            </View>
            <View style={{flex:3,flexDirection:'column',paddingHorizontal:10}}>
              <Text>{order._id}</Text>
              <Text>{order.orderItems.length} items</Text>
            </View>
            <View style={{flex:1,flexDirection:'column',alignItems:'flex-end'}}>
              <Text>$ {order.totalPrice}</Text>
              <Text>{order.isPaid ? "Paid" : "Not Paid"}</Text>
            </View>
          </TouchableOpacity>
         
        ))}


      
      {/* {data?.map(order=>(
        <ExpandableSection
        expanded={expandItem==order._id}
        sectionHeader={
          <View style={{
            flexDirection:"row", 
            alignItems:'center',
            }}>

          
          <View 
          style={{
            flex:2,
            flexDirection:'column',
            justifyContent:'space-between',
            padding:15,
            paddingHorizontal:25
            
            }}>
            <View style={{flexDirection:'row',}}>
              <Text>ordered by</Text> 
              <Text style={{fontWeight:'bold'}}> {order.user.name}</Text>
            </View>
            <Text>Placed on {order.createdAt.substring(0,10)}</Text>
           
          </View>
          <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
            <Text>{order.isPaid ? "Paid" : "Not Paid"}</Text>
            <Text>{order.isDelivered ? "Delivered" : "Not Delivered"}</Text>
            <Text>$ {order.totalPrice}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <AntDesign name='down' />
          </View>
          </View>
        }
        onPress={()=>{
          if(expandItem==order._id){
            setExpandItem(null)
          }
          else{
            setExpandItem(order._id)

          }
        }}
        >

          <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen",{orderId:order._id})} style={{paddingHorizontal:25}}>
            <FlatList 
            data={order.orderItems}
            keyExtractor={(item)=>item._id}
            
            
            renderItem={({item})=>(
              <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',justifyContent:'flex-start'}} >
                <View style={{flex:0.5,justifyContent:'flex-start',alignItems:'flex-start'}}>

                  <Image source={{uri:`${BASE_URL}/api/image/${item.image}`}} style={{width:40,height:40,borderRadius:10,objectFit:'contain'}} />
                </View>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
               
                  <Text>{item.name}</Text>
                  
                </View>
                <View style={{flex:0.5}}>
                  <Text>x {item.qty}</Text>
                </View>
                
              </View>
            )}
            />
            
          </TouchableOpacity>


        </ExpandableSection>
      ))} */}
       </ScrollView>


    </SafeAreaView>)
}