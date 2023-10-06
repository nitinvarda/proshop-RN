import { FlatList, TouchableWithoutFeedback,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { Button,  Input, Rating, Tile } from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../assets/NativeComponents/globalStyles';
import ProductCard from '../../components/ProductCard';
import { GridList, Spacings,View,Text,Card } from 'react-native-ui-lib';
import FrontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen({navigation}) {
  const input = React.createRef();
  const baseUrl = "http://localhost:5001/";

  const products = [
    {
      "_id": "5fc670b118f34e0b203becfb",
      "rating": 0,
      "numReviews": 0,
      "price": 929.99,
      "countInStock": 5,
      "name": "Cannon EOS 80D DSLR Camera",
      "user": "5fc65a04c7d42e3ce8a66565",
      "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
      "brand": "Cannon",
      "category": "Electronics",
      "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
      "reviews": [],
      "createdAt": "2020-12-01T16:34:57.305Z",
      "updatedAt": "2020-12-01T16:34:57.305Z",
      "__v": 0
    },
    {
      "_id": "5fc66f1a26710e39b43ccd92",
      "rating": 4,
      "numReviews": 1,
      "price": 89.99,
      "countInStock": 10,
      "name": "Airpods Wireless Bluetooth Headphones",
      "user": "5fc65a04c7d42e3ce8a66565",
      "image": "8878cc214fc6ccc594723448336e0b86.jpg",
      "brand": "Apple",
      "category": "Electronics",
      "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      "reviews": [],
      "createdAt": "2020-12-01T16:28:10.350Z",
      "updatedAt": "2020-12-01T19:15:43.345Z",
      "__v": 9
    },
    {
        "_id": "5fc66f1a26710e39b43ccd92",
        "rating": 4,
        "numReviews": 1,
        "price": 89.99,
        "countInStock": 10,
        "name": "Airpods Wireless Bluetooth Headphones",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "8878cc214fc6ccc594723448336e0b86.jpg",
        "brand": "Apple",
        "category": "Electronics",
        "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        "reviews": [],
        "createdAt": "2020-12-01T16:28:10.350Z",
        "updatedAt": "2020-12-01T19:15:43.345Z",
        "__v": 9
    },
    {
        "_id": "5fc66f1a26710e39b43ccd92",
        "rating": 4,
        "numReviews": 1,
        "price": 89.99,
        "countInStock": 10,
        "name": "Airpods Wireless Bluetooth Headphones",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "8878cc214fc6ccc594723448336e0b86.jpg",
        "brand": "Apple",
        "category": "Electronics",
        "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        "reviews": [],
        "createdAt": "2020-12-01T16:28:10.350Z",
        "updatedAt": "2020-12-01T19:15:43.345Z",
        "__v": 9
    },
    {
        "_id": "5fc670b118f34e0b203becfb",
        "rating": 0,
        "numReviews": 0,
        "price": 929.99,
        "countInStock": 5,
        "name": "Cannon EOS 80D DSLR Camera",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
        "brand": "Cannon",
        "category": "Electronics",
        "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        "reviews": [],
        "createdAt": "2020-12-01T16:34:57.305Z",
        "updatedAt": "2020-12-01T16:34:57.305Z",
        "__v": 0
    },
    {
        "_id": "5fc670b118f34e0b203becfb",
        "rating": 0,
        "numReviews": 0,
        "price": 929.99,
        "countInStock": 5,
        "name": "Cannon EOS 80D DSLR Camera",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
        "brand": "Cannon",
        "category": "Electronics",
        "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        "reviews": [],
        "createdAt": "2020-12-01T16:34:57.305Z",
        "updatedAt": "2020-12-01T16:34:57.305Z",
        "__v": 0
    },
    {
      "_id": "5fc670b118f34e0b203becfb",
      "rating": 0,
      "numReviews": 0,
      "price": 929.99,
      "countInStock": 5,
      "name": "Cannon EOS 80D DSLR Camera",
      "user": "5fc65a04c7d42e3ce8a66565",
      "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
      "brand": "Cannon",
      "category": "Electronics",
      "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
      "reviews": [],
      "createdAt": "2020-12-01T16:34:57.305Z",
      "updatedAt": "2020-12-01T16:34:57.305Z",
      "__v": 0
    },
    {
      "_id": "5fc66f1a26710e39b43ccd92",
      "rating": 4,
      "numReviews": 1,
      "price": 89.99,
      "countInStock": 10,
      "name": "Airpods Wireless Bluetooth Headphones",
      "user": "5fc65a04c7d42e3ce8a66565",
      "image": "8878cc214fc6ccc594723448336e0b86.jpg",
      "brand": "Apple",
      "category": "Electronics",
      "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      "reviews": [],
      "createdAt": "2020-12-01T16:28:10.350Z",
      "updatedAt": "2020-12-01T19:15:43.345Z",
      "__v": 9
    },
    {
        "_id": "5fc66f1a26710e39b43ccd92",
        "rating": 4,
        "numReviews": 1,
        "price": 89.99,
        "countInStock": 10,
        "name": "Airpods Wireless Bluetooth Headphones",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "8878cc214fc6ccc594723448336e0b86.jpg",
        "brand": "Apple",
        "category": "Electronics",
        "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        "reviews": [],
        "createdAt": "2020-12-01T16:28:10.350Z",
        "updatedAt": "2020-12-01T19:15:43.345Z",
        "__v": 9
    },
    {
        "_id": "5fc66f1a26710e39b43ccd92",
        "rating": 4,
        "numReviews": 1,
        "price": 89.99,
        "countInStock": 10,
        "name": "Airpods Wireless Bluetooth Headphones",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "8878cc214fc6ccc594723448336e0b86.jpg",
        "brand": "Apple",
        "category": "Electronics",
        "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        "reviews": [],
        "createdAt": "2020-12-01T16:28:10.350Z",
        "updatedAt": "2020-12-01T19:15:43.345Z",
        "__v": 9
    },
    {
        "_id": "5fc670b118f34e0b203becfb",
        "rating": 0,
        "numReviews": 0,
        "price": 929.99,
        "countInStock": 5,
        "name": "Cannon EOS 80D DSLR Camera",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
        "brand": "Cannon",
        "category": "Electronics",
        "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        "reviews": [],
        "createdAt": "2020-12-01T16:34:57.305Z",
        "updatedAt": "2020-12-01T16:34:57.305Z",
        "__v": 0
    },
    {
        "_id": "5fc670b118f34e0b203becfb",
        "rating": 0,
        "numReviews": 0,
        "price": 929.99,
        "countInStock": 5,
        "name": "Cannon EOS 80D DSLR Camera",
        "user": "5fc65a04c7d42e3ce8a66565",
        "image": "ecb550424a02c519f8869c792b1c7ac4.jpg",
        "brand": "Cannon",
        "category": "Electronics",
        "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        "reviews": [],
        "createdAt": "2020-12-01T16:34:57.305Z",
        "updatedAt": "2020-12-01T16:34:57.305Z",
        "__v": 0
    },
  ];
  const topRatedProducts = [];
  const keyword = "";
  const pages = 2;
  const page = 1;


  const renderProducts = ({ item, index }) => {
    console.log(item.name);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { productId: item._id })}>
                <View>
                    <ProductCard product={item} />
                    {/* <Card containerStyle={{ borderRadius: 20 }} >

                        <Card.Image containerStyle={{ borderRadius: 10 }} source={{ uri: baseUrl + `/api/image/${item.image}` }} variant="top" />

                        <View>

                            <Card.Title style={styles.productTitle} >{item.name}</Card.Title>

                            <View style={styles.productDetails}>
                                <Text >
                                     <Rating value={item.rating} text={`${item.numReviews} reviews`} /> 
                                    <Rating imageSize={15} readonly startingValue={item.rating} style={styles.rating} ratingCount={5} />

                                </Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    $ {item.price}

                                </Text>
                            </View>
                        </View>
                    </Card> */}
                </View>
            </TouchableWithoutFeedback>

        </>
    )

    }

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
    <SafeAreaView mode='margin' edges={["top"]} style={globalStyles.mainView}>


    

    

    <FlatList
        // ListHeaderComponent={
        //     <>
        //         <Input
        //             // containerStyle={{ margin: 20 }}
        //             ref={input}
        //             placeholder="Search"
        //             leftIcon={{ type: 'font-awesome', name: 'search' }}
        //             rightIcon={{ type: 'font-awesome', name: 'times', onPress: () => { input.current.clear(); props.navigation.navigate('Home', { keyword: '' }) } }}
        //             leftIconContainerStyle={{ marginRight: 15 }}
        //             inputContainerStyle={{ marginHorizontal: 20 }}
        //             onChangeText={text => props.navigation.navigate('Home', { keyword: text })}

        //         />

        //         {!keyword ?
        //             <FlatList showsHorizontalScrollIndicator={false} horizontal data={topRatedProducts} renderItem={renderTopProducts} keyExtractor={item => item._id} /> :
        //             (<View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20 }}>
        //                 <Button buttonStyle={{ backgroundColor: '#282c34' }} title='Go Back' onPress={() => props.navigation.navigate('Home', { keyword: '' })} />
        //             </View>)
        //         }

        //     </>
        // }
    
        numColumns={2}
        ListHeaderComponent={
            <View flex row centerV spread>
                <View flex>

                <SearchBar />
                </View>
            <FrontAwesome onPress={()=>navigation.navigate('Profile')} name="user" size={30} color={'black'} />
            <Ionicons onPress={()=>navigation.navigate('Cart')} name='cart' size={30} color={'black'} />
            </View>
        }
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={renderProducts}
        keyExtractor={item => item._id}
        // ListFooterComponent={
        //     <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'flex-start' }}>
        //         {[...Array(pages).keys()].map(pageNum => (
        //             <>
        //                 {console.log(page, pageNum)}
        //                 {page == pageNum + 1 ?
        //                     <Button
        //                         onPress={() => props.navigation.navigate('Home', { pageNumber: Number(pageNum + 1) })}
        //                         title={pageNum + 1}
        //                         buttonStyle={{ backgroundColor: '#282c34' }}
        //                         titleStyle={{ color: 'white', padding: 10 }}
        //                     /> :
        //                     <Button
        //                         onPress={() => props.navigation.navigate('Home', { pageNumber: Number(pageNum + 1) })}
        //                         title={pageNum + 1}
        //                         buttonStyle={{ backgroundColor: 'white' }}
        //                         titleStyle={{ color: '#282c34', padding: 10 }}

        //                     />}
        //             </>

        //         )
        //         )}

        //     </View>

        // }


    />


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