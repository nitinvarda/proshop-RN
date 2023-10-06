
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {View,Text} from 'react-native-ui-lib'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NavBar(props) {
  return (
    <SafeAreaView >
        <View>
            <Ionicons name='arrow-back' size={30} />
            <Text>{props.screenName}</Text>
        </View>
    </SafeAreaView>
  )
}