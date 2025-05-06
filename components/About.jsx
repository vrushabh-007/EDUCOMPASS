// src/components/About.jsx
import React from 'react';

function About() {
  return (
    <div className="bg-[#FFF8E6] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your College Search Hub</h2>
          <p className="text-gray-600 leading-relaxed">
            Discover your ideal college—whether in India or abroad—with up-to-date, reliable information that helps you make informed decisions about your academic future.
          </p>
          <div className="mt-6 text-gray-700">
            <h3 className="font-semibold mb-2">Detailed College Profiles</h3>
            <p className="text-sm">
              Each listing provides essential details on courses, fee structures, campus facilities, and admission criteria so you can compare and choose confidently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;