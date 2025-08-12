import { createContext, useEffect, useState } from "react";

import {toast} from "react-toastify";

export const shopContext = createContext();

const shopContextProvider = (props) => {

     const currency = '$';
    const delivery_fee = 50;
    const [cartItems,setCartItems] = useState({});




     const addToCart = async (itemId,size) =>{

       if (!size) {
           toast.error('Select Product Size');
           return;
        }

        let cartData = structuredClone(cartItems);

       if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         }
         else {
            cartData[itemId][size] = 1;
         }
       }
       else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1;
       }
       setCartItems(cartData);

     }

   const getCartCount = () =>{
     let totalCount = 0;
     for(const items in cartItems){
          for(const item in cartItems[items]){
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                
            }
          }
     }
     return totalCount;
   }









{/* add logic to find the total amount of the cart*/}
const getCartAmount = () =>{
   let totalAmount = 0;
   for(const items in cartItems){
     let itemInfo = products.find((product)=> product._id === items);
     for(const item in cartItems[items]){
        try {
            if (cartItems[items][item]> 0) {
                totalAmount += itemInfo.price * cartItems[items][item]
            }
        } catch (error) {
            
        }
     }
   }
   return totalAmount;
}

    const value = {
        products, currency, delivery_fee,
          
          cartItems,addToCart,
          getCartCount,
          getCartAmount
    }

return (
    <shopContext.Provider value={value}>
        {}
    </shopContext.Provider>
   )

}

export default shopContextProvider;



