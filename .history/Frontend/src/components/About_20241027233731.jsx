import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Introduction Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800">About Job Bridge</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Job Bridge is a platform dedicated to connecting job seekers with career opportunities and helping businesses find the right talent.
          Our mission is to bridge the gap between talent and opportunity through a seamless and innovative platform.
        </p>
      </div>

      {/* Mission Section */}
      <div className="text-center mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          We strive to empower individuals and organizations by simplifying the job search and recruitment process.
          Our mission is to create meaningful career connections and foster professional growth.
        </p>
      </div>

      {/* Values Section */}
      <div className="text-center mb-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">Our Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            <h4 className="text-xl font-medium text-gray-800 mb-2">Integrity</h4>
            <p className="text-gray-600">We uphold honesty and integrity in everything we do.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            <h4 className="text-xl font-medium text-gray-800 mb-2">Innovation</h4>
            <p className="text-gray-600">We constantly innovate to provide the best solutions.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            <h4 className="text-xl font-medium text-gray-800 mb-2">Collaboration</h4>
            <p className="text-gray-600">We believe in the power of teamwork to drive success.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            <h4 className="text-xl font-medium text-gray-800 mb-2">Excellence</h4>
            <p className="text-gray-600">We strive for excellence in all our endeavors.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example Team Member */}
          <div className="flex flex-col items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHIoIcEYxvjlg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706379373838?e=1735776000&v=beta&t=6XsSl_2eC0Vb79MrWpLj9c-MXeJEXFEqDfkpO_7d39w"
              alt="Shubham Patil"
              className="w-24 h-24 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform"
            />
            <h4 className="text-lg font-medium text-gray-800">Shubham Patil</h4>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          {/* Add more team members similarly */}
        </div>
      </div>
    </div>
  );
};

export default About;
