import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import UniversityLogos from '../components/UniversityLogos';
import About from '../components/About';
import GlobalRankings from '../components/GlobalRankings';
import FindApartments from '../components/FindApartments';
import QuickLinks from '../components/QuickLinks';
import Support from '../components/Support';
import Newsletter from '../components/Newsletter';
import ChatAI from '../components/ChatAI';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#fff8e6]">
      <Header />
      <main>
        <HeroSection />
        <UniversityLogos />
        <ChatAI />
        <About />
        <GlobalRankings />
        <FindApartments />
        <QuickLinks />
        <Support />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
