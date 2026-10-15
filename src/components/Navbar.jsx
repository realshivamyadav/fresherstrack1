import React from 'react';
import { Briefcase, Building2, GraduationCap, Search, Bell, Bookmark, Zap, User, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  savedCount, 
  appliedCount, 
  onOpenApplied, 
  isTpoMode, 
  setIsTpoMode 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e7e7f1] shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      {/* Top Banner Notice for Campus */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-coral-500 bg-[#ff7555] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Campus Drive 2025-26
            </span>
            <span>Placement Season Active • TCS, Google, Microsoft, Infosys & 40+ Recruiters Hiring</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span>TPO Helpline: <strong>+91 80-2856-9900</strong></span>
            <span>|</span>
            <button 
              onClick={() => setIsTpoMode(!isTpoMode)}
              className="text-amber-300 hover:text-white font-medium underline transition"
            >
              {isTpoMode ? "Switch to Student View" : "TPO Admin Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => setCurrentTab('jobs')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-2xl font-black tracking-tight text-[#121224]">Freshers</span>
                  <span className="text-2xl font-black tracking-tight text-blue-600">Track</span>
                  <span className="w-2 h-2 rounded-full bg-[#ff7555] ml-0.5 mb-2"></span>
                </div>
                <span className="text-[10px] text-gray-500 -mt-1 font-medium tracking-wider uppercase">
                  Official Campus Placement & Career Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('jobs')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'jobs' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Jobs & Drives
              </button>

              <button
                onClick={() => setCurrentTab('companies')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'companies' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Top Recruiters
              </button>

              <button
                onClick={() => setCurrentTab('analytics')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'analytics' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                Placement Insights
              </button>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">

            {/* My Applications Tracker Button */}
            <button
              onClick={onOpenApplied}
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-gray-200"
              title="Track Applied Drives"
            >
              <Bookmark className="w-5 h-5" />
              {appliedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {appliedCount}
                </span>
              )}
            </button>

            {/* Student Profile Chip */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm">
                HP
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-800 leading-tight">Harshil Patel</span>
                <span className="text-[11px] text-emerald-600 font-semibold leading-tight">CSE • 8.64 CGPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
