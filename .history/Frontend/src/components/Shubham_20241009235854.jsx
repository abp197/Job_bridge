/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const Shubham = () => {

    const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://jobs.github.com/positions.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data); // Adjust based on your API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <h2>Job Listings</h2>
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Shubham