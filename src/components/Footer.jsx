import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20">
      {/* Main Footer Grid */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Brand Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2024 foreveryou. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
