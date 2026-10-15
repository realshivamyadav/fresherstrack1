import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import TopRecruiters from './components/TopRecruiters';
import JobFilters from './components/JobFilters';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import AppliedDrawer from './components/AppliedDrawer';
import CampusDashboard from './components/CampusDashboard';
import PlacementCopilotChat from './components/PlacementCopilotChat';
import AiResumeAnalyzerModal from './components/AiResumeAnalyzerModal';
import AiMockInterviewModal from './components/AiMockInterviewModal';
import { INITIAL_JOBS } from './data/initialJobs';
import { Briefcase, SlidersHorizontal, ArrowUpDown, Sparkles, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(["job-nk-103"]); // Default 1 applied (TCS)
  const [selectedJob, setSelectedJob] = useState(null);
  const [analyzingJob, setAnalyzingJob] = useState(null);
  const [mockInterviewJob, setMockInterviewJob] = useState(null);
  const [isAppliedDrawerOpen, setIsAppliedDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('jobs'); // 'jobs' | 'companies' | 'analytics'
  const [isTpoMode, setIsTpoMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance"); // 'relevance' | 'salary-high' | 'recent'
  const [filters, setFilters] = useState({
    workModes: [],
    salaryRanges: [],
    driveTypes: [],
    departments: [],
    branches: []
  });

  const studentProfile = {
    name: "Harshil Patel",
    branch: "CSE",
    cgpa: 8.64,
    backlogs: 0,
    batch: "2026"
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleSave = (jobId) => {
    setSavedJobIds(prev => {
      const isSaved = prev.includes(jobId);
      const updated = isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showToast(isSaved ? "Drive removed from saved list" : "Drive saved to your bookmarks");
      return updated;
    });
  };

  const handleApplyJob = (job) => {
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds(prev => [...prev, job.id]);
      showToast(`Successfully applied to ${job.company} (${job.title})!`);
    }
  };

  const handleImportJobs = (newJobs) => {
    setJobs(prev => [...newJobs, ...prev]);
    showToast(`Successfully imported ${newJobs.length} live corporate drives!`);
  };

  const handleResetFilters = () => {
    setFilters({
      workModes: [],
      salaryRanges: [],
      driveTypes: [],
      departments: [],
      branches: []
    });
    setSearchQuery("");
    setExperienceFilter("all");
    setLocationFilter("all");
  };

  // Helper to parse numerical CTC for sorting & filtering
  const getMinMaxCtc = (salaryStr) => {
    if (!salaryStr) return { min: 0, max: 0 };
    const numbers = salaryStr.match(/(\d+(\.\d+)?)/g);
    if (!numbers) return { min: 0, max: 0 };
    const parsed = numbers.map(Number);
    return {
      min: parsed[0] || 0,
      max: parsed[parsed.length - 1] || parsed[0] || 0
    };
  };

  // Filtered and Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Text Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(query);
        const inCompany = job.company.toLowerCase().includes(query);
        const inSkills = job.skills.some(s => s.toLowerCase().includes(query));
        const inDesc = job.description.toLowerCase().includes(query);
        if (!inTitle && !inCompany && !inSkills && !inDesc) {
          return false;
        }
      }

      // 2. Experience Filter
      if (experienceFilter !== "all") {
        if (!job.experience.toLowerCase().includes(experienceFilter.toLowerCase())) {
          return false;
        }
      }

      // 3. Location Filter
      if (locationFilter !== "all") {
        if (!job.location.toLowerCase().includes(locationFilter.toLowerCase())) {
          return false;
        }
      }

      // 4. Work Mode Facet
      if (filters.workModes.length > 0) {
        if (!filters.workModes.includes(job.workMode)) return false;
      }

      // 5. Drive Type Facet
      if (filters.driveTypes.length > 0) {
        if (!filters.driveTypes.includes(job.driveType)) return false;
      }

      // 6. Department Facet
      if (filters.departments.length > 0) {
        if (!filters.departments.includes(job.department)) return false;
      }

      // 7. Branch Eligibility Facet
      if (filters.branches.length > 0) {
        const matchesBranch = filters.branches.some(br => 
          job.eligibility?.branches.some(b => b.toLowerCase().includes(br.toLowerCase()) || b.toLowerCase().includes("all"))
        );
        if (!matchesBranch) return false;
      }

      // 8. Salary Range Facet
      if (filters.salaryRanges.length > 0) {
        const { min, max } = getMinMaxCtc(job.salary);
        const matchesRange = filters.salaryRanges.some(range => {
          if (range === "0-6 LPA") return min <= 6;
          if (range === "6-10 LPA") return (max >= 6 && min <= 10);
          if (range === "10-15 LPA") return (max >= 10 && min <= 15);
          if (range === "15+ LPA") return max >= 15;
          return false;
        });
        if (!matchesRange) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary-high') {
        const ctcA = getMinMaxCtc(a.salary).max;
        const ctcB = getMinMaxCtc(b.salary).max;
        return ctcB - ctcA;
      }
      if (sortBy === 'recent') {
        return a.postedDays.includes("Just") ? -1 : 1;
      }
      return 0; // Relevance
    });
  }, [jobs, searchQuery, experienceFilter, locationFilter, filters, sortBy]);

  const appliedJobsList = useMemo(() => {
    return jobs.filter(j => appliedJobIds.includes(j.id));
  }, [jobs, appliedJobIds]);

  return (
    <div className="min-h-screen bg-[#f8f9fd] text-[#121224] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121224] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        savedCount={savedJobIds.length}
        appliedCount={appliedJobIds.length}
        onOpenApplied={() => setIsAppliedDrawerOpen(true)}
        isTpoMode={isTpoMode}
        setIsTpoMode={setIsTpoMode}
      />

      {/* Render Active View */}
      {isTpoMode || currentTab === 'analytics' ? (
        <CampusDashboard
          totalJobsInSystem={jobs.length}
        />
      ) : (
        <main className="flex-1">
          {/* Hero Search (Identical to Naukri layout) */}
          <HeroSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            onSearch={() => {}}
            totalJobsCount={jobs.length}
          />

          {/* Top Companies Carousel */}
          <TopRecruiters
            onSelectCompany={(compName) => setSearchQuery(compName)}
          />

          {/* Core Content: Left Sidebar Filters + Center Job List */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Sidebar Filter (Naukri style) */}
              <div className="w-full lg:w-72 shrink-0">
                <JobFilters
                  filters={filters}
                  setFilters={setFilters}
                  onReset={handleResetFilters}
                  totalResults={filteredJobs.length}
                />
              </div>

              {/* Center Job Listings */}
              <div className="flex-1 w-full space-y-4">
                {/* Result header & Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e7e7f1]">
                  <div>
                    <h2 className="text-base font-bold text-[#121224]">
                      Showing {filteredJobs.length} {filteredJobs.length === 1 ? "Job Drive" : "Job Drives"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Matched for Campus 2025/2026 Batch & Verified Corporate Drives
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="salary-high">Salary: High to Low</option>
                      <option value="recent">Latest / Freshly Added</option>
                    </select>
                  </div>
                </div>

                {/* Job Cards */}
                {filteredJobs.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-[#e7e7f1] p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">No drives match your filters</h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                        Try adjusting your search criteria or reset your filters to see all campus recruitment drives.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredJobs.map((job, idx) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      index={idx}
                      onSelect={(j) => setSelectedJob(j)}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSave}
                      isApplied={appliedJobIds.includes(job.id)}
                      onAiAnalyze={(j) => setAnalyzingJob(j)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Detail Slide-over / Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApplyJob}
          isApplied={appliedJobIds.includes(selectedJob.id)}
          studentProfile={studentProfile}
          onAiAnalyze={(j) => setAnalyzingJob(j)}
          onAiMockInterview={(j) => setMockInterviewJob(j)}
        />
      )}

      {/* AI Resume Analyzer & ATS Audit Modal */}
      {analyzingJob && (
        <AiResumeAnalyzerModal
          job={analyzingJob}
          isOpen={!!analyzingJob}
          onClose={() => setAnalyzingJob(null)}
          studentProfile={studentProfile}
        />
      )}

      {/* AI Mock Technical & HR Interview Simulator */}
      {mockInterviewJob && (
        <AiMockInterviewModal
          job={mockInterviewJob}
          isOpen={!!mockInterviewJob}
          onClose={() => setMockInterviewJob(null)}
        />
      )}

      {/* Applied Drives Drawer */}
      <AppliedDrawer
        isOpen={isAppliedDrawerOpen}
        onClose={() => setIsAppliedDrawerOpen(false)}
        appliedJobs={appliedJobsList}
        onSelectJob={(job) => {
          setIsAppliedDrawerOpen(false);
          setSelectedJob(job);
        }}
      />

      {/* 24/7 Gemini Campus AI Copilot Chat */}
      <PlacementCopilotChat activeJobs={jobs} />

      {/* Naukri-style Detailed Footer */}
      <footer className="bg-white border-t border-[#e7e7f1] mt-16 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">Campus Placement</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">On-Campus Drives 2025-26</a></li>
                <li><a href="#" className="hover:text-blue-600">National Corporate Drives</a></li>
                <li><a href="#" className="hover:text-blue-600">Day 1 Recruiter Schedules</a></li>
                <li><a href="#" className="hover:text-blue-600">Super Dream Offers (&gt;15 LPA)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">Preparation & Tests</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">TCS NQT Prep Papers</a></li>
                <li><a href="#" className="hover:text-blue-600">Infosys HackWithInfy Guide</a></li>
                <li><a href="#" className="hover:text-blue-600">Cognizant GenC Question Bank</a></li>
                <li><a href="#" className="hover:text-blue-600">DSA & System Design Mock Test</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">Recruitment Network</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">Enterprise ATS Integration</a></li>
                <li><a href="#" className="hover:text-blue-600">Real-Time Industry Feeds</a></li>
                <li><a href="#" className="hover:text-blue-600">Verified Recruiter Badges</a></li>
                <li><a href="#" className="hover:text-blue-600">Fresher Engineering Feeds</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">TPO Cell Contact</h4>
              <ul className="space-y-2">
                <li>Email: <strong>placement@campus.edu</strong></li>
                <li>Support: <strong>+91 80-2856-9900</strong></li>
                <li>Placement Hall, Block-C, Campus</li>
                <li>Timings: Mon - Sat 9:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-gray-800 text-sm">PlacementHub</span>
              <span>• Official Campus Career & Training Portal</span>
            </div>
            <span>© 2026 PlacementHub Campus Career Portal. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
