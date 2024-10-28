import React from 'react';

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No jobs available</p>;
  }

  return (
    <div>
      {jobs.map((job, index) => (
        <div key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
