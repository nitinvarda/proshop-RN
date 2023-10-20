import { FlatList, TouchableWithoutFeedback,StyleSheet,Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button,  Input, Rating, Tile } from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../assets/NativeComponents/globalStyles';
import ProductCard from '../../components/ProductCard';
import { GridList, Spacings,View,Text,Card } from 'react-native-ui-lib';
import FrontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Assets from '../../assets/Theme';
import {useGetProductsQuery} from '../../slices/productsApiSlice';
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}) {
    const input = React.createRef();
    const colorScheme = useSelector((state)=>state.theme.colorScheme)
    

    const {data:products,isLoading,error} = useGetProductsQuery();
    // const products = data?.products;

    useEffect(()=>{

    },[])


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
        console.log({item})
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
    <SafeAreaView  edges={["top"]} style={globalStyles(colorScheme).mainView}>

        <View row centerV  >
                    <View style={{flex:3}} >
                        <SearchBar />
                    </View>
                    <View flex  row spread style={{justifyContent:'space-around'}}> 

                        <FrontAwesome onPress={()=>navigation.navigate('Profile')} name="user" size={30} color={Assets.Colors(colorScheme).textPrimary} />
                        <Ionicons onPress={()=>navigation.navigate('Cart')} name='cart' size={30} color={Assets.Colors(colorScheme).textPrimary} />
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


    </SafeAreaView>
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