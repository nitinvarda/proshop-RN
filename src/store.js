import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import CartSliceReducer from './slices/cartSlice';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';


const store  = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart:CartSliceReducer,
        auth:authSlice,
        theme:themeSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),devTools:true
})

export default store;
