/* eslint-disable no-unused-vars */
// src/JobApplication.jsx
import React, { useState } from 'react';
import axios from 'axios';

const JobApplication = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cvLink, setCvLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const jobId = 'YOUR_JOB_ID'; // Replace with the actual job ID

    try {
      const response = await axios.post(
        `https://yourcompany.workable.com/spi/v3/jobs/${jobId}/candidates`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          cv: cvLink,
          cover_letter: coverLetter,
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Application submitted successfully!');
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setCvLink('');
        setCoverLetter('');
      }
    } catch (error) {
      setError('Error submitting application. Please try again.');
    }
  };

  return (
    <div>
      <h2>Job Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link to CV"
          value={cvLink}
          onChange={(e) => setCvLink(e.target.value)}
          required
        />
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
        <button type="submit">Apply</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JobApplication;
