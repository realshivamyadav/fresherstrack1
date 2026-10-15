import React from 'react';
import { Award, Users, TrendingUp, Building2, Calendar, Download, Zap, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { CAMPUS_STATS } from '../data/initialJobs';

export default function CampusDashboard({ totalJobsInSystem }) {
  const branches = [
    { name: "Computer Science (CSE)", total: 320, placed: 295, pct: "92%" },
    { name: "Information Tech (IT)", total: 180, placed: 158, pct: "88%" },
    { name: "Electronics & Comm (ECE)", total: 240, placed: 188, pct: "78%" },
    { name: "Electrical (EEE)", total: 140, placed: 91, pct: "65%" },
    { name: "Mechanical Engg", total: 100, placed: 58, pct: "58%" },
  ];

  const upcomingDrives = [
    { company: "TCS Digital", date: "Oct 20, 2026", type: "Day 1 Mass", ctc: "7.2 - 9 LPA", eligible: 540 },
    { company: "Microsoft India", date: "Oct 24, 2026", type: "Super Dream", ctc: "24 - 32 LPA", eligible: 180 },
    { company: "Swiggy", date: "Oct 28, 2026", type: "Product Super Dream", ctc: "16 - 22 LPA", eligible: 210 },
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Training & Placement Cell (TPO) Central Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Campus Placement Season 2025-2026
            </h1>
            <p className="text-sm text-slate-300">
              Real-time monitoring of campus recruitment drives, student eligibility, and placement statistics.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => alert("Placement summary report downloaded (CSV / PDF)!")}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-2xl border border-white/20 transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export Placement Report</span>
            </button>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e7e7f1] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Placement Rate</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">{CAMPUS_STATS.placementRate}</span>
              <p className="text-xs text-gray-500 mt-1">
                <strong>{CAMPUS_STATS.placedStudents}</strong> of {CAMPUS_STATS.eligibleStudents} students placed
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e7e7f1] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Highest Package</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-purple-700">{CAMPUS_STATS.highestCtc}</span>
              <p className="text-xs text-gray-500 mt-1">Offered by Google India (SDE)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e7e7f1] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Average Package</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-blue-700">{CAMPUS_STATS.avgCtc}</span>
              <p className="text-xs text-gray-500 mt-1">+14.2% YoY increase vs 2024</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e7e7f1] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Total Drives</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">{totalJobsInSystem} Active</span>
              <p className="text-xs text-gray-500 mt-1">114 visiting MNC recruiters</p>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Branch-wise Stats + Upcoming Drives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branch-wise Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-[#e7e7f1] shadow-sm">
            <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Department Placement Distribution
            </h3>
            <div className="space-y-4">
              {branches.map(b => (
                <div key={b.name} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-gray-800">{b.name}</span>
                    <span className="text-blue-600 font-bold">{b.pct} ({b.placed}/{b.total})</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: b.pct }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming On-Campus Drives Calendar */}
          <div className="bg-white rounded-2xl p-6 border border-[#e7e7f1] shadow-sm">
            <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Upcoming On-Campus Drives (This Month)
            </h3>
            <div className="space-y-3">
              {upcomingDrives.map(drive => (
                <div
                  key={drive.company}
                  className="p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{drive.company}</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {drive.type}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Package: <strong>{drive.ctc}</strong> • Eligible: <strong>{drive.eligible} Students</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {drive.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
