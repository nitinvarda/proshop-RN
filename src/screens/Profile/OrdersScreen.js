import { View, Text,Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from '../../components/NavBar'
import { BASE_URL } from '../../redux/constants/constants'
import {ExpandableSection} from 'react-native-ui-lib'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Loading from '../../components/Loading'
import Assets from '../../assets/Theme'
import { useSelector } from 'react-redux'
import IosSafeArea from '../../components/IosSafeArea'

export default function OrdersScreen(props) {

  const {navigation} = props;
  const {data,isLoading,error} = useGetOrdersQuery()
  const [expandItem,setExpandItem] = useState(null)
  const colorScheme = useSelector(state=>state.theme.colorScheme);


  return isLoading? <Loading /> : error ? (
      <View>
        <Text>{error.message}</Text>
      </View>
    ) :
    <View style={{flex:1,backgroundColor:Assets.Colors(colorScheme).primary}}>
      <IosSafeArea />
      <NavBar onPress={()=>navigation.navigate("HomeNav",{screen:"Home"})} screenName={'Orders'} />
      <View style={{flex:1}}>
        {data.map((order)=>(

         
            <ExpandableSection
          
            expanded={expandItem==order._id}
            sectionHeader={
              <View 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                backgroundColor:Assets.Colors(colorScheme).secondary,
                paddingVertical:15,
                paddingHorizontal:20
                
                }}>
                <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>{order.orderItems.length} items </Text>
                <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>Placed on {order.createdAt.substring(0,10)}</Text>
                <AntDesign name='down' size={18} color={Assets.Colors(colorScheme).textPrimary} />
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
                  <View style={{backgroundColor:Assets.Colors(colorScheme).secondary,padding:15,flexDirection:'row',}} >
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
                      <Text style={{fontSize:16,color:Assets.Colors(colorScheme).textPrimary}}>{item.name}</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>{item.qty} x</Text>
                        <Text style={{color:Assets.Colors(colorScheme).textPrimary}}> $ {item.price}</Text>
                      </View>
                    </View>
                    
                  </View>
                )}
                />
                <View 
                  style={{
                    backgroundColor:Assets.Colors(colorScheme).secondary,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingHorizontal:20,
                    borderBottomWidth:1,
                    paddingBottom:10,
                    borderColor:Assets.Colors(colorScheme).textPrimary
                    
                    }}>
                  <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>$ {order.totalPrice}</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:Assets.Colors(colorScheme).textPrimary,paddingRight:10}}>Paid</Text>
                
                    <AntDesign name={order.isPaid ? 'check' :'close'} color={order.isPaid ? "#00cc44" : "#ff3300"} size={18} />

                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:Assets.Colors(colorScheme).textPrimary,paddingRight:10}}>Delivered</Text>
                    <AntDesign name={order.isDelivered ? 'check' :'close'} color={order.isDelivered ? "#00cc44" : "#ff3300"} size={18} />
                  </View>
                </View>
                
              </TouchableOpacity>


            </ExpandableSection>
          
          
            
      
          )
          )}

      </View>
    </View> 
}