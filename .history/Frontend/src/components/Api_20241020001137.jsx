import React, { useEffect, useState } from 'react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
                    'x-rapidapi-host': 'indeed-indeed.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch('https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=java&l=austin%2C%20tx&radius=25', options);
                const data = await response.json();
                setJobs(data.results); // Save jobs to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.jobkey}>
                        {job.jobtitle} - {job.company}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
