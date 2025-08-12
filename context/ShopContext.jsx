import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";


/**
 * Shop context provider component
 * 
 * @description
 * Shop context for managing global stoe/cart state
 * provide cart relateed data and function
 * to all child components in the application
 * 
 * @component
 * @reurns {JSX.Element} The context provider wrapping its children
 */



export const shopContext = createContext();

const shopContextProvider = (props) => {

  /**
   * @type {string} currency symbol used in the store
   * @type {number} fee applied to the total cart price
   * @type {string} backend api
   * @type {object} store cart item with product Id
   */


  const currency = '$';
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [cartItems, setCartItems] = useState({});



  /**
   * Add a product to the cart
   * 
   * @function
   * @param {sring} itemId - the Id of the product
   * @param {sring} size - the size of the product 
   * @returns 
   */
  const addToCart = async (itemId, size) => {

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
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {

        await axiox.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  }


  /**
 * Get total quantity of items in the cart
 * 
 * @function
 * @returns {number} Total count of items
 */

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
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

  /**
   * Calculate total price of items in the cart
   * 
   * @function
   * @returns {number} Total cart amount
   */

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {

        }
      }
    }
    return totalAmount;
  }

  /** value object shared via context */
  const value = {
    products, currency, delivery_fee,
    cartItems, addToCart,
    getCartCount,
    getCartAmount
  }

  return (
    <shopContext.Provider value={value}>
      {props.children}
    </shopContext.Provider>
  )

}

export default shopContextProvider;



