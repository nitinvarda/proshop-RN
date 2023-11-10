import { Dimensions, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import {View,Text, PanningProvider,Dialog as Dialg} from 'react-native-ui-lib'
import Assets from '../assets/Theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'


const windowHeight = Dimensions.get("screen").height;

export default function Dialog(props) {
    const [open,setOpen] = useState(false);
    const colorScheme = useSelector((state)=>state.theme.colorScheme)
    const dialogRef = useRef(null).current;

    console.log((windowHeight/2 * props.stock/8))


  return (
    <TouchableOpacity style={styles().container} onPress={()=>setOpen(true)}>
        <View flex row >
            <Text>{props.qty}</Text>
        </View>
        <FontAwesome5 size={16} name="chevron-down" color={Assets.Colors(colorScheme).textPrimary} />
        <Dialg
        ref={dialogRef}
        visible={open}
        bottom
        onDismiss={() => setOpen(false)}
        panDirection={Dialg.directions.DOWN}
        containerStyle={{justifyContent:'center',alignItems:'center'}}
        >
        <View style={styles(colorScheme,props.stock).dialogContainer}>
            {/* <View  style={styles().heading} >
                <View center style={{flex:2}}>

                    <Text>qty</Text>
                </View>
                <View flex center>

                    <AntDesign name='close' size={18} />
                </View>
            </View>
            {[...Array(props.stock).keys()].map(item=>(
                <TouchableOpacity style={styles().itemContainer} onPress={()=>{
                    props.changeQty(item+1)
                    setOpen(false)
                }}>
                    <Text>{item+1}</Text>
                </TouchableOpacity>

            ))} */}
           
         

        </View>
        </Dialg>

    </TouchableOpacity>
  )
}

const styles = (color,value) => StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:5,
    },
    heading:{
        borderBottomWidth:1,
        flexDirection:'row',
        padding:10
    },
    dialogContainer:{
        width:'80%',
        backgroundColor:'white',
        height:100,
        borderRadius:10,
    },
    itemContainer:{
        padding:5,
        borderBottomWidth:1
    }
})