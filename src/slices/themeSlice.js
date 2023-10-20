import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native'


const initialState ={
    colorScheme:Appearance.getColorScheme()
}

const theme = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleDarkMode:(state)=>{
            state.colorScheme = 'dark';
        },
        toggleLightMode:(state)=>{
            state.colorScheme = 'light';
        },
    }

})

export const {toggleDarkMode,toggleLightMode} = theme.actions;

export default theme.reducer;