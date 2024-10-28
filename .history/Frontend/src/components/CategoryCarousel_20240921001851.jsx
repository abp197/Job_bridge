import React, { useState, useRef } from 'react';

const categories = [
  { id: 1, name: 'Frontend Developer' },
  { id: 2, name: 'Data Scientist' },
  { id: 3, name: 'Backend Developer' },
  { id: 4, name: '' },
  { id: 5, name: 'Construction' },
  { id: 6, name: 'Design' },
];

const CategoryCarousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Adjust scroll distance based on your needs
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Adjust scroll distance based on your needs
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md"
      >
        {/* Left Arrow Icon */}
        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto py-5 px-2"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[150px] bg-gray-100 rounded-lg p-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md"
      >
        {/* Right Arrow Icon */}
        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryCarousel;
