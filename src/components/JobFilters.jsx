import React from 'react';
import { Filter, RotateCcw, CheckSquare, Square, Building2, Briefcase, DollarSign, Award, Layers } from 'lucide-react';

export default function JobFilters({
  filters,
  setFilters,
  onReset,
  totalResults
}) {
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const workModes = ["Work from office", "Hybrid", "Remote"];
  const salaryRanges = ["0-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"];
  const driveTypes = ["Super Dream", "Dream", "Day 1 Drive", "Direct Corporate Drive"];
  const departments = ["Software Engineering", "Frontend Engineering", "Data Science & AI", "Data & Consulting"];
  const branches = ["CSE", "IT", "ECE", "All Branches"];

  return (
    <aside className="bg-white rounded-2xl border border-[#e7e7f1] p-5 shadow-sm divide-y divide-gray-100 sticky top-20">
      {/* Header */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-[#121224] text-base">All Filters</h3>
          <span className="text-xs text-gray-500 font-medium">({totalResults} jobs)</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* Drive Type (Campus Specific) */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          Campus Drive Tier
        </h4>
        <div className="space-y-2">
          {driveTypes.map(type => {
            const isChecked = (filters.driveTypes || []).includes(type);
            return (
              <label
                key={type}
                onClick={() => toggleFilter("driveTypes", type)}
                className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-blue-600 cursor-pointer select-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={isChecked ? "font-semibold text-blue-600" : ""}>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Work Mode */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-500" />
          Work Mode
        </h4>
        <div className="space-y-2">
          {workModes.map(mode => {
            const isChecked = (filters.workModes || []).includes(mode);
            return (
              <label
                key={mode}
                onClick={() => toggleFilter("workModes", mode)}
                className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-blue-600 cursor-pointer select-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={isChecked ? "font-semibold text-blue-600" : ""}>{mode}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Salary / CTC Range */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          Salary (LPA)
        </h4>
        <div className="space-y-2">
          {salaryRanges.map(range => {
            const isChecked = (filters.salaryRanges || []).includes(range);
            return (
              <label
                key={range}
                onClick={() => toggleFilter("salaryRanges", range)}
                className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-blue-600 cursor-pointer select-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={isChecked ? "font-semibold text-blue-600" : ""}>{range}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Department / Category */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
          Department
        </h4>
        <div className="space-y-2">
          {departments.map(dept => {
            const isChecked = (filters.departments || []).includes(dept);
            return (
              <label
                key={dept}
                onClick={() => toggleFilter("departments", dept)}
                className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-blue-600 cursor-pointer select-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={isChecked ? "font-semibold text-blue-600 truncate" : "truncate"}>
                  {dept}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Branch Eligibility (Campus Exclusive) */}
      <div className="pt-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-500" />
          Branch Eligibility
        </h4>
        <div className="space-y-2">
          {branches.map(br => {
            const isChecked = (filters.branches || []).includes(br);
            return (
              <label
                key={br}
                onClick={() => toggleFilter("branches", br)}
                className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-blue-600 cursor-pointer select-none"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={isChecked ? "font-semibold text-blue-600" : ""}>{br}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
