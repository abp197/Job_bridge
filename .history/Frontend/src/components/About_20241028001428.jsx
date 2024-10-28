/* eslint-disable no-unused-vars */
import React from 'react';

const About = () => {
  return (
    <div>
        <N
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Introduction Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">About <span className="text-gray-800">Job Bridge</span></h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
          Job Bridge is a platform dedicated to connecting job seekers with career opportunities and helping businesses find the right talent.
          Our mission is to bridge the gap between talent and opportunity through a seamless and innovative platform.
        </p>
      </div>

      {/* Mission Section */}
      <div className="text-center mb-16 p-8 rounded-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg">
        <h3 className="text-3xl font-semibold text-indigo-700">Our Mission</h3>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-800">
          We strive to empower individuals and organizations by simplifying the job search and recruitment process.
          Our mission is to create meaningful career connections and foster professional growth.
        </p>
      </div>

      {/* Values Section */}
      <div className="text-center mb-16">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">Our Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-4 border-indigo-500">
            <h4 className="text-xl font-medium text-indigo-600 mb-2">Integrity</h4>
            <p className="text-gray-600">We uphold honesty and integrity in everything we do.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-4 border-purple-500">
            <h4 className="text-xl font-medium text-purple-600 mb-2">Innovation</h4>
            <p className="text-gray-600">We constantly innovate to provide the best solutions.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-4 border-pink-500">
            <h4 className="text-xl font-medium text-pink-600 mb-2">Collaboration</h4>
            <p className="text-gray-600">We believe in the power of teamwork to drive success.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 border-l-4 border-teal-500">
            <h4 className="text-xl font-medium text-teal-600 mb-2">Excellence</h4>
            <p className="text-gray-600">We strive for excellence in all our endeavors.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16 p-8 rounded-lg bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-100 shadow-lg">
        <h3 className="text-3xl font-semibold text-teal-700 mb-8">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example Team Member */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Shubham Patil"
              className="w-24 h-24 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform border-4 border-teal-400"
            />
            <h4 className="text-lg font-medium text-gray-800">Shubham Patil</h4>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          {/* Add more team members similarly */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
