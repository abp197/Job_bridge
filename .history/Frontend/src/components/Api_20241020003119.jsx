import React, { useEffect, useState } from 'react';

const Api = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=YOUR_APP_ID&app_key=YOUR_API_KEY&results_per_page=10&what=java&where=austin`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.company.display_name}</p>
              <p>{job.location.display_name}</p>
              <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">View Job</a>
            </li>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </ul>
    </div>
  );
};

export default Api;
