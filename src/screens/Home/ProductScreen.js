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
import {useGetProductDetailQuery,useCreateReviewMutation,useRemoveReviewMutation} from '../../slices/productsApiSlice';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../redux/constants/constants';
import StatusBar from '../../components/StatuBar';
import Rating from '../../components/Rating';
import { Incubator, PanningProvider, Picker,Dialog } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const cart = useSelector((state)=>state.cart)
  // const {cartItems,itemsPrice,paymentMethod,shippingAddress,shippingPrice,taxPrice,totalPrice}  = useSelector(state=>state.cart)
  const {
    data:item,
    isLoading,
    error:getProductsError,
    refetch
  } = useGetProductDetailQuery(params?.id);
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("")

  const [openModal,setOpenModal] = useState(false);
  const [openRatingDialog,setOpenRatingDialog] = useState(false)
  const [addedToCart,setAddedToCart] = useState("");
  const [buttonText,setButtonText] = useState("Add to Cart");
  const [reviewError,setReviewError] = useState("")
  const [error,setError] = useState("")

  // const item = props.route?.params?.item;

  const [createReview,{isLoading:createReviewLoading,error:createReviewError}]  = useCreateReviewMutation()
  const [removeReview,{isLoading:removeReviewLoading,error:removeReviewError}] = useRemoveReviewMutation()

  

  useEffect(()=>{
    
  },[params.id])


  const addToCartHandler = async()=>{
    try {
      dispatch(addToCart({...item,qty}));
      setAddedToCart("Added To Cart")
      setButtonText("Added to Cart");
      setTimeout(()=>{
        setButtonText("Add to Cart")
      },2000)
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
      
      if(rating >0 && comment.length > 0){

        const review = {
          rating,
          comment,
          productId:item._id
        }
        await createReview(review);
        setOpenRatingDialog(false);
        refetch();
      }
      else{
        
        throw new Error("rating or comment cannot be empty")
      }
    }
    catch(err){
      setReviewError(err.message)
    }
    // Connected it with smart plug and bulb for controlling with voice commands
   
  }

  const checkIfCommented = () =>{
  
    const commentedAlready = item.reviews.find(review=>review.user == userInfo._id);
   
    if(commentedAlready){
      return true;
    }
    else{
      return false
    }
  }


  const deleteReview = async() =>{
    try {
      console.log("delete id")
      await removeReview(item._id);
      refetch();
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

 
  return (
    <View edges={'top'}  style={{flex:1}}>
     
      {isLoading ? (
        <Loading />
      ) : error? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>{error?.data?.message}</Text>
        </View>
      ) : (
        <View style={{flex:1}}>
           
          <View style={{
            position:'absolute',
            zIndex:10,
            left:20,
            top:Platform.OS=="ios" ? 70 : 20,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'90%'
            }}>
            <Ionicons name='arrow-back' size={30} onPress={()=>props.navigation.goBack()} />
            <TouchableOpacity onPress={()=>props.navigation.navigate('Cart')}>
                <Ionicons  name='cart' size={30} color={Assets.Colors(colorScheme).textPrimary} />
                <View style={{
                      position:'absolute',
                      top:0,
                      right:0,
                      width:17,height:17,
                      borderRadius:50,
                      flexDirection:'row',
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:Assets.Colors(colorScheme).primary
                  }}>
                      <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>{cart.cartItems.reduce((a,c)=>a+c.qty,0)}</Text>
                  </View>
            </TouchableOpacity>
    
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
                  {item.reviews.map((review,index)=>(
                  
                      <View key={index} style={styles(colorScheme).review_main}>
                          <View style={styles(colorScheme).review_content}>
                            
                            <Text style={{fontSize:18,fontWeight:'bold',color:Assets.Colors(colorScheme).textPrimary}}>{review.name}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>

                              <Rating value={review.rating}  />
                              {userInfo._id===review.user && <TouchableOpacity onPress={deleteReview} style={{paddingLeft:10}}><MaterialCommunityIcons name='delete-outline' color={'red'} size={20} /></TouchableOpacity>}
                            </View>
                            
                          </View>
                          <View>
                            <Text style={{fontSize:16,color:Assets.Colors(colorScheme).textPrimary}}>{review.comment}</Text>
                          </View>
                      </View>
                  ))}

                </View>) :
                (
                  <View>
                    <Text style={{color:Assets.Colors(colorScheme).textPrimary}}>No comments yet</Text>
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
                        backgroundColor:Assets.Colors(colorScheme).secondary
                        }}>
                          <View style={{
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            borderBottomWidth:1,
                            padding:20,
                            borderColor:Assets.Colors(colorScheme).textPrimary
                            }}>
                            <Text style={{fontWeight:'bold',fontSize:18,color:Assets.Colors(colorScheme).textPrimary}}>
                              Write a Review
                              </Text>
                              <ErrorModal error={reviewError} setError={setReviewError} />
                          
                          </View>
                          <View style={{padding:15}}>

                              <View style={{paddingVertical:5}}>

                              <Text style={{color:Assets.Colors(colorScheme).textPrimary}} >Select rating</Text>
                              </View>
                            <View style={{flexDirection:'row',alignItems:'center',borderWidth:1, borderColor:Assets.Colors(colorScheme).textPrimary}}>
                              {[...Array(5).keys()].map((item,index)=>(
                                <TouchableOpacity 
                                key={index}
                                  style={{
                                    flex:1,
                                    padding:5,
                                    borderRightWidth:1,
                                    borderColor:Assets.Colors(colorScheme).textPrimary,
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
                              <TextInput 
                                placeholder='enter comment' 
                                placeholderTextColor={Assets.Colors(colorScheme).textPrimary} 
                                multiline 
                                style={{
                                    borderWidth:1, 
                                    borderColor:Assets.Colors(colorScheme).textPrimary,
                                    borderRadius:10,
                                    height:100,
                                    padding:10,
                                    color:Assets.Colors(colorScheme).textPrimary
                                  }} 
                                value={comment} 
                                onChangeText={(text)=>setComment(text)}/>
                            </View>
                            <Button title='submit review' onPress={reviewSubmit} />
                          </View>

                      </View>
                    </Dialog>
                </View>
              
              
          </ScrollView>
          </View>
          <View style={{flex:0.1,backgroundColor:Assets.Colors(colorScheme).primary}}>
            <ActionButton 
              onPress={addToCartHandler} 
              buttonText={buttonText} 
              buttonStyle={{backgroundColor:buttonText=="Add to Cart" ? Assets.Colors(colorScheme).textPrimary : "#009933"}}
              />
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