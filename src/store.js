import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import AppContextReducer from './redux/reducers/AppContextReducer';
import { apiSlice } from './slices/apiSlice';


const store  = configureStore({
    reducer:{
        AppContext:AppContextReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),devTools:true
})

export default store;
