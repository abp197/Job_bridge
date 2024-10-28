import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Footer from './shared/Footer';
import LatestJobs from './LatestJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '../hooks/useGetAllJobs'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div >
      
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <Api
      <Footer />
    
    </div>
  );
};

export default Home;
