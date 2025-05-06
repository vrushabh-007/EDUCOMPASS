// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-center space-x-6 mb-6">
          {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
            <a
              key={social}
              href={`#${social.toLowerCase()}`}
              className="hover:text-gray-200 transition duration-300"
            >
              {social}
            </a>
          ))}
        </div>
        
        <div className="flex justify-center space-x-6 text-sm mb-6">
          <a href="#about" className="hover:text-gray-200">About</a>
          <a href="#contact" className="hover:text-gray-200">Contact us</a>
          <a href="#faqs" className="hover:text-gray-200">FAQs</a>
          <a href="#terms" className="hover:text-gray-200">Terms and conditions</a>
          <a href="#cookies" className="hover:text-gray-200">Cookie policy</a>
          <a href="#privacy" className="hover:text-gray-200">Privacy</a>
        </div>

        <div className="text-center text-sm">
          <p>Copyright © 2025 - Educompass</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;