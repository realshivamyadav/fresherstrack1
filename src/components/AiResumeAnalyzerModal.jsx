import React, { useState, useRef } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, FileText, ArrowRight, Copy, Check, Zap, UploadCloud, File, Trash2, RefreshCw } from 'lucide-react';
import { analyzeResumeFit } from '../services/geminiService';
import { parseResumeFile } from '../utils/resumeParser';

export default function AiResumeAnalyzerModal({ isOpen, onClose, job, studentProfile }) {
  const [activeTab, setActiveTab] = useState("upload"); // "upload" | "text"
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState(
    `Harshil Patel | B.Tech Computer Science & Engineering (8.64 CGPA, 2026 Batch)\nCore Skills: Java, Python, C++, Data Structures, Algorithms, React.js, Node.js, SQL, Distributed Systems, Git.\nProjects: Full-stack Placement Intelligence Portal with React & Gemini AI; Real-time messaging service with WebSockets; Distributed cache simulation with Redis.\nCoursework: Operating Systems, Database Management Systems, Computer Networks, Object-Oriented Design.`
  );
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copiedBullet, setCopiedBullet] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen || !job) return null;

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadedFile(file);
    setIsParsingFile(true);
    setAnalysisResult(null);

    try {
      const extractedText = await parseResumeFile(file);
      setResumeText(extractedText);
    } catch (err) {
      console.error(err);
      alert("Could not read resume file. You can still paste your resume text directly.");
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeResumeFit(resumeText, job);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume. Please check your connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(idx);
    setTimeout(() => setCopiedBullet(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">AI Resume Match & ATS Audit</h2>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Gemini AI
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Targeting: <strong>{job.title}</strong> at <strong>{job.company}</strong> ({job.salary})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 flex gap-4 border-b border-gray-100 text-xs font-bold bg-slate-50">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === "upload" 
                ? "border-blue-600 text-blue-600 font-extrabold" 
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload Resume File (PDF / DOCX / TXT)
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === "text" 
                ? "border-blue-600 text-blue-600 font-extrabold" 
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            Edit / Paste Resume Text
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === "upload" ? (
            <div className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-blue-600 bg-blue-50/80 scale-[1.01]'
                    : uploadedFile
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-gray-300 hover:border-blue-400 bg-gray-50/60 hover:bg-blue-50/30'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  accept=".pdf,.docx,.doc,.txt,.md"
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">
                    Click to browse or drag & drop your resume here
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports <strong>PDF</strong>, <strong>DOCX</strong>, and <strong>TXT</strong> files up to 10MB
                  </p>
                </div>
              </div>

              {/* Uploaded File Info Card */}
              {uploadedFile && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                        <span className="truncate max-w-xs">{uploadedFile.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {isParsingFile ? "Extracting resume sections..." : "Extracted & ready for Gemini AI analysis"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRemoveFile}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">
                  {uploadedFile ? "File parsed and ready." : "Upload a file or switch to Paste Text tab."}
                </span>

                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing || isParsingFile}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Auditing Resume with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Run ATS & Skill Fit Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Student Resume Text & Skills Profile
                </label>
                <button
                  onClick={() => setResumeText(
                    `Harshil Patel | B.Tech CSE (8.64 CGPA, 2026 Batch)\nCore Skills: Java, Python, C++, Data Structures, Algorithms, React.js, SQL, Git.\nProjects: Full-stack E-commerce portal with React & Node.js; Real-time chat application with WebSockets; Distributed caching simulation with Redis.\nCoursework: Operating Systems, Database Management, Computer Networks, OOP.`
                  )}
                  className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset to Campus Profile
                </button>
              </div>

              <textarea
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume sections, skills, or projects..."
                className="w-full text-xs font-mono p-3.5 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-600 bg-gray-50/50 leading-relaxed"
              />

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Auditing Resume with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Run ATS & Skill Fit Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="space-y-5 pt-4 border-t border-gray-100 animate-fadeIn">
              {/* Score Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                    ATS Match Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-amber-400">
                      {analysisResult.matchPercentage}%
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      • {analysisResult.verdict}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 max-w-sm">
                  <p>{analysisResult.strengths}</p>
                </div>
              </div>

              {/* Skills Breakdown: Matched vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Matched Skills Found in Resume</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisResult.matchedSkills?.map((s, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-white text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Missing Skills Required by {job.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisResult.missingSkills?.map((s, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-white text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommended Resume Bullets */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    AI-Optimized Bullet Points to Add to Your Resume
                  </span>
                  <span className="text-[11px] text-gray-500">Tailored to {job.company}</span>
                </div>

                <div className="space-y-2">
                  {analysisResult.recommendedResumeBullets?.map((bullet, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-white rounded-xl border border-gray-200 text-xs">
                      <span className="text-gray-700 leading-relaxed">• {bullet}</span>
                      <button
                        onClick={() => handleCopy(bullet, idx)}
                        className="text-gray-400 hover:text-blue-600 shrink-0 p-1 rounded transition"
                        title="Copy Bullet Point"
                      >
                        {copiedBullet === idx ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Strategy Tip */}
              {analysisResult.interviewTips && (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Company Preparation Tip: </span>
                    <span>{analysisResult.interviewTips}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
