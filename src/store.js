import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import CartSliceReducer from './slices/cartSlice';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { PERSIST, REGISTER, REHYDRATE,FLUSH,PURGE,PAUSE } from 'redux-persist';


const persistAuthConfig = {
    key: 'auth',
    storage: AsyncStorage,
};
const persistCartConfig ={
    key:'cart',
    storage:AsyncStorage
}
const persistAuthReducer = persistReducer(persistAuthConfig, authSlice);
const persistCartReducer = persistReducer(persistCartConfig, CartSliceReducer);

const store  = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart:persistCartReducer,
        auth:persistAuthReducer,
        theme:themeSlice
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    }).concat(apiSlice.middleware),devTools:true
})

export default store;
export const persistor = persistStore(store);
