import React from 'react'
import Title from '../components/Title'
import { assests } from '../assets/assets'

/**
 * About page component
 * 
 * @description
 * It displays the "About US" section of the home page, including:
 * - Company story
 * - Mission  Statement
 * - Reason to choose the brand, also
 * - Quality Assurance, Convenience, Exceptional Customer Service
 * 
 * @component
 * @returns {JSX.Element} The About page UI
 */

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 '>
          <p>Trenzy was born out of a passion for innivation and desire to revolutianize the way people shoponline. Our jouney began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>since our inception, we've worked tirelessly to curate a diverse selectionof high-quality products that cater to everytaste and preference.  </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Trenzy is to empower customers with choise, convenience, and confidence. We've dedicated  to providing a seamless shopping experience that exceeds expectations,from browsing and ordering to deliveryand beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our user-friendly platform makes shopping a breeze, allowing you to find and purchase products with ease.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is always ready to assist you, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

    </div>
  )
}

export default About
