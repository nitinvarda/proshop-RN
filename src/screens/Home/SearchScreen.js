import { View, Text,TextInput } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

export default function SearchScreen({navigation}) {

   const [keyword,setKeyword] = useState("");
    
    const searchForProduct = () =>{
        try {
            const {data,isLoading,error} = useGetProductsQuery({keyword})
            console.log({
                isLoading,
                error,
                data
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <SafeAreaView>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            marginHorizontal:20,
            paddingTop:10
        }}>
            <View style={{
                
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Ionicons onPress={()=>navigation.goBack()} name='arrow-back' size={30} />

            </View>
            <View style={{
                flex:1,
                flexDirection:'row',
                alignItems:'center',
                borderWidth:1,
                borderRadius:50,
                paddingHorizontal:10
            }}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>

                    <Ionicons name='search' size={28} />
                </View>

                <TextInput 
                    returnKeyType='done' 
                    onSubmitEditing={searchForProduct} onChangeText={(text)=>setKeyword(text)} placeholder='Search...' style={{flex:1}} />
            </View>
        </View>
      
    </SafeAreaView>
  )
}