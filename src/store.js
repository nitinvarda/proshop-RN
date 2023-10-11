import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import AppContextReducer from './redux/reducers/AppContextReducer';
import { apiSlice } from './slices/apiSlice';
import CartReducer from './redux/reducers/CartReducer';
import cartSliceReducer from './slices/cartSlice';


const store  = configureStore({
    reducer:{
        AppContext:AppContextReducer,
        cart:cartSliceReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),devTools:true
})

export default store;
