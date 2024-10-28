import React, { useEffect, useState } from 'react';

const Api = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=java&l=austin%2C%20tx&radius=25", {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY',
          'X-RapidAPI-Host': 'indeed-indeed.p.rapidapi.com'
        }
      });

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      const data = await response.json();
      setJobs(data.results); // Assuming data.results contains the job listings
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <JobList jobs={jobs} />
    </div>
  );
};

export default Api;
