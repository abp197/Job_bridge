import React from 'react'

const HeroSection = () => {
  return (
    <div class="text-center">
  <div class="flex flex-col gap-5 my-10">
    <span class="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">No. 1 Job Hunt Website</span>
    <h1 class="text-5xl font-bold">Search, Apply & <br /> Get Your <span class="text-[#6A38C2]">Dream Jobs</span></h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
    
    <div class="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
      <input
        type="text"
        placeholder="Find your dream jobs"
        class="outline-none border-none w-full"
      />
      <button class="rounded-r-full bg-[#6A38C2] p-3 text-white">
        <!-- Icon placeholder for Search -->
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a7 7 0 107 7 7 7 0 00-7-7zM21 21l-4.35-4.35" />
        </svg>
      </button>
    </div>
  </div>
</div>


  )
}

export default HeroSection