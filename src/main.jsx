
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ShopContextProvider from './context/ShopContext.jsx'; // ✅ default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

/**
 * Renders the root of the app
 * Wraps the app component with BrowseRouter to enable routing
 */


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
 
    <App />
  </BrowserRouter>,
  
)

