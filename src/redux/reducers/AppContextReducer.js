import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native'


const initialState ={
    colorScheme:Appearance.getColorScheme(),
    authenticated:false,
    user:{},
}

const AppContext = createSlice({
    name:'context',
    initialState,
    reducers:{
        toggleDarkMode:(state)=>{
            state.colorScheme = 'dark';
        },
        toggleLightMode:(state)=>{
            state.colorScheme = 'light';
        },
        changeAuthentication:(state,action)=>{
            state.authenticated = true;
            state.user = action.payload
        }
    }

})

export const {toggleDarkMode,toggleLightMode} = AppContext.actions;

export default AppContext.reducer;