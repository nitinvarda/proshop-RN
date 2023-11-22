import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useGetAllProductsQuery } from '../../slices/productsApiSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from '../../components/NavBar'

export default function ProductListScreen(props) {
  const {navigation} = props

  const {data,isLoading,error} = useGetAllProductsQuery()

  
  return isLoading ? (
    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : error? (
    <View>
      <Text>{error.message}</Text>
    </View>
  ) :(
    <SafeAreaView style={{flex:1}}>
      <NavBar screenName={'All Products'} onPress={()=>navigation.goBack()} />
      <FlatList 
      data={data}
      keyExtractor={(product)=>product._id}
      renderItem={({item})=>{
        return(
          <View>
            <Text>{item.name} </Text>
          </View>

        )
      }
      }
      />
    </SafeAreaView>
  )
}