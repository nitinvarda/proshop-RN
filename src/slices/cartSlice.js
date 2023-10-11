import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems:[]
}



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,payload)=>{
            state.cartItems.concat(payload.item);
        },
        loadInitialState:(state,payload)=>{
            state.cartItems = payload.cartItems;
        }
    }
})

export const {addItem,loadInitialState} = cartSlice.actions;
export default cartSlice.reducer;