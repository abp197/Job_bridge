import React, { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile pop-up

  // Mock user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

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
          <div className="hidden md:flex md:space-x-8 items-center">
            <a href="/" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="/jobs" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Jobs
            </a>
            <a href="/browse" className="text-gray-500 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </a>

            {/* Conditional rendering based on login status */}
            {!isLoggedIn ? (
              <>
                <button className="bg-transparent text-gray-500 hover:text-blue-500 font-medium py-2 px-4 rounded">
                  Login
                </button>
                <button className="bg-blue-500 text-white hover:bg-blue-600 font-medium py-2 px-4 rounded">
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative">
                <button onClick={() => setShowProfile(!showProfile)} className="focus:outline-none">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </button>

                {/* Profile pop-up window */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <div className="px-4 py-2 text-gray-700">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                    <div className="border-t px-4 py-2">
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowProfile(false);
                        }}
                        className="block w-full text-left text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button className="text-gray-500 hover:text-blue-500 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
