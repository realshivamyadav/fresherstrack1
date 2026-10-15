import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Send, X, Bot, User, Minimize2, ChevronRight, Zap } from 'lucide-react';
import { askPlacementCopilot } from '../services/geminiService';

export default function PlacementCopilotChat({ activeJobs = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I am your AI Campus Placement Advisor powered by Gemini. Ask me anything about eligibility criteria, company packages, or interview strategies!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Which companies offer >15 LPA (Super Dream)?",
    "Am I eligible for Google & Microsoft with 8.64 CGPA?",
    "Tips to clear TCS Digital coding round?",
    "What are Swiggy's required skills?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await askPlacementCopilot(query, activeJobs);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: response }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "I'm having a brief connection issue. Please ensure your network is connected and try asking again!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full shadow-[0_6px_25px_rgba(39,93,245,0.4)] hover:shadow-[0_8px_30px_rgba(39,93,245,0.6)] transform hover:-translate-y-1 transition-all duration-200"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide">Campus AI Copilot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Placement Copilot
                  <span className="text-[10px] bg-blue-500/40 text-blue-100 font-semibold px-2 py-0.5 rounded-full">
                    Gemini AI
                  </span>
                </h3>
                <span className="text-[11px] text-blue-200">Real-time Campus Placement Intelligence</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f9fd] text-xs leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 text-xs italic p-2 bg-white rounded-xl border border-gray-200 w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Gemini is analyzing placement drives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-semibold text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-full border border-gray-200 transition shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about cutoffs, salary, interview rounds..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600 bg-gray-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl shadow-sm transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
