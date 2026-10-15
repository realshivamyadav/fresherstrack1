import React from 'react';
import { X, CheckCircle, Clock, Calendar, ExternalLink, Award, FileText, ChevronRight } from 'lucide-react';

export default function AppliedDrawer({ isOpen, onClose, appliedJobs = [], onSelectJob }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-extrabold text-lg text-gray-900">Campus Applications Tracker</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {appliedJobs.length} active placement applications
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Applications */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {appliedJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400 space-y-3">
              <FileText className="w-12 h-12 mx-auto text-gray-300" />
              <p className="text-sm font-semibold text-gray-600">No applications submitted yet</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore campus drives and apply with your verified profile to track updates here.
              </p>
            </div>
          ) : (
            appliedJobs.map((app) => (
              <div
                key={app.id}
                onClick={() => onSelectJob(app)}
                className="p-4 rounded-2xl border border-gray-200 hover:border-blue-300 bg-white hover:shadow-md transition cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 uppercase">
                      {app.driveType}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900 mt-1">{app.title}</h3>
                    <p className="text-xs text-gray-600 font-medium">{app.company} • {app.salary}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border ${app.logoBg}`}>
                    {app.logoText}
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-gray-700 font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Status: Resume Shortlisted
                    </span>
                    <span className="text-blue-600 font-bold">Round 1 OA</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-2/5"></div>
                  </div>
                  <p className="text-gray-500 text-[10px] pt-0.5">
                    Online assessment link will be sent to student college email ID.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-gray-400">Applied: Today</span>
                  <span className="text-blue-600 font-bold flex items-center gap-0.5 text-xs">
                    View Drive Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-slate-50 text-center">
          <p className="text-xs text-gray-500">
            Official records synced with TPO Database
          </p>
        </div>
      </div>
    </div>
  );
}
