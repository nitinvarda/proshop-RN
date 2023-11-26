import { View, Text,Image,Dimensions,  ActivityIndicator, Platform,StyleSheet, TouchableOpacity, TextInput } from 'react-native'
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
import {useGetProductDetailQuery,useCreateReviewMutation} from '../../slices/productsApiSlice';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../redux/constants/constants';
import StatusBar from '../../components/StatuBar';
import Rating from '../../components/Rating';
import { Incubator, PanningProvider, Picker,Dialog } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Dialog from '../../components/Dialog';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import ErrorModal from '../../components/ErrorModal';
import Button from '../../components/Button';
import { color } from 'react-native-elements/dist/helpers';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductScreen(props) {
  const {params} = useRoute();
  const colorScheme = useSelector((state)=>state.theme.colorScheme)
  const userInfo = useSelector((state)=>state.auth.userInfo)
  // const {cartItems,itemsPrice,paymentMethod,shippingAddress,shippingPrice,taxPrice,totalPrice}  = useSelector(state=>state.cart)
  const {
    data:item,
    isLoading,
    error,
    refetch
  } = useGetProductDetailQuery(params?.id);
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("")

  const [openModal,setOpenModal] = useState(false);
  const [openRatingDialog,setOpenRatingDialog] = useState(false)
  const [addedToCart,setAddedToCart] = useState("");
  
  // const item = props.route?.params?.item;

  const [createReview,{isLoading:loadingProductReview,}]  = useCreateReviewMutation()

  

  useEffect(()=>{
    
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
      setAddedToCart("Added To Cart")
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

  const reviewSubmit = async() =>{
    try{
      const review = {
        rating,
        comment,
        productId:item._id
      }
      console.log(review)
      await createReview(review);
      refetch();
    }
    catch(err){
      console.log(err.message)
    }
    // Connected it with smart plug and bulb for controlling with voice commands
   
  }

  const checkIfCommented = () =>{
  
    const commentedAlready = item.reviews.find(review=>review.user == userInfo._id);
    console.log({commentedAlready})
    if(commentedAlready){
      return true;
    }
    else{
      return false
    }
  }

 
 
  return (
    <View style={{flex:1}}>
     
      {isLoading ? (
        <Loading />
      ) : error? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{error?.data?.message}</Text>
        </View>
      ) : (
        <View style={{flex:1}}>
           
          <View style={{position:'absolute',zIndex:10,left:20,top:20}}>
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
                  <View style={{borderWidth:1, width:60, padding:10, borderColor:Assets.Colors(colorScheme).textPrimary,borderRadius:5}}>
                    <TouchableOpacity onPress={()=>setOpenModal(!openModal)} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                      <Text style={{fontWeight:'bold',color:Assets.Colors(colorScheme).textPrimary}}>{qty}</Text>
                      <AntDesign name='down' size={18} color={Assets.Colors(colorScheme).textPrimary} />
                    </TouchableOpacity>
               

                  <Dialog
                    useSafeArea
                    visible={openModal}
                    onDismiss={()=>setOpenModal(!openModal)}
                    containerStyle={{justifyContent:'center',alignItems:'center'}}
                  >
                    <View style={{backgroundColor:'white',height:windowHeight/3,borderRadius:10,width:windowWidth/2}}>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:10,borderBottomWidth:StyleSheet.hairlineWidth}}>

                      <Text style={{fontWeight:'bold',fontSize:20}}>Qty</Text>
                      </View>
                    {[...Array(item.countInStock).keys()].map((item,index)=>(
                <TouchableOpacity 
                key={index}
                style={{paddingVertical:5,borderBottomWidth:StyleSheet.hairlineWidth,justifyContent:'center',alignItems:'center'}}
                 onPress={()=>{
                  setQty(item+1);
                  setOpenModal(false)
                
                }}>
                  
                    <Text style={{fontWeight:'bold',fontSize:14}}>{item+1}</Text>
                </TouchableOpacity>

            ))}
                    </View>

                  </Dialog>
                 
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
              <View style={styles(colorScheme).review_container}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                  <Text style={styles(colorScheme).review_heading}>Reviews</Text>
                  {!checkIfCommented() && (
                  <TouchableOpacity onPress={()=>setOpenRatingDialog(!openRatingDialog)}>

                  <AntDesign name='plus' size={20} color={Assets.Colors(colorScheme).textPrimary} />
                  </TouchableOpacity>
                  )}
                </View>
              {item.reviews.length > 0 ?
              
            
                (<View>
                  {item.reviews.map(review=>(
                  
                      <View style={styles(colorScheme).review_main}>
                          <View style={styles(colorScheme).review_content}>

                            <Text style={{fontSize:18,fontWeight:'bold',color:Assets.Colors(colorScheme).textPrimary}}>{review.name}</Text>
                            <Rating value={review.rating}  />
                            {/* <Text>{review.rating}</Text> */}
                          </View>
                          <View>
                            <Text style={{fontSize:16,color:Assets.Colors(colorScheme).textPrimary}}>{review.comment}</Text>
                          </View>
                      </View>
                  ))}

                </View>) :
                (
                  <View>
                    <Text>No comments yet</Text>
                  </View>
                )
              
              }
              </View>
              

                <View style={{marginHorizontal:20,marginBottom:20}}>  
                    <Dialog onPress={()=>setOpenRatingDialog(!openRatingDialog)}
                    visible={openRatingDialog}
                    containerStyle={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                    >
                    
                      <View style={{
                        backgroundColor:'white',
                        width:windowWidth/1.2,
                        borderRadius:10,
                        flexDirection:'column',
                        justifyContent:'center',
                        }}>
                          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,padding:20}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Write a Review</Text>
                          
                          </View>
                          <View style={{padding:15}}>

                         
                            <View style={{flexDirection:'row',alignItems:'center',borderWidth:1}}>
                              {[...Array(5).keys()].map((item)=>(
                                <TouchableOpacity 
                                  style={{
                                    flex:1,
                                    padding:5,
                                    borderRightWidth:1,
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:rating == item+1 ? Assets.Colors(colorScheme).textPrimary : 'transparent',
                                    
                                  }} 
                                  onPress={()=>setRating(item+1)}>
                                    <Text style={{fontWeight:'bold',color:rating == item+1 ? Assets.Colors(colorScheme).primary : Assets.Colors(colorScheme).textPrimary }}>{item+1}</Text>
                                  </TouchableOpacity>
                              ))}
                              
                            </View>
                            <View style={{paddingVertical:10}}>
                              <TextInput placeholder='enter comment' multiline style={{borderWidth:item+1==5 ? 0: 1,borderRadius:10,height:100,padding:10}} value={comment} onChangeText={(text)=>setComment(text)}/>
                            </View>
                            <Button title='submit review' onPress={reviewSubmit} />
                          </View>

                      </View>
                    </Dialog>
                </View>
              
              
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

const styles = (value) => StyleSheet.create({
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
    fontSize:22,
    fontWeight:'bold',
    paddingBottom:10,
    color:Assets.Colors(value).textPrimary
  },
  review_main:{

  },
  review_content:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})