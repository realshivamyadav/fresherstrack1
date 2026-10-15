import React from 'react';
import { Star, ChevronRight, Building, Award } from 'lucide-react';
import { TOP_COMPANIES } from '../data/initialJobs';

export default function TopRecruiters({ onSelectCompany }) {
  return (
    <div className="py-8 border-b border-[#e7e7f1] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#121224] flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Top Companies Hiring on Campus
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Recruiters actively visiting campus and conducting hiring assessments
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-0.5">
            View all 114 companies <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {TOP_COMPANIES.map((company) => (
            <div
              key={company.name}
              onClick={() => onSelectCompany(company.name)}
              className="group bg-white border border-[#e7e7f1] hover:border-blue-400 rounded-2xl p-3.5 text-center cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shadow-sm border border-gray-100 mb-2 group-hover:scale-105 transition-transform">
                <span className={`w-full h-full rounded-xl flex items-center justify-center ${company.color} font-black`}>
                  {company.logo}
                </span>
              </div>

              <div className="w-full">
                <h3 className="font-bold text-sm text-[#121224] truncate group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-600">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-gray-800">{company.rating}</span>
                  <span className="text-[11px] text-gray-400">({company.reviews})</span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100">
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full truncate max-w-full">
                    {company.hires}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
