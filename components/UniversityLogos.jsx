'use client';

// src/components/UniversityLogos.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { supabase } from '@/lib/supabase';

function UniversityLogos() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of university names to their logo URLs and websites
  const universityData = {
    'University of Cambridge': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/cambridge-logo.png',
      website: 'https://www.cam.ac.uk/'
    },
    'ETH Zurich': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/eth-logo.png',
      website: 'https://ethz.ch/'
    },
    'Harvard University': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/harverd-logo.png',
      website: 'https://www.harvard.edu/'
    },
    'Massachusetts Institute of Technology': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/mit-logo.png',
      website: 'https://www.mit.edu/'
    },
    'National University of Singapore': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/nus-logo.png',
      website: 'https://www.nus.edu.sg/'
    },
    'University of Oxford': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/oxford-logo.png',
      website: 'https://www.ox.ac.uk/'
    },
    'Princeton University': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/priceton-logo.png',
      website: 'https://www.princeton.edu/'
    },
    'Stanford University': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/stanford-logo.png',
      website: 'https://www.stanford.edu/'
    },
    'University of Tokyo': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/tokyo-logo.png',
      website: 'https://www.u-tokyo.ac.jp/'
    },
    'Yale University': {
      logo: 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/yale-logo.png',
      website: 'https://www.yale.edu/'
    }
  };

  useEffect(() => {
    async function fetchUniversities() {
      try {
        console.log('Starting to fetch universities...');
        
        // Fetch universities from the database
        const { data, error: queryError } = await supabase
          .from('University')
          .select('name, country')
          .order('name', { ascending: true });

        if (queryError) {
          console.error('Supabase query error:', queryError);
          throw new Error(`Failed to fetch universities: ${queryError.message}`);
        }

        if (!data || data.length === 0) {
          console.warn('No universities found in the database');
          setUniversities([]);
          setLoading(false);
          return;
        }

        // Only include universities that have data in universityData
        const universitiesWithData = data
          .filter(uni => universityData[uni.name])
          .map(uni => ({
            ...uni,
            logo: universityData[uni.name].logo,
            website: universityData[uni.name].website
          }));

        setUniversities(universitiesWithData);
      } catch (error) {
        console.error('Error in fetchUniversities:', error);
        setError(error.message || 'Failed to fetch universities');
      } finally {
        setLoading(false);
      }
    }

    fetchUniversities();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="bg-[#fff8e6] py-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
            <p className="text-lg text-gray-600">Loading universities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fff8e6] py-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
            <p className="text-lg text-red-600">Error: {error}</p>
            <p className="text-sm text-gray-600 mt-2">Please check the browser console for more details.</p>
          </div>
        </div>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="bg-[#fff8e6] py-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
            <p className="text-lg text-gray-600">No universities found in the database.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8e6] py-[13px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
          <p className="text-lg text-gray-600">Explore opportunities at world-renowned institutions</p>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {universities.map((uni, index) => (
              <div key={`${uni.name}-${index}`} className="px-4">
                <a 
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group transform transition-all duration-300 hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(uni.website, '_blank');
                  }}
                >
                  <div className="aspect-square rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 p-6 flex flex-col items-center justify-center border border-gray-100">
                    <div className="w-full h-2/3 flex items-center justify-center mb-4">
                      {uni.logo ? (
                        <img 
                          src={uni.logo}
                          alt={`${uni.name} logo`}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                          <span className="text-gray-400 text-sm">No logo available</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800 text-center leading-tight">
                      {uni.name}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default UniversityLogos;