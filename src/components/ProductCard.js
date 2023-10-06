import { View, Text,Dimensions,Image } from 'react-native'
import React from 'react'
import { Card } from 'react-native-ui-lib';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductCard(props) {

  const width = windowWidth * 0.4
  console.log(width);
  return (
    <Card style={{
       width,
      
       backgroundColor:'#D9D9D9',
       margin:10
    }}>
      <Image source={{uri:`http://10.0.2.2:5001/api/image/${props.product.image}`}} style={{width:'100%',objectFit:'contain',height:100,borderTopRightRadius:10,borderTopLeftRadius:10}} />
        <View style={{margin:10}}>

          <Text>{props.product.name}</Text>
        </View>
    </Card>
  )
}