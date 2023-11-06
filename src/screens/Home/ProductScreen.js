import { View, Text,Image,Dimensions,  ActivityIndicator,Button, Platform,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../components/ActionButton';
import Assets from '../../assets/Theme';
import {useParams} from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import {addItem,addToCart,loadInitialState} from '../../slices/cartSlice';
import {useGetProductDetailQuery} from '../../slices/productsApiSlice';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../redux/constants/constants';
import StatusBar from '../../components/StatuBar';
import Rating from '../../components/Rating';
import { Incubator, PanningProvider, Picker } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductScreen(props) {
  const {params} = useRoute();
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const cartData  = useSelector(state=>state.cart)
  const {data:item,isLoading,error} = useGetProductDetailQuery(params?.id);
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  
  // const item = props.route?.params?.item;

  console.log({cartData})

  useEffect(()=>{
    loadInitialState(item)
  },[params.id])



  const clearlocal = async()=>{
    try {
        await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

  const addToCartHandler = async()=>{
    try {
      dispatch(addToCart({...item,qty}));
    } catch (error) {
      console.log(error)
    }
  }

  const customModal = (modalProps) =>{
    const {visible, children, toggleModal, onDone} = modalProps;
    return(
      <Incubator.Dialog
      visible={visible}
      onDismiss={() => {
        onDone();
        toggleModal(false);
      }}
      width="100%"
      height="45%"
      bottom
      useSafeArea
      containerStyle={{backgroundColor: Assets.Colors(colorScheme).primary}}
      direction={PanningProvider.Directions.DOWN}
      headerProps={{title: 'Custom modal'}}
    >
      <ScrollView>{children}</ScrollView>
    </Incubator.Dialog>
    )
  }

  

 
  
  return (
    <View style={{flex:1}}>
      
      {isLoading ? (
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator  size={'large'} color={'#333333'}/>
        </View>
      ) : error? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{error?.data?.message}</Text>
        </View>
      ) : (
        <View style={{flex:1}}>
          <View style={{position:'absolute',zIndex:1,left:20,top:20}}>
            <Ionicons name='arrow-back' size={30} onPress={()=>props.navigation.goBack()} />
    
          </View>
           <StatusBar theme={'black'}  />
           <View style={{flex:1}}>

          <ScrollView showsVerticalScrollIndicator={false} style={{
            backgroundColor:Assets.Colors(colorScheme).primary,
            flex:1
          }}>
              <View style={{
                width:windowWidth,
                height:windowHeight/2
              }}>
                <Image 
                  source={{uri:`${BASE_URL}/api/image/${item.image}`}} 
                  style={{
                    width:'100%',
                    objectFit:'cover',
                    height:'100%'
                    }} />

              </View>
              <View style={{paddingHorizontal:20}}>
                <Text style={{fontSize:24,color:Assets.Colors(colorScheme).textPrimary}}>{item.name}</Text>
                <View style={styles().price_qty_container}>

                  <Text style={{fontSize:22,color:Assets.Colors(colorScheme).textPrimary}}>$ {item.price}</Text>
                  <View style={{borderWidth:1, width:60, paddingHorizontal:10, borderColor:Assets.Colors(colorScheme).textPrimary}}>

                  
                  <Picker 
                    label={qty} 
                    value={qty} 
                    onChange={(value)=>setQty(value)} 
                    labelColor={Assets.Colors(colorScheme).textPrimary} 
                    topBarProps={{title: 'Quantity'}}
                    trailingAccessory={<FontAwesome5 name="chevron-down" color={Assets.Colors(colorScheme).textPrimary} />}
                    containerStyle={styles().qtyContainer}
                    labelProps={{fontSize:18}}
                    renderCustomModal={customModal}
                    
                    >
                    {[...Array(3).keys()].map((item,index)=>(
                      <Picker.Item key={index+1} value={item+1} label={item+1} labelStyle={{color:Assets.Colors(colorScheme).textPrimary}} />
                    ))}
                  </Picker>
                  </View>
                </View>
                <View>
                  
                  <Rating value={item.rating} />
                </View>
                <View style={{marginTop:20}}>
    
                  <Text style={{
                    fontSize:18,
                    color:Assets.Colors(colorScheme).textPrimary
                  }}>{item.description}</Text>
                </View>
              </View>
              {item.reviews.length > 0 && <View style={styles(colorScheme).review_container}>
                <Text style={styles(colorScheme).review_heading}>Reviews</Text>
                <View>
                  {item.reviews.map(review=>(
                  
                      <View style={styles(colorScheme).review_main}>
                          <View style={styles(colorScheme).review_content}>

                            <Text>{review.name}</Text>
                            <Text>{review.rating}</Text>
                          </View>
                          <View>
                            <Text>{review.comment}</Text>
                          </View>
                      </View>
                  ))}
                </View>
              </View>
              }
          </ScrollView>
          </View>
          <View style={{flex:0.1,backgroundColor:Assets.Colors(colorScheme).primary}}>
            <ActionButton onPress={addToCartHandler} buttonText={"Add to Cart"} />
          </View>
        
        </View>
      )}
      
    </View>
  )
}

const styles = () => StyleSheet.create({
  price_qty_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:10,
  },
  qtyContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
   
  },
  review_container:{
    paddingHorizontal:20,
    paddingBottom:20,
    paddingTop:20
  },
  review_heading:{
    fontSize:20,
    fontWeight:'bold'
  },
  review_main:{

  },
  review_content:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})