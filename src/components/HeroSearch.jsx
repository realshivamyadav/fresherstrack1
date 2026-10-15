import React from 'react';
import { Search, Briefcase, MapPin, Sparkles, X } from 'lucide-react';

export default function HeroSearch({
  searchQuery,
  setSearchQuery,
  experienceFilter,
  setExperienceFilter,
  locationFilter,
  setLocationFilter,
  onSearch,
  totalJobsCount
}) {
  const trendingTags = [
    "Full Stack",
    "Data Analyst",
    "Fresher 2025",
    "TCS Digital",
    "Remote",
    "Day 1 Drive",
    "Super Dream (>15 LPA)",
    "Product Based"
  ];

  return (
    <div className="relative pt-8 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0f4ff] via-[#f8f9fd] to-[#f8f9fd] border-b border-[#e7e7f1]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-4 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Real-time Campus Placement Intelligence</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#121224] tracking-tight leading-tight">
          FreshersTrack: Smart <span className="text-blue-600">Campus Placement</span> & Fresher Jobs Portal
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#717478] max-w-2xl mx-auto">
          Explore {totalJobsCount}+ verified fresher campus drives, AI resume scoring, and mock interview prep for the 2025–2026 batch.
        </p>

        {/* Main Naukri-style 3-part search bar */}
        <div className="mt-8 bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#e7e7f1] max-w-4xl mx-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); onSearch(); }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200"
          >
            {/* Input 1: Keyword / Designation / Company */}
            <div className="flex-1 flex items-center px-4 py-3 sm:py-1">
              <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter skills / designations / companies"
                className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Input 2: Experience */}
            <div className="flex items-center px-4 py-3 sm:py-1 sm:w-48">
              <Briefcase className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full text-sm font-medium text-gray-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">Experience (All)</option>
                <option value="0 - 1 Yrs">Freshers (0 - 1 Yrs)</option>
                <option value="0 - 2 Yrs">0 - 2 Years</option>
                <option value="Internship">Internship Only</option>
              </select>
            </div>

            {/* Input 3: Location */}
            <div className="flex items-center px-4 py-3 sm:py-1 sm:w-52">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full text-sm font-medium text-gray-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">Location (All)</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Remote">Remote</option>
                <option value="Pan India">Pan India</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="p-2 sm:p-0 sm:pl-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl sm:rounded-full shadow-md shadow-blue-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Trending Filters */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-gray-500 font-medium mr-1">Trending:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                onSearch();
              }}
              className="px-3 py-1 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full border border-gray-200 transition-colors shadow-sm"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
