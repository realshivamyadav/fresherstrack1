import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, Award, ArrowRight, CheckCircle2, RotateCcw, Send, Bot, User } from 'lucide-react';
import { generateMockInterviewQuestion } from '../services/geminiService';

export default function AiMockInterviewModal({ isOpen, onClose, job }) {
  const [roundNumber, setRoundNumber] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState("");

  if (!isOpen || !job) return null;

  const handleStart = async () => {
    setIsStarted(true);
    setLoading(true);
    setHistory([]);
    setRoundNumber(1);

    try {
      const q = await generateMockInterviewQuestion(job, 1, []);
      setCurrentQuestion(q);
    } catch (e) {
      console.error(e);
      alert("Failed to start mock interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim() || loading) return;

    setLoading(true);
    const updatedHistory = [
      ...history,
      {
        question: currentQuestion.nextQuestion || currentQuestion.question,
        answer: studentAnswer,
        score: currentQuestion.score || 8,
        feedback: currentQuestion.feedback || "Good structure."
      }
    ];

    try {
      const nextQ = await generateMockInterviewQuestion(job, roundNumber < 3 ? roundNumber + 1 : 3, updatedHistory);
      setHistory(updatedHistory);
      setCurrentQuestion(nextQ);
      setStudentAnswer("");
      if (roundNumber < 3) {
        setRoundNumber(prev => prev + 1);
      }
    } catch (e) {
      console.error(e);
      alert("Error evaluating answer. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">AI Technical & HR Interview Simulator</h2>
                <span className="bg-purple-400 text-purple-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Gemini Live Panel
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Simulating: <strong>{job.company}</strong> Technical Interview Board
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {!isStarted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-100">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Ready to test your skills for {job.company}?
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Gemini will simulate 3 real campus recruitment rounds: Data Structures & Algorithms, System Design / Core CS, and Leadership fitment.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleStart}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/25 transition transform active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Begin AI Mock Interview</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Progress Stepper */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 pb-3 border-b border-gray-100">
                <span className="text-purple-700 font-bold">
                  Round {roundNumber} of 3: {roundNumber === 1 ? 'DSA & Problem Solving' : roundNumber === 2 ? 'Core CS Fundamentals' : 'Behavioral & Leadership'}
                </span>
                <span>Questions Completed: {history.length}</span>
              </div>

              {/* Chat History */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {history.map((h, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-purple-700 shrink-0">Interviewer Q:</span>
                      <span className="text-gray-800">{h.question}</span>
                    </div>
                    <div className="flex items-start gap-2 pl-4 border-l-2 border-blue-400">
                      <span className="font-bold text-gray-500 shrink-0">Your Answer:</span>
                      <span className="text-gray-700">{h.answer}</span>
                    </div>
                    {h.feedback && (
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-800 flex items-center justify-between text-[11px]">
                        <span><strong>Feedback:</strong> {h.feedback}</span>
                        <span className="font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full shrink-0">
                          Score: {h.score}/10
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Current Active Question */}
                {currentQuestion && (
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-900 flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-purple-600" />
                        {job.company} Senior Interviewer asks:
                      </span>
                      {currentQuestion.score && (
                        <span className="font-bold text-xs text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                          Last Response: {currentQuestion.score}/10
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {currentQuestion.nextQuestion || currentQuestion.question}
                    </p>
                    {currentQuestion.sampleGoodAnswerOutline && (
                      <p className="text-[11px] text-gray-500 italic">
                        Tip: {currentQuestion.sampleGoodAnswerOutline}
                      </p>
                    )}
                  </div>
                )}

                {loading && (
                  <div className="p-3 bg-purple-50 text-purple-700 text-xs rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
                    <span>Gemini is evaluating your technical formulation...</span>
                  </div>
                )}
              </div>

              {/* Student Answer Input */}
              <div className="space-y-2 pt-2">
                <textarea
                  rows={3}
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Explain your approach, algorithmic time complexity, or design architecture..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-gray-300 focus:outline-none focus:border-purple-600 bg-white"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleStart}
                    className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Restart Interview
                  </button>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={loading || !studentAnswer.trim()}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <span>Submit Response</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
