import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Footer from './shared/Footer';
import LatestJobs from './LatestJobs'
import JobApplication from './JobApplication';


const Home = () => {
  return (
    <div >
      
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <JobApplication/>
      <Footer />
    
    </div>
  );
};

export default Home;
