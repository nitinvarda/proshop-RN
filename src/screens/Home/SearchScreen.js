import { View, Text,TextInput } from 'react-native'
import React from 'react'
import SearchBar from '../../components/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchScreen({navigation}) {
  return (
    <SafeAreaView>
        <View style={{
            flexDirection:'row',
            alignItems:'center'
        }}>

      
        <View style={{
            
            flexDirection:'row',
            alignItems:'center'
        }}>
            <Ionicons onPress={()=>navigation.goBack()} name='arrow-back' size={28} />

        </View>
        <View style={{
            
            flexDirection:'row',
            alignItems:'center'
        }}>
            <Ionicons name='search' size={28} />

            <TextInput placeholder='Search...' />
        </View>
        </View>
      
    </SafeAreaView>
  )
}