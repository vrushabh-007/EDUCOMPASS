'use client';
// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const studyLevels = ['bachelors', 'masters', 'phd'];
const countries = ['United States', 'United Kingdom', 'Switzerland'];
const subjects = [
  'Engineering', 'Computer Science', 'Business', 'Biology', 'Law', 'Medicine', 'Social Sciences',
  'Mathematics', 'Arts', 'Humanities', 'Sciences', 'Physics', 'Chemistry', 'Natural Sciences',
  'Architecture',
  'Economics',
];

const logoMap = {
  'Massachusetts Institute of Technology': 'https://upcdn.io/G22nhgw/raw/mit-logo.png',
  'Stanford University': 'https://upcdn.io/G22nhgw/raw/stanford-logo.png',
  'Harvard University': 'https://upcdn.io/G22nhgw/raw/harverd-logo.png',
  'University of Cambridge': 'https://upcdn.io/G22nhgw/raw/cambridge-logo.png',
  'University of Oxford': 'https://upcdn.io/G22nhgw/raw/oxford-logo.png',
  'California Institute of Technology': 'https://upcdn.io/G22nhgw/raw/caltech-logo.png',
  'ETH Zurich': 'https://upcdn.io/G22nhgw/raw/eth-logo.png',
  'University College London': 'https://upcdn.io/G22nhgw/raw/ucl-logo.png',
  'Imperial College London': 'https://upcdn.io/G22nhgw/raw/imperial-logo.png',
  'University of Chicago': 'https://upcdn.io/G22nhgw/raw/uchicago-logo.png',
  'University of California, Berkeley': 'https://upcdn.io/G22nhgw/raw/berkeley-logo.png',
  'National University of Singapore': 'https://upcdn.io/G22nhgw/raw/nus-logo.png',
  'Princeton University': 'https://upcdn.io/G22nhgw/raw/priceton-logo.png',
  'University of Tokyo': 'https://upcdn.io/G22nhgw/raw/tokyo-logo.png',
  'Yale University': 'https://upcdn.io/G22nhgw/raw/yale-logo.png'
};

function HeroSection() {
  const [studyLevel, setStudyLevel] = useState('');
  const [country, setCountry] = useState('');
  const [subject, setSubject] = useState('');
  const [minCGPA, setMinCGPA] = useState(7.0);
  const [scholarships, setScholarships] = useState(false);
  const router = useRouter();

  const handleDiscover = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      ...(studyLevel && { studyLevel }),
      ...(country && { country }),
      ...(subject && { subject }),
      minCGPA: minCGPA.toString(),
      scholarships: scholarships.toString(),
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <section className="relative h-[550px] overflow-hidden" style={{
      backgroundImage: "url('https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos//18e46775483f618e645160d67f1dde48%20(1).jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/70 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-[#fff8e6] to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-2xl floating"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl floating floating-delay-1"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-secondary/10 rounded-full blur-2xl floating floating-delay-2"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl floating floating-delay-3"></div>

      <div className="container mx-auto px-6 h-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center h-full w-full gap-8 -mt-7">
          <div className="md:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="block mb-2">EDUCOMPASS</span>
              <span className="text-2xl md:text-3xl lg:text-4xl gradient-text font-medium">Simple. Smart. Seamless.</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8">
              Discover your perfect university match from over 10,000+ programs worldwide. Let us guide your educational journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-black/20 text-primary font-semibold rounded-button hover:bg-black/10 transition shadow-lg whitespace-nowrap">
                <i className="ri-search-line ri-lg mr-2"></i>
                Explore Universities
              </button>
              <button className="px-6 py-3 bg-transparent text-white border border-white/30 font-semibold rounded-button hover:bg-white/10 transition whitespace-nowrap">
                <i className="ri-information-line ri-lg mr-2"></i>
                How It Works
              </button>
            </div>
          </div>

          <div className="md:w-2/5">
            <div className="glassmorphism rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-6 max-w-md mx-auto">
              <h3 className="text-white text-xl font-semibold mb-4">Find Your Perfect University</h3>
              <form className="space-y-3" onSubmit={handleDiscover}>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-1">Study Level</label>
                  <div className="relative">
                    <select value={studyLevel} onChange={e => setStudyLevel(e.target.value)} className="custom-select w-full px-4 py-2 bg-white/20 text-white border-none rounded focus:ring-2 focus:ring-primary/50 outline-none pr-8 [&>option]:bg-gray-100 [&>option]:text-gray-900">
                      <option value="">Select Study Level</option>
                      {studyLevels.map(level => (
                        <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-1">Destination</label>
                  <div className="relative">
                    <select value={country} onChange={e => setCountry(e.target.value)} className="custom-select w-full px-4 py-2 bg-white/20 text-white border-none rounded focus:ring-2 focus:ring-primary/50 outline-none pr-8 [&>option]:bg-gray-100 [&>option]:text-gray-900">
                      <option value="">Select Destination</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-1">Subject</label>
                  <div className="relative">
                    <select value={subject} onChange={e => setSubject(e.target.value)} className="custom-select w-full px-4 py-2 bg-white/20 text-white border-none rounded focus:ring-2 focus:ring-primary/50 outline-none pr-8 [&>option]:bg-gray-100 [&>option]:text-gray-900">
                      <option value="">Select Subject</option>
                      {subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-1">CGPA (Minimum: 7.0)</label>
                  <input type="range" min="7.0" max="10.0" step="0.1" value={minCGPA} onChange={e => setMinCGPA(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-white/80 mt-1">
                    <span>7.0</span>
                    <span>{minCGPA}</span>
                    <span>10.0</span>
                  </div>
                </div>
                <label className="custom-checkbox text-white/90 text-sm">
                  Include scholarships
                  <input type="checkbox" checked={scholarships} onChange={e => setScholarships(e.target.checked)} />
                  <span className="checkmark"></span>
                </label>
                <button type="submit" className="w-full py-2.5 bg-black/20 from-primary to-secondary text-white font-semibold rounded-button hover:opacity-90 transition shadow-lg mt-2 whitespace-nowrap">
                  <i className="ri-search-line ri-lg mr-2"></i>
                  Discover
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;