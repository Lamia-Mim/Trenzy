import React from 'react'
import { shopContext } from '../context/shopContext'
import Title from './Title'

/**
 * Cart Total page Component
 * 
 * @description
 * displays the cart totals including sustotal,shipping fee and total cart amount.
 * 
 * This component pulls its data from the global 'shopContext'
 * 
 * @components
 * @returns {JSX.Element} The cart totals UI
 * 
 * 
*/

const cartTotal = () => {

  const { currency, delivery_fee, getCartAmount } = useContext(shopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default cartTotal