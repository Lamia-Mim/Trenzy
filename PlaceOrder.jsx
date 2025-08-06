import React from 'react'

/*
  This component handles the order placement page.
  It includes a form for delivery details and a section to choose a payment method.
*/
const PlaceOrder = () => {
    // Method will store the selected payment option (default is 'cod')
    const [method, setMethod] = useState('cod');

    // Used to move to the orders page after placing an order
    const { navigate } = useContext(shopContext);

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            
            {/* Form for delivery information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480p]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
                </div>

                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
                </div>

                {/* Shows cart total or summary */}
                <div className='mt=8 min-w-80'>
                    <CartTotal />
                </div>

                {/* Section for payment method */}
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Options to choose payment method */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        
                        {/* bKash */}
                        <div onClick={() => setMethod('bKash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assests.bKash_logo} alt="" />
                        </div>

                        {/* Nagad */}
                        <div onClick={() => setMethod('nagad')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'nagad' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assests.nagad_logo} alt="" />
                        </div>

                        {/* Cash on Delivery */}
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    {/* Button to place order */}
                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
