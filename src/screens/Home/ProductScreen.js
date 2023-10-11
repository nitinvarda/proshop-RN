import { View, Text,Image,Dimensions, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import NavBar from '../../components/NavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../components/ActionButton';
import Assets from '../../assets/Theme';
import {useParams} from 'react-router'
import { useSelector } from 'react-redux';
import {addItem,removeItem} from '../../redux/reducers/CartReducer';
import {useGetProductDetailQuery} from '../../slices/productsApiSlice';
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductScreen(props) {
  const {params} = useRoute();
  console.log(params.id)
  const colorScheme = useSelector((state)=>state.AppContext.colorScheme)
  const {data:item,isLoading,error} = useGetProductDetailQuery(params?.id);

  // const item = props.route?.params?.item;
  
  
  return (
    <SafeAreaView edges={'top'} style={{flex:1}}>
      {/* <StatusBar hidden={true} /> */}
      {isLoading ? (
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator  size={'large'} color={'#333333'}/>
        </View>
      ) : error? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{error?.data?.message}</Text>
        </View>
      ) : (
        <>
        <ScrollView style={{
          backgroundColor:Assets.Colors(colorScheme).primary
        }}>
  
       
        <View style={{position:'absolute',zIndex:1,left:20,top:20}}>
          <Ionicons name='arrow-back' size={30} onPress={()=>props.navigation.goBack()} />
  
        </View>
        <Image 
          source={{uri:`http://10.0.2.2:5001/api/image/${item.image}`}} 
          style={{
            width:'100%',
            objectFit:'contain',
            height:windowHeight/2,
            borderTopRightRadius:10,
            borderTopLeftRadius:10
            }} />
  
            <View style={{paddingHorizontal:20}}>
              <Text style={{fontSize:24,color:Assets.Colors(colorScheme).textPrimary}}>{item.name}</Text>
              <Text style={{fontSize:22,color:Assets.Colors(colorScheme).textPrimary}}>{item.price}</Text>
              <View style={{marginTop:20}}>
  
                <Text style={{
                  fontSize:18,
                  color:Assets.Colors(colorScheme).textPrimary
                }}>{item.description}</Text>
              </View>
            </View>
  
        </ScrollView>
        <ActionButton onPress={()=>addItem(item)} />
        </>
      )}
      
    </SafeAreaView>
  )
}