import {PRODUCTS_URL} from '../redux/constants/constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:PRODUCTS_URL,
            }),
            keepUnusedDataFor:5
        }),
        getProductDetail:builder.query({
            query:(id)=>({
                url:PRODUCTS_URL+ `/${id}`
            })
        })
    })

})

export const {useGetProductsQuery,useGetProductDetailQuery} = productsApiSlice;