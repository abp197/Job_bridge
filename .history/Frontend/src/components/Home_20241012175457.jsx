import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Footer from './shared/Footer';
import LatestJobs from './LatestJobs'


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
      <Footer />
    
    </div>
  );
};

export default Home;
