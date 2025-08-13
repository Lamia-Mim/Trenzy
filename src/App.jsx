import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';// ✅ Make sure Login.jsx exists in pages folder
import Orders from './pages/Orders';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar'; // ✅ Make sure SearchBar.jsx exists in components folder


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
       <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'

/**
 * Base URL of the backend server, loaded from environment variables.
 * @constant {string}
 */
export const backendUrl = import.meta.env.VITE_BACKEND_URL

/**
 * Root component for the admin panel of the Trenzy app
 * Shows admin dashboard (Navbar,sidebar & routed pages)
 * Displays login page
 * 
 * @component
 * @returns {JSX.Element}
 */


const App = () => {

    const [token, setToken] = useState('');

    return (

        <div className='bg-gray-50 min-h-screen'>

            {token === ""
                ? <Login />
                : <>
                    <Navbar />
                    <hr />
                    <div className='flex w-full'>
                        <Sidebar />
                        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                            <Routes>
                                <Route path='/add' element={<Add />} />
                                <Route path='/list' element={<List />} />
                                <Route path='/orders' element={<Orders />} />

                            </Routes>

                        </div>
                    </div>
                </>

            }

        </div>

    )

}
export default App
