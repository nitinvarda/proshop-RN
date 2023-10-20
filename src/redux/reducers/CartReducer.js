import {createSlice} from '@reduxjs/toolkit';


const initialState ={
    items:[],
}

const CartReducer = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            console.log(action)
            state.items.concat(action.payload.item);
        },
        removeItem:(state,action)=>{
            const filtered = state.items.filter(item=> item.id !=action.payload.id);
            state.items = filtered;
        }
    }

})

export const {addItem,removeItem} = CartReducer.actions;

export default CartReducer.reducer;