import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCart() {
    const [cartItems,setCartItems] = useState([]);
    const [loading,setLoading]  =useState(false)
    const [subTotal,setSubTotal] = useState(0);

    useEffect(()=>{
        (async()=>{
            try {
              setLoading(true);
              const items = await AsyncStorage.getItem("cartItems");
            
              if(items){
                const cartItems = JSON.parse(items)
              
                setCartItems(cartItems);
                getSubTotal(cartItems);
              }
              
              setLoading(false)
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          })();
    },[])

      const getProductById = (id) =>{
        return cartItems.length > 0 ? cartItems.filter(product=>product.id==id)[0] : {}
      }
      const getProductsOtherThanId = (id) =>{
        return cartItems.length > 0 ? cartItems.filter(product=>product.id != id) :{}
      }
    
      const getSubTotal = (cartItems) =>{
        const sumCost = (total,item) =>{
          return total + (item.price * Number(item.qty) )
        }
        const subTotalValue = cartItems.reduce(sumCost,0)
        setSubTotal(subTotalValue)
    
      }
    
      const deleteItem = async(id) =>{
          try {
              if(cartItems.length > 0){
                  const newItems = cartItems.filter(product=>product.id!==id)
                
                  setCartItems(newItems)
                  getSubTotal(newItems)
                  await AsyncStorage.setItem('cartItems',JSON.stringify(newItems))
              }
          } catch (error) {
              console.log(error);
          }
      }

      const decreaseCount = async(id) =>{
        try {
            if(cartItems.length > 0){
                const newData = cartItems.map((product)=>{
                    if(product.id == id){
                        return {
                            ...product,
                            qty:Number(product.qty) -1
                        }
                    }
                    else{
                        return product
                    }
                })
    
              
                setCartItems(newData)
                getSubTotal(newData)
                await AsyncStorage.setItem('cartItems',JSON.stringify(newData))
            }
        } catch (error) {
            console.log(error)
        }
      }

      const increaseCount = async(id) =>{
        try {
            if(cartItems.length > 0){
                const product = getProductById(id);
                const otherProducts = getProductsOtherThanId(id);
    
                // const newData = [...otherProducts,{...product,qty: product.qty >=product.product.qty +1}]
                // product.countInStock
                const newData = cartItems.map((product)=>{
                    // console.log(Number(product.qty) >= Number(product.countInStock),Number(product.qty), Number(product.countInStock));
                    if(product.id == id){
                        return {
                            ...product,
                            qty:Number(product.qty)+1
                        }
                    }
                    else{
                        return product;
                    }
                })
    
                setCartItems(newData)
                getSubTotal(newData)
                await AsyncStorage.setItem('cartItems',JSON.stringify(newData))
            }
        } catch (error) {
            console.log(error)
        }

      }
  return {cartItems,loading,subTotal,increaseCount,decreaseCount,deleteItem};
}