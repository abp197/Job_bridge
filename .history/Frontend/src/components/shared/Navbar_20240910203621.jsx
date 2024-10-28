import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              <span className="text-blue-500">Job</span>
              <span className="text-gray-700">Portel</span>
            </a>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex md:space-x-8 justify-center flex-grow">
            <a href="/" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="/jobs" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Jobs
            </a>
            <a href="/browse" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </a>
          </div>

          {/* Login & Sign Up Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-transparent text-gray-500 hover:text-blue-500 font-medium py-2 px-4 rounded">
              Login
            </button>
            <button className="bg-blue-500 text-white hover:bg-blue-600 font-medium py-2 px-4 rounded">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-blue-500 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/jobs" className="block text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Jobs
            </a>
            <a href="/browse" className="block text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Browse
            </a>
            <button className="block w-full text-left text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Login
            </button>
            <button className="block w-full bg-blue-500 text-white hover:bg-blue-600 font-medium py-2 px-3 rounded-md">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
