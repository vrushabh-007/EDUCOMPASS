// src/components/GlobalRankings.jsx
import React from 'react';

function GlobalRankings() {
  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">GLOBAL RANKINGS</h2>
            <p className="text-gray-600">
              Explore top universities worldwide ranked by academic excellence, research impact, and international outlook.
            </p>
            <a 
              href="https://www.topuniversities.com/world-university-rankings"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white px-6 py-2 rounded-lg hover:from-[#7C3AED] hover:to-[#5B21B6] transition duration-300"
            >
              View Rankings
            </a>
          </div>
          <div className="md:w-1/3">
            <div className="bg-[#FFF8E6] p-6 rounded-lg">
              <div className="text-center">
                <span className="block text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] bg-clip-text text-transparent">1000+</span>
                <span className="text-gray-600">Universities Ranked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalRankings;