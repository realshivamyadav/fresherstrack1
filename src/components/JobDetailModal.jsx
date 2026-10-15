import React, { useState } from 'react';
import { X, Building2, MapPin, Briefcase, IndianRupee, Star, GraduationCap, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Share2, Bookmark, ExternalLink, Sparkles, Zap, ArrowRight, Award, Mail, Copy, Check } from 'lucide-react';

export default function JobDetailModal({
  job,
  onClose,
  onApply,
  isApplied,
  studentProfile = { name: "Harshil Patel", branch: "CSE", cgpa: 8.64, backlogs: 0 },
  onAiAnalyze,
  onAiMockInterview
}) {
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!job) return null;

  // Verify eligibility against student profile
  const isCgpaEligible = studentProfile.cgpa >= (job.eligibility?.minCgpa || 0);
  const isBranchEligible = job.eligibility?.branches.some(b => 
    b.toLowerCase().includes("all") || b.toLowerCase().includes(studentProfile.branch.toLowerCase())
  );
  const isBacklogEligible = studentProfile.backlogs <= (job.eligibility?.maxBacklogs ?? 0);
  const isFullyEligible = isCgpaEligible && isBranchEligible && isBacklogEligible;

  const handleApplyClick = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setSuccess(true);
      onApply(job);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-20 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Drive ID: #CP-{job.naukriJobId ? job.naukriJobId.slice(-6) : "2026"}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {job.source}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Company & Role Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                job.driveType === 'Super Dream' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {job.driveType} • {job.batch}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121224] leading-tight">
                {job.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-700 flex-wrap pt-1">
                <span className="font-bold text-gray-900">{job.company}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs font-bold text-amber-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{job.rating}</span>
                </div>
                <span className="text-gray-500 text-xs font-medium">({job.reviewsCount})</span>
              </div>
            </div>

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black border ${job.logoBg} shrink-0 shadow-sm`}>
              {job.logoText}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" /> Annual Package
              </span>
              <p className="text-base font-extrabold text-emerald-700 mt-0.5">{job.salary}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Experience
              </span>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{job.experience}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> Location
              </span>
              <p className="text-sm font-bold text-gray-800 mt-0.5 truncate">{job.location}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-purple-600" /> Work Mode
              </span>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{job.workMode}</p>
            </div>
          </div>

          {/* Student Automated Eligibility Verification Box */}
          <div className="border border-blue-200 bg-blue-50/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Automated Campus Eligibility Audit
              </h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                isFullyEligible 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {isFullyEligible ? "You Are Eligible to Apply" : "Criteria Not Met"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                {isCgpaEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-gray-700">CGPA Requirement</div>
                  <div className="text-gray-500 text-[11px]">
                    Cutoff: {job.eligibility?.minCgpa} • Yours: <strong>{studentProfile.cgpa}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                {isBranchEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-gray-700">Branch Matching</div>
                  <div className="text-gray-500 text-[11px]">
                    Allowed: {job.eligibility?.branches.join(", ")}
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                {isBacklogEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-gray-700">Backlogs Status</div>
                  <div className="text-gray-500 text-[11px]">
                    Max: {job.eligibility?.maxBacklogs} • Yours: <strong>{studentProfile.backlogs}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description & Details */}
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-2">Job Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Skills */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-2.5">Key Skills & Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Selection Process & Rounds */}
          {job.rounds && job.rounds.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3">Campus Selection Rounds</h3>
              <div className="space-y-2.5">
                {job.rounds.map((round, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800">{round.name}</span>
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {round.duration}
                        </span>
                      </div>
                      <p className="text-gray-500 mt-0.5">{round.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gemini AI Campus Prep Toolkit */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 fill-indigo-600 animate-pulse" />
                <span className="font-bold text-xs text-gray-900 uppercase tracking-wide">
                  Gemini AI Campus Prep Suite
                </span>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200">
                Live AI Models
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onAiAnalyze && onAiAnalyze(job)}
                className="p-3 bg-white hover:bg-blue-50/70 rounded-xl border border-blue-200 text-left transition flex items-center justify-between group shadow-sm hover:border-blue-400"
              >
                <div>
                  <div className="font-bold text-xs text-blue-900 group-hover:text-blue-600 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                    Audit Resume Fit & ATS
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Match score & tailored bullet points
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onAiMockInterview && onAiMockInterview(job)}
                className="p-3 bg-white hover:bg-purple-50/70 rounded-xl border border-purple-200 text-left transition flex items-center justify-between group shadow-sm hover:border-purple-400"
              >
                <div>
                  <div className="font-bold text-xs text-purple-900 group-hover:text-purple-600 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    AI Mock Interview
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Simulate {job.company} technical panel
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Service Agreement / Bond Notice */}
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Service Agreement: <strong>{job.eligibility?.bond || "No Bond Policy"}</strong>. Verified by Campus Placement Cell.
            </span>
          </div>
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="text-xs text-gray-500 hidden sm:block">
            <span>Posted: <strong>{job.postedDays}</strong> • <strong>{job.applicants}</strong> candidates applied</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => alert("Redirecting to verified company career portal...")}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Company Portal</span>
            </button>

            {isApplied || success ? (
              <button
                disabled
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Application Submitted</span>
              </button>
            ) : (
              <button
                onClick={handleApplyClick}
                disabled={applying || !isFullyEligible}
                className={`px-8 py-2.5 font-bold text-xs rounded-xl shadow-md transition transform active:scale-95 flex items-center gap-2 text-white ${
                  isFullyEligible 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25' 
                    : 'bg-gray-400 cursor-not-allowed opacity-75'
                }`}
              >
                {applying ? (
                  <span>Submitting Application...</span>
                ) : !isFullyEligible ? (
                  <span>Criteria Not Met</span>
                ) : (
                  <span>Apply with Campus Profile</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
