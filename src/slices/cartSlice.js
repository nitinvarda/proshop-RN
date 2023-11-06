import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import updateCart from '../utils/cartUtils';


var initialState ={

    cartItems:[],
    shippingAddress:{},
    paymentMethod:'PayPal'
}
AsyncStorage.getItem('cart').then((value)=>{
    if(value){
        initialState = JSON.parse(value);
    }
    
}).catch(err=>console.log(err))



const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            state.cartItems = [...state.cartItems,action.payload];
        },
        addToCart:(state,action)=>{
            const item = action.payload;
            const existItem = state.cartItems.find((x)=>x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map((x)=>x._id === existItem._id ? item : x);
            }
            else{
                state.cartItems = [...state.cartItems,item];
            }

            updateCart(state);

            
            
        },
        loadInitialState:(state,action)=>{
            state.cartItems = action.payload.cartItems;
            state.paymentMethod = action.payload.paymentMethod;
            state.shippingAddress = action.payload.shippingAddress;
            state.itemsPrice = action.payload.itemsPrice;
            state.shippingPrice = action.payload.shippingPrice;
            state.taxPrice = action.payload.taxPrice;
            state.totalPrice = action.payload.totalPrice;

    
        }
    }
})

export const {addItem,loadInitialState,addToCart} = cartSlice.actions;
export default cartSlice.reducer;