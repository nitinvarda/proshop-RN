import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { useNavigation } from '@react-navigation/native'
import IosSafeArea from '../../components/IosSafeArea'
import ErrorModal from '../../components/ErrorModal'
import { useSelector } from 'react-redux'

export default function EditProfile() {
    const [error,setError] = useState("")
    const userInfo = useSelector(state=>state.auth.userInfo);
    const navigation = useNavigation()
  return (
    <View style={{flex:1}}>
        <IosSafeArea />
        <NavBar screenName={"Edit Profile"} onPress={()=>navigation.goBack()} />
        <ErrorModal error={error} setError={setError} />
        <View style={{flex:1}}>

            <TextInput value={userInfo.name}  />
        </View>
    </View>
  )
}