import React from 'react';
import { Star, Briefcase, MapPin, IndianRupee, Bookmark, CheckCircle, ExternalLink, GraduationCap, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function JobCard({
  job,
  onSelect,
  isSaved,
  onToggleSave,
  isApplied,
  onAiAnalyze,
  index = 0
}) {
  return (
    <div 
      style={{ animationDelay: `${(index % 8) * 45}ms` }}
      className="bg-white rounded-2xl border border-[#e7e7f1] p-5 sm:p-6 hover:shadow-[0_12px_30px_0_rgba(39,93,245,0.1)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between animate-fadeInUp"
    >
      <div>
        {/* Top Header Row: Title, Company, Logo */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {job.isExtracted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Verified Corporate Drive
                </span>
              )}

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                job.driveType === 'Super Dream'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : job.driveType === 'Dream'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {job.driveType}
              </span>

              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Batch: {job.batch}
              </span>
            </div>

            {/* Job Title */}
            <h3 
              onClick={() => onSelect(job)}
              className="text-base sm:text-lg font-bold text-[#121224] group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
            >
              {job.title}
            </h3>

            {/* Company & Rating */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="font-semibold text-sm text-gray-700">{job.company}</span>
              
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-800">{job.rating}</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              </div>

              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{job.reviewsCount}</span>
            </div>
          </div>

          {/* Company Logo Badge */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${job.logoBg}`}>
            {job.logoText}
          </div>
        </div>

        {/* 3-Point Details Strip (Exp, Salary, Location) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{job.experience}</span>
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-gray-800 truncate">{job.salary}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{job.location} ({job.workMode})</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Campus Placement Specific Highlights */}
        {job.eligibility && (
          <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px] text-gray-600 bg-gray-50 p-2 rounded-xl border border-gray-100">
            <span className="font-bold text-gray-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              Eligibility:
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
              Min CGPA: <strong>{job.eligibility.minCgpa}</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
              Branches: <strong>{job.eligibility.branches.slice(0, 3).join(", ")}</strong>
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
              Bond: <strong>{job.eligibility.bond}</strong>
            </span>
          </div>
        )}

        {/* Skill Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-gray-600 bg-[#f5f6fa] hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded-md transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Strip */}
      <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {job.postedDays}
          </span>
          <span className="flex items-center gap-1 text-[11px] hidden sm:flex">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {job.applicants} Applied
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Match Button */}
          {onAiAnalyze && (
            <button
              onClick={() => onAiAnalyze(job)}
              className="px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-700 font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
              title="Audit Resume Fit with Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600 animate-pulse" />
              <span>AI Match</span>
            </button>
          )}

          {/* Save Bookmark */}
          <button
            onClick={() => onToggleSave(job.id)}
            className={`p-2 rounded-lg border transition ${
              isSaved 
                ? 'bg-blue-50 border-blue-300 text-blue-600' 
                : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50'
            }`}
            title={isSaved ? "Saved Job" : "Save Job"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>

          {/* Quick Details / Apply Button */}
          {isApplied ? (
            <button
              onClick={() => onSelect(job)}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-300 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Applied
            </button>
          ) : (
            <button
              onClick={() => onSelect(job)}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition transform active:scale-95 flex items-center gap-1"
            >
              <span>View & Apply</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
