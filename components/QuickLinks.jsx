// src/components/QuickLinks.jsx
import React from 'react';

function QuickLinks() {
  const links = [
    { title: 'PREPARE', icon: '📚' },
    { title: 'PROGRAM SEARCH', icon: '🔍' },
    { title: 'SUBJECT GUIDE', icon: '📖' }
  ];

  return (
    <div className="bg-[#fff8e6] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <button
              key={index}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white py-3 px-6 rounded-lg hover:from-[#7C3AED] hover:to-[#5B21B6] transition duration-300"
            >
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickLinks;