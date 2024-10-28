/* eslint-disable no-unused-vars */
import React from 'react'

const Shubham = () => {
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