import React, { useState, useEffect } from 'react';

const Api = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch jobs with backoff for handling rate limiting (429 errors)
  const fetchJobsWithBackoff = async (retryCount = 0) => {
    try {
      const response = await fetch(
        "https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=java&l=austin%2C%20tx&radius=25", 
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY', // Replace with your RapidAPI key
            'X-RapidAPI-Host': 'indeed-indeed.p.rapidapi.com'
          }
        }
      );

      if (response.status === 429) {
        if (retryCount < 5) {
          const backoffTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Retrying in ${backoffTime / 1000} seconds...`);
          setTimeout(() => fetchJobsWithBackoff(retryCount + 1), backoffTime);
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      } else if (response.status === 403) {
        throw new Error("Access forbidden. Check your API key or permissions.");
      } else if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setJobs(data?.results || []); // Safely accessing `results` or fallback to an empty array
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchJobsWithBackoff();
  }, []);

  return (
    <div className="job-list-container">
      {error && <p className="error-message">Error: {error}</p>}
      {!error && (!jobs || jobs.length === 0) && <p>Loading jobs or no jobs available...</p>}
      {jobs && jobs.length > 0 && (
        <ul className="job-list">
          {jobs.map((job, index) => (
            <li key={index} className="job-item">
              <h3>{job.jobtitle}</h3>
              <p>{job.company}</p>
              <p>{job.snippet}</p>
              <p>{job.formattedLocation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Api;
