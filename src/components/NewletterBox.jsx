import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert('Thanks for subscribing!');
    // You can also send data to backend here
  };

  return (
    <div className='text-center my-10 px-4'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-6'>
        <input
          className='w-full sm:flex-1 border border-gray-300 p-3 rounded outline-none'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs px-6 py-3 rounded hover:bg-gray-800 transition'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
