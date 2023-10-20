import { SafeAreaView } from 'react-native'
import React from 'react'
import {View, Text} from 'react-native-ui-lib'
import NavBar from '../../components/NavBar'

export default function LoginScreen(props) {
  return (
    <SafeAreaView>
      <NavBar onPress={()=>props.navigation.navigate("Home")} screenName={"Login"} />
      <View flex>

      </View>
    </SafeAreaView>
  )
}