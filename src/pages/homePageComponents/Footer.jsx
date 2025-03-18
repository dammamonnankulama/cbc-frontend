import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Discover Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Discover</h3>
          <ul>
            <li className="mb-2">
              <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Store Policies Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Store Policies</h3>
          <ul>
            <li className="mb-2">
              <a href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
            </li>
            <li className="mb-2">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
            </li>
            <li className="mb-2">
              <a href="/shipping-policy" className="text-gray-400 hover:text-white transition duration-300">Shipping Policy</a>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Get in Touch</h3>
          <ul>
            <li className="mb-2 text-gray-400">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <a href="tel:+94770487905" className="hover:text-white transition duration-300">0770487905</a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-gray-400 hover:text-white text-2xl transition duration-300" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-gray-400 hover:text-white text-2xl transition duration-300" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} className="text-gray-400 hover:text-white text-2xl transition duration-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Crystal Beauty Clear. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
