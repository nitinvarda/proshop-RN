import {PRODUCTS_URL} from '../redux/constants/constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword})=>({
                url:PRODUCTS_URL,
                params:{keyword}
            }),
            keepUnusedDataFor:5,
        }),
        getProductDetail:builder.query({
            query:(id)=>({
                url:PRODUCTS_URL+ `/${id}`
            })
        }),
        getAllProducts:builder.query({
            query:()=>({
                url:PRODUCTS_URL
            })
        }),
        createReview: builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Product']
        }),
        removeReview: builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}/reviews`,
                method:'DELETE'
            })
        })
    })

})

export const {
    useGetProductsQuery,
    useGetProductDetailQuery,
    useGetAllProductsQuery,
    useCreateReviewMutation,
    useRemoveReviewMutation
} = productsApiSlice;