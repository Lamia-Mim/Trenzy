// src/components/BestSeller.jsx

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext); // Get products from context
  const [bestSellers, setBestSellers] = useState([]); // Local state to store bestsellers

  useEffect(() => {
    // Filter bestsellers from the product list
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellers(bestProduct.slice(0, 5)); // Limit to top 5
  }, [products]); // Add 'products' as dependency so it re-runs when products update

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our top-rated and most popular products loved by customers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={item.id || index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
