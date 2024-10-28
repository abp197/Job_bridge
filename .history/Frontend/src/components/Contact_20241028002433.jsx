/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';

const Contact = () => {
  return (
    <div>
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-indigo-600">Get in <span className="text-gray-800">Touch</span></h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
          We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 text-white font-medium bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
        <p className="text-gray-600">
          <strong>Email:</strong> info@jobbridge.com
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> +1 (234) 567-8901
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong> 123 Job Bridge Street, City, Country
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <a href="https://facebook.com" className="text-indigo-600 hover:text-indigo-800 transition">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://twitter.com" className="text-blue-500 hover:text-blue-700 transition">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900 transition">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
    
  );
};

export default Contact;
