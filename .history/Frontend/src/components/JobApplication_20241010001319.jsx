/* eslint-disable no-unused-vars */
// src/JobApplication.jsx
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Job Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Link to CV"
          value={cvLink}
          onChange={(e) => setCvLink(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        >
          Apply
        </button>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default JobApplication;
