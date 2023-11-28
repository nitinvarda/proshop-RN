import { Platform, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import {Text,View} from 'react-native-ui-lib'
import NavBar from '../../components/NavBar'
import { useDispatch, useSelector } from 'react-redux';
import Assets from '../../assets/Theme';
import ActionButton from '../../components/ActionButton';
import Button from '../../components/Button';
import { saveShippingAddress } from '../../slices/cartSlice';
import IosSafeArea from '../../components/IosSafeArea';
import ErrorModal from '../../components/ErrorModal';

export default function ShippingScreen({navigation}) {
  const colorScheme = useSelector(state=>state.theme.colorScheme);
  const cart = useSelector(state=>state.cart);
  const [address,setAddress] = useState(cart.shippingAddress?.address ?? "");
  const [city,setCity] = useState(cart.shippingAddress?.city ??"");
  const [postalCode,setPostalCode] = useState(cart.shippingAddress?.postalCode ??"");
  const [state,setState] = useState(cart.shippingAddress?.state ?? "")
  const [country,setCountry] = useState(cart.shippingAddress?.country ??"");
  const dispatch = useDispatch();
  const [error,setError] = useState("")


  const shippingAddress = () =>{
    try{
      if(
        address.length > 0 && 
        city.length > 0 && 
        postalCode.length>0 &&
        state.length > 0 &&
        country.length > 0){
          if(country.length < 3){
            dispatch(saveShippingAddress({
              address,
              city,
              postalCode,
              state,
              country
            }))
            navigation.navigate('PlaceOrder')

          }
          else{
            throw new Error("Country value should consist of exactly two letters.")
          }
  
        }
        else{
          throw new Error("Fill all values")
        }
    }
    catch(error){
      setError(error.message)
    }
   
  }
  return (
    <View style={styles(colorScheme).container}>
      <IosSafeArea />
      <NavBar screenName={'Shipping'} onPress={()=>navigation.goBack()} />
      <ErrorModal error={error} setError={setError} />
      <View style={styles().form_container}>
        <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>Address</Text>
            <TextInput style={styles(colorScheme).textfield} value={address} onChangeText={(text)=>setAddress(text)} />
          </View>
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>City</Text>
            <TextInput style={styles(colorScheme).textfield}  value={city} onChangeText={(text)=>setCity(text)} />
          </View> 
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>Postal Code</Text>
            <TextInput style={styles(colorScheme).textfield}  value={postalCode} onChangeText={(text)=>setPostalCode(text)} />
          </View> 
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>State</Text>
            <TextInput style={styles(colorScheme).textfield}  value={state} onChangeText={(text)=>setState(text)} />
          </View> 
          <View marginV-15>
            <Text style={styles(colorScheme).formHeader}>Country</Text>
            <TextInput style={styles(colorScheme).textfield}  value={country} onChangeText={(text)=>setCountry(text)} />
          </View> 
      </View>
      <View margin-20>

        <Button title={'Continue'} onPress={()=>shippingAddress()} />
      </View>
      
    </View>
  )
}


const styles = (value) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Assets.Colors(value).primary
  },
  form_container:{
    flex:1,
    marginHorizontal:20,
    marginTop:40,
  },
  textfield:{
    padding:8,
    borderRadius:5,
    backgroundColor:'#f2f2f2',
  },
  formHeader:{
    fontSize:16,
    marginBottom:10,
    color:Assets.Colors(value).textPrimary
  },
})