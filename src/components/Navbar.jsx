
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const isAdmin = true; // Replace with real auth logic

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-24 sm:w-32" />
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm text-gray-700 items-center">
        {['/', '/collection', '/about', '/contact'].map((path, idx) => {
          const names = ['Home', 'Collection', 'About', 'Contact'];
          return (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? 'text-black font-semibold' : 'text-gray-700'
                }
              >
                {names[idx]}
              </NavLink>
            </li>
          );
        })}

        {isAdmin && (
          <li>
            <NavLink to="/admin">
              <div className="bg-white text-black border border-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-100">
                Admin
              </div>
            </NavLink>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-4">
        <button onClick={() => setShowSearch(true)} aria-label="Search">
          <img src={assets.search_icon} alt="Search" className="w-5 cursor-pointer" />
        </button>
        <NavLink to="/login">
          <img src={assets.profile_icon} alt="Profile" className="w-5 cursor-pointer" />
        </NavLink>
        <NavLink to="/cart">
          <img src={assets.cart_icon} alt="Cart" className="w-5 cursor-pointer" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react'
import { assets } from '../assets/assets'

/**
 * Displaying the Logo and Logout button
 * @component
 * @returns {JSX.Element} The navigation bar UI
 */

const Navbar = () => {

    return (

        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-[max(10%,60px)]' src={assets.logo} alt="" />
            <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'> Logout </button>
        </div>

    )

}
export default Navbar
 Admin-Features
