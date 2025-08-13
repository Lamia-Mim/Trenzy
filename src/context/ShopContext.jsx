// src/context/ShopContextProvider.jsx
import React, { useState } from "react";
import { ShopContext } from "./ShopContext"; // import context
import { products } from "../assets/assets"; // update path as needed

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  // ✅ Define states before using them in the context value
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
 // default to all products

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
