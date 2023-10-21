import {USERS_URL, USERS_URL_URL} from '../redux/constants/constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
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

export const {useLoginMutation} = usersApiSlice;