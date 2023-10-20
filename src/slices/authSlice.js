import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    authenticated:false,
    user:{},
    token:""
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authenticate:(state,action)=>{
            state ={
                authenticated:true,
                user:action.payload.user,
                token:action.payload.token
            }
        },
        logout:(state,action)=>{
            state.cartItems = action.cartItems;
        }
    }
})

export const {authenticate,logout} = authSlice.actions;
export default authSlice.reducer;