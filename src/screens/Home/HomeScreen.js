import { FlatList, TouchableWithoutFeedback,StyleSheet,Dimensions, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button,  Input, Rating, Tile } from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../assets/NativeComponents/globalStyles';
import ProductCard from '../../components/ProductCard';
import { GridList, Spacings,View,Text,Card, Badge } from 'react-native-ui-lib';
import FrontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Assets from '../../assets/Theme';
import {useGetProductsQuery} from '../../slices/productsApiSlice';
import useAuth from '../../hooks/useAuth';
import { load, setCredentials } from '../../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IosSafeArea from '../../components/IosSafeArea';
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}) {
    const input = React.createRef();
    const colorScheme = useSelector((state)=>state.theme.colorScheme)

    const {userInfo} = useSelector((state)=>state.auth);
    const [keyword,setKeyword] = useState("")

    
     

    const {data:products,isLoading,error,refetch} = useGetProductsQuery({keyword});
    

    const cart = useSelector(state=>state.cart);
    


 
    const dispatch = useDispatch();
 

    // const products = data?.products;

    useEffect(()=>{
       
    },[userInfo])


    const renderProducts = ({ item, index }) => {
   
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { id:item._id })}>
            <View>
                <ProductCard product={item} />
            </View>
        </TouchableWithoutFeedback>
    )}

    const renderTopProducts = ({ item, index }) => {
    return <Tile
        imageSrc={{ uri: baseUrl + `/api/image/${item.image}` }}
        title={item.name}
        featured
        titleStyle={styles.tileTitle}
        onPress={() => props.navigation.navigate('Product', { productId: item._id })}
        overlayContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
    />
    }


    const renderItem = ({item})=>{
  
        return (
        <Card flex>
            {/* <Card.Section imageSource={{uri: item.imag}} imageStyle={styles.itemImage}/> */}
            <View padding-s2>
            <Text $textDefault>{item.name}</Text>
            <Text $textDefault>{item.price}</Text>
            {/* {item.inventory.status === 'Out of Stock' && (
                <Text text90M $textDangerLight>
                {item.inventory.status}
                </Text>
            )} */}
            </View>
        </Card>
    )
    }
  
  return (
    <View  style={[globalStyles(colorScheme).mainView,{paddingTop:10}]}>
        <StatusBar backgroundColor={Assets.Colors(colorScheme).secondary} barStyle={colorScheme =='dark' ? 'light-content' :'dark-content'} />
        <IosSafeArea />
        <View row centerV  >
                    <View style={{flex:3}} >
                    <TextInput  
                        onSubmitEditing={()=>refetch()}
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                        placeholder='Search Products...'
                        placeholderTextColor={'#333333'}
                        style={{
                            marginVertical:5,
                            backgroundColor:'#f2f2f2',
                            borderRadius:50,
                            paddingLeft:20,
                            padding:Platform.OS == 'ios' ? 10 : 5,
                            borderWidth: colorScheme=='dark'? 0 : 1,
                            borderColor:Assets.Colors(colorScheme).textPrimary,
                            color:'#333333'

                        }} /> 
                    </View>
                    <View flex  row spread style={{justifyContent:'space-around'}}> 

                        <FrontAwesome onPress={()=>navigation.navigate('Profile',{screen:'ProfileScreen'})} name="user" size={30} color={Assets.Colors(colorScheme).textPrimary} />
                        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
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
                </View>
        {isLoading ? (<ActivityIndicator size={'large'} color={'#333333'} />) : error? (
            <View flex center>
                <Text>{error?.data?.message}</Text>
            </View>
        ) : (

            <FlatList
                numColumns={2}
                data={products}
                showsVerticalScrollIndicator={false}
                renderItem={renderProducts}
                keyExtractor={item => item._id}
            />
        ) }


    </View>
  )
}


const styles = StyleSheet.create({
  rating: {
      marginBottom: 40
  },
  productDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10
  },
  productTitle: {
      marginVertical: 5,
      textAlign: 'left'
  }
})