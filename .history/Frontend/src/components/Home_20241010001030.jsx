import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Footer from './shared/Footer';
import LatestJobs from './LatestJobs'
import Shubham from './Shubham';

const Home = () => {
  return (
    <div >
      
      <Navbar />
      <HeroSection />
      <LatestJobs />
      
      <Footer />
    
    </div>
  );
};

export default Home;
