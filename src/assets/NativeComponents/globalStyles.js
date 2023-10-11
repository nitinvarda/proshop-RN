import {StyleSheet} from 'react-native';
import Assets from '../Theme';

const globalStyles = (value)=> StyleSheet.create({
    mainView:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor:Assets.Colors(value).secondary,
        // backgroundColor:'red'
    }
})


export default globalStyles;