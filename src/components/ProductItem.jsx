// src/components/ProductItem.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';  // Import ShopContext
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);  // Get the currency from context

  return (
    <Link to={`/product/${id}`} className='product-item'>
      <div className='overflow-hidden'>
        <img 
          className='hover:scale-110 transition ease-in-out duration-300' 
          src={image[0]} 
          alt={name} 
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
  