import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';





const initialState = {
    cartItems:[]
}



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            state.cartItems = [...state.cartItems,action.payload];
        },
        loadInitialState:(state,action)=>{
            state.cartItems = action.cartItems;
        }
    }
})

export const {addItem,loadInitialState} = cartSlice.actions;
export default cartSlice.reducer;