import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    userInfo:{},
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{ 
            state.userInfo = action.payload.user;
        },
        logout:(state,action)=>{
            state.userInfo = {};
      
        },
        load:(state,action)=>{
            state.userInfo=action.payload
        }
    }
})

export const {setCredentials,logout,load} = authSlice.actions;
export default authSlice.reducer;