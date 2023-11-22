import { View, Text, ActivityIndicator,Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from '../../components/NavBar'
import { BASE_URL } from '../../redux/constants/constants'
import {ExpandableSection} from 'react-native-ui-lib'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function OrdersScreen(props) {

  const {navigation} = props;
  const {data,isLoading,error} = useGetOrdersQuery()
  const [expandItem,setExpandItem] = useState(null)
  return isLoading? (
    <View style={{flex:1}}>
      <ActivityIndicator size={'large'}  />
    </View>
    ) : error ? (
      <View>
        <Text>{error.message}</Text>
      </View>
    ) :
    <SafeAreaView style={{flex:1}}>
      <NavBar onPress={()=>navigation.goBack()} screenName={'Orders'} />
      <View style={{flex:1,marginHorizontal:20}}>
        {data.map((order)=>(

         
            <ExpandableSection
            expanded={expandItem==order._id}
            sectionHeader={
              <View 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                backgroundColor:'white',
                padding:15,
                
                }}>
                <Text>{order.orderItems.length} items </Text>
                <Text>Placed on {order.createdAt.substring(0,10)}</Text>
                <AntDesign name='down' />
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

              <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen",{orderId:order._id})}>
                <FlatList 
                data={order.orderItems}
                keyExtractor={(item)=>item._id}
                renderItem={({item})=>(
                  <View style={{backgroundColor:'white',padding:15,flexDirection:'row',}} >
                    <Image source={{uri:`${BASE_URL}/api/image/${item.image}`}} style={{width:90,height:90,borderRadius:10,objectFit:'contain'}} />
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{flexDirection:'column',justifyContent:'center',width:'80%'}}>
                        {/* {item.name.length > 18 ? (
                          <>
                          <Text>{item.name.substring(0,18)}</Text>
                          <Text>{item.name.substring(18)}</Text>
                          </>

                        ) : 
                      } */}
                      <Text>{item.name}</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>{item.qty} x</Text>
                        <Text> $ {item.price}</Text>
                      </View>
                    </View>
                    
                  </View>
                )}
                />
                <View 
                  style={{
                    backgroundColor:'white',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingHorizontal:20
                    }}>
                  <Text>$ {order.totalPrice}</Text>
                  <Text>Shipped</Text>
                </View>
                
              </TouchableOpacity>


            </ExpandableSection>
          
          
            
      
          )
          )}

      </View>
    </SafeAreaView> 
}