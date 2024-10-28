import React, { useState, useRef } from 'react';

const categories = [
  { id: 1, name: 'Technology', icon: '💻' },
  { id: 2, name: 'Finance', icon: '💰' },
  { id: 3, name: 'Healthcare', icon: '⚕️' },
  { id: 4, name: 'Education', icon: '📚' },
  { id: 5, name: 'Construction', icon: '🏗️' },
  { id: 6, name: 'Design', icon: '🎨' },
  
  // Add more categories as needed
];

const CategoryCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Adjust scroll distance based on your needs
        behavior: 'smooth',
      });
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Adjust scroll distance based on your needs
        behavior: 'smooth',
      });
      setScrollPosition(carouselRef.current.scrollLeft);
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
        className="flex gap-5 overflow-x-auto no-scrollbar py-5 px-2"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[150px] bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
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
