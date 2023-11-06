import { Dimensions,Image,StyleSheet } from 'react-native'
import React from 'react'
import { Card,View, Text, } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import Assets from '../assets/Theme';
import { BASE_URL } from '../redux/constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductCard(props) {
  const colorScheme = useSelector((state)=>state.theme.colorScheme);
  const width = windowWidth * 0.4;
  return (
    <Card 
    style={{
       width,
       backgroundColor:Assets.Colors(colorScheme).primary,
       margin:10
    }}>
      <Image source={{uri:`${BASE_URL}/api/image/${props.product.image}`}} style={{width:'100%',objectFit:'contain',height:120,borderTopRightRadius:10,borderTopLeftRadius:10,objectFit:'cover'}} />
        <View style={{margin:10}}>
          <View>
          <Text style={styles(colorScheme).textColor}>{props.product.name.length > 30 ? props.product.name.substring(0,30) + "..." : props.product.name}</Text>

          </View>
          <View flex row spread paddingT-10>
            <Text style={styles(colorScheme).textColor}>${props.product.price}</Text>
            <Text style={styles(colorScheme).textColor}>{props.product.rating} <Icon name='star' color={Assets.Colors(colorScheme).textPrimary} /></Text>

          </View>

        </View>
    </Card>
  )
}


const styles = (value) =>StyleSheet.create({
  textColor:{
    color:Assets.Colors(value).textPrimary
  }
})