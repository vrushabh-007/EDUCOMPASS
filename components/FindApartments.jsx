'use client';

// src/components/FindApartments.jsx
import React from 'react';
import { RiArrowDownSLine, RiMapPinLine, RiSearchLine, RiMap2Line } from 'react-icons/ri';

function FindApartments() {
  return (
    <section className="py-16 bg-[#fff8e6]">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
            {/* Left Side - Form Content */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Find Apartments Near Universities</h2>
              <p className="text-white/90 mb-6">Discover comfortable and convenient housing options near your chosen university.</p>
              <div className="space-y-4">
                <div className="relative">
                  <select 
                    id="university-select" 
                    defaultValue=""
                    className="w-full px-4 py-3 pr-10 rounded-lg border-none focus:ring-2 focus:ring-white/30 bg-white/10 text-white appearance-none [&:not(:placeholder-shown)]:text-gray-300"
                  >
                    <option value="" disabled className="text-white">Select University</option>
                    <option value="harvard" className="text-gray-700">Harvard University</option>
                    <option value="oxford" className="text-gray-700">Oxford University</option>
                    <option value="mit" className="text-gray-700">MIT</option>
                    <option value="stanford" className="text-gray-700">Stanford University</option>
                    <option value="cambridge" className="text-gray-700">Cambridge University</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
                </div>

                <div className="relative">
                  <select 
                    id="housing-type" 
                    defaultValue=""
                    className="w-full px-4 py-3 pr-10 rounded-lg border-none focus:ring-2 focus:ring-white/30 bg-white/10 text-white appearance-none [&:not(:placeholder-shown)]:text-gray-300"
                  >
                    <option value="" disabled className="text-white">Housing Type</option>
                    <option value="apartment" className="text-gray-700">Apartment</option>
                    <option value="studio" className="text-gray-700">Studio</option>
                    <option value="shared" className="text-gray-700">Shared Room</option>
                    <option value="dormitory" className="text-gray-700">Dormitory</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter location or zip code..." 
                    className="w-full px-4 py-3 pr-10 rounded-lg border-none focus:ring-2 focus:ring-white/30 bg-white/10 text-white placeholder-white/70"
                  />
                  <RiMapPinLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-white text-[#8B5CF6] font-semibold rounded-lg hover:bg-white/90 transition shadow-md whitespace-nowrap flex items-center justify-center">
                    <RiSearchLine className="text-xl mr-2" />
                    Search Housing
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/30 whitespace-nowrap flex items-center justify-center">
                    <RiMap2Line className="text-xl mr-2" />
                    View Map
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 flex justify-center items-center p-4">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Modern Apartment Building with Glass Balconies" 
                className="w-full rounded-xl shadow-lg object-cover h-[500px] hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindApartments;