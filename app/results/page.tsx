'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const logoMap: Record<string, string> = {
  'Massachusetts Institute of Technology': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/mit-logo.png',
  'Stanford University': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/stanford-logo.png',
  'Harvard University': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/harverd-logo.png',
  'University of Cambridge': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/cambridge-logo.png',
  'University of Oxford': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/oxford-logo.png',
  'California Institute of Technology': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/caltech-logo.png',
  'ETH Zurich': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/eth-logo.png',
  'University College London': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/london-logo.png',
  'Imperial College London': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/imperial-logo.png',
  'University of Chicago': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/chicago-logo.png',
  'University of California, Berkeley': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/berkeley-logo.png',
  'National University of Singapore': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/nus-logo.png',
  'Princeton University': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/priceton-logo.png',
  'University of Tokyo': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/tokyo-logo.png',
  'Yale University': 'https://bbxmsfmikhbvbweaderx.supabase.co/storage/v1/object/public/universitylogos/logos/yale-logo.png'
};

const studyLevels = ['bachelors', 'masters', 'phd'];
const countries = ['United States', 'United Kingdom', 'Switzerland'];
const subjects = [
  'Engineering', 'Computer Science', 'Business', 'Biology', 'Law', 'Medicine', 'Social Sciences',
  'Mathematics', 'Arts', 'Humanities', 'Sciences', 'Physics', 'Chemistry', 'Natural Sciences',
  'Architecture', 'Economics',
];

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('keyword') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('studyLevel') || '');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'worldranking');
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('keyword', search);
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedLevel) params.set('studyLevel', selectedLevel);
    if (selectedSubject) params.set('subject', selectedSubject);
    if (sortBy !== 'worldranking') params.set('sortBy', sortBy);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : '', { scroll: false });
  }, [search, selectedCountry, selectedLevel, selectedSubject, sortBy, router]);

  useEffect(() => {
    async function fetchUniversities() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('keyword', search);
      if (selectedCountry) params.append('country', selectedCountry);
      if (selectedLevel) params.append('studyLevel', selectedLevel);
      if (selectedSubject) params.append('subject', selectedSubject);
      params.append('sortBy', sortBy);
      const res = await fetch(`/api/universities?${params.toString()}`);
      const { data } = await res.json();
      setUniversities(data || []);
      setLoading(false);
    }
    fetchUniversities();
  }, [search, selectedCountry, selectedLevel, selectedSubject, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil((universities?.length || 0) / perPage);
  const paginatedUniversities = universities?.slice((page - 1) * perPage, page * perPage) || [];

  // Handle search/filter submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearch('');
    setSelectedCountry('');
    setSelectedLevel('');
    setSelectedSubject('');
    setSortBy('worldranking');
    setPage(1);
    router.push('', { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Top Nav */}
      <nav className="w-full bg-white shadow-sm flex items-center px-8 py-4 justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/assets/images/educompass-logo.png" alt="EDUCOMPASS" className="h-8 w-auto" />
          <span className="font-bold text-xl text-[#6D28D9] tracking-tight">EDUCOMPASS</span>
        </Link>
        <div className="flex gap-6 items-center text-gray-600 text-sm">
          <a href="#" className="font-semibold text-[#6D28D9] border-b-2 border-[#6D28D9] pb-1">Universities</a>
          <a href="#">For Students</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#" className="ml-4 px-4 py-2 bg-[#8B5CF6] text-white rounded-lg font-semibold hover:bg-[#6D28D9] transition">Login</a>
        </div>
      </nav>

      {/* Search Bar & Filters */}
      <div className="max-w-5xl mx-auto mt-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-xl shadow p-4">
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search university, subject, ..."
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6D28D9] text-black bg-gray-50"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700"
            >
              <option value="">All Countries</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700"
            >
              <option value="">All Levels</option>
              {studyLevels.map(l => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700"
            >
              <option value="">All Subjects</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-6 py-2 bg-[#6D28D9] text-white rounded-lg font-semibold shadow hover:bg-[#5B21B6] transition">Find it now</button>
        </form>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-2 py-1 rounded border border-gray-200 text-sm"
            >
              <option value="worldranking">World Ranking</option>
              <option value="name">Name</option>
              <option value="mincgpa">Min CGPA</option>
            </select>
          </div>
          <button 
            className="ml-auto text-sm text-[#6D28D9] underline hover:text-[#5B21B6]" 
            onClick={handleClearFilters}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-5xl mx-auto mt-6 mb-2 text-gray-700 text-sm font-semibold">
        {universities?.length || 0} universities found
      </div>

      {/* Results Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">Loading...</div>
        ) : paginatedUniversities.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">No universities found.</div>
        ) : (
          paginatedUniversities.map((uni, idx) => (
            <div
              key={uni.id}
              className={`rounded-xl border p-6 flex flex-col items-start shadow-md transition relative bg-white ${idx === 0 ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-lg z-10' : 'border-gray-200 text-gray-800'}`}
              style={idx === 0 ? { boxShadow: '0 8px 32px 0 rgba(109,40,217,0.15)' } : {}}
            >
              <img
                src={logoMap[uni.name] || '/assets/images/universities/placeholder-logo.png'}
                alt={uni.name + ' logo'}
                className={`w-14 h-14 object-contain mb-3 rounded-lg bg-gray-100 ${idx === 0 ? 'bg-white/10' : ''}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/universities/placeholder-logo.png';
                }}
              />
              <h2 className={`text-lg font-bold mb-1 ${idx === 0 ? 'text-[#6D28D9]' : 'text-[#6D28D9]'}`}>{uni.name}</h2>
              <div className={`mb-2 text-sm ${idx === 0 ? 'text-[#6D28D9]' : 'text-gray-500'}`}>{uni.country}{uni.stateprovince ? `, ${uni.stateprovince}` : ''}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {uni.studylevels?.map((level: string) => (
                  <span key={level} className={`px-2 py-0.5 rounded-full text-xs font-semibold ${idx === 0 ? 'bg-white/20 text-[#6D28D9] border border-[#6D28D9]/30' : 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20'}`}>{level}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {uni.subjects?.map((subj: string) => (
                  <span key={subj} className={`px-2 py-0.5 rounded-full text-xs font-semibold ${idx === 0 ? 'bg-white/10 text-[#6D28D9] border border-[#6D28D9]/20' : 'border border-[#6D28D9] text-[#6D28D9] bg-white'}`}>{subj}</span>
                ))}
              </div>
              <div className={`text-xs mb-1 ${idx === 0 ? 'text-[#6D28D9]/80' : 'text-gray-500'}`}>Min CGPA: <span className="font-semibold">{uni.mincgpa || 'N/A'}</span></div>
              <div className={`text-xs mb-1 ${idx === 0 ? 'text-[#6D28D9]/80' : 'text-gray-500'}`}>Scholarships: <span className={uni.scholarships ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>{uni.scholarships ? 'Available' : 'Not Available'}</span></div>
              {uni.worldranking && (
                <div className={`text-xs mb-1 ${idx === 0 ? 'text-[#6D28D9]/80' : 'text-gray-500'}`}>World Ranking: <span className="font-semibold">#{uni.worldranking}</span></div>
              )}
              {uni.webpages && uni.webpages.length > 0 && (
                <a
                  href={uni.webpages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 px-4 py-2 rounded-lg font-semibold transition text-center w-full ${idx === 0 ? 'bg-white text-[#6D28D9] hover:bg-white/90' : 'bg-[#6D28D9] text-white hover:bg-[#5B21B6]'}`}
                >
                  Visit Website
                </a>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-12">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border transition ${page === num ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white text-[#2563eb] border-[#2563eb]/30 hover:bg-[#e0e7ff]'}`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
} 