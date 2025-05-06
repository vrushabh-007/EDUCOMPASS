// src/components/Support.jsx
import React from 'react';

function Support() {
  return (
    <div className="bg-[#FFF8E6] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">We're here to help</h2>
            <p className="text-gray-600 mb-6">
              Read through our FAQs and, if you can't find what you're looking for, our experts will be happy to answer your questions.
            </p>
            <div className="space-x-4">
              <button className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white px-6 py-2 rounded-lg hover:from-[#7C3AED] hover:to-[#5B21B6] transition duration-300">
                READ FAQS
              </button>
              <button className="border border-[#8B5CF6] text-[#8B5CF6] px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#6D28D9] hover:text-white transition duration-300">
                ASK A QUESTION
              </button>
            </div>
          </div>
          <div className="md:w-1/2 bg-[#FFF8E6] p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How EDUCOMPASS can support you</h3>
            <p className="text-gray-600">
              We're here to support you through all stages of the university journey, whether it's researching institutions, navigating admissions or submitting your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;