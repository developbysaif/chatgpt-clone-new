"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Menu, Sparkles, User, Copy, ThumbsUp, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWindow({ messages, onSendMessage, onToggleSidebar, isSidebarOpen }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#212121] relative overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#212121]/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          {!isSidebarOpen && (
            <button 
              onClick={onToggleSidebar}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white/90">ChatGPT Clone</h2>
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md font-bold uppercase tracking-wider">Plus</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center pt-20 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles size={32} className="text-emerald-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">How can I help you today?</h1>
                <p className="text-gray-500 text-lg">Ask me anything, from code to complex questions.</p>
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-6 ${msg.sender === "ai" ? "bg-transparent" : ""}`}
                >
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border ${
                    msg.sender === "ai" 
                      ? "bg-emerald-600 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                      : "bg-[#2f2f2f] border-white/10"
                  }`}>
                    {msg.sender === "ai" ? <Sparkles size={18} className="text-white" /> : <User size={18} className="text-gray-300" />}
                  </div>
                  <div className="flex-1 space-y-3 pt-1">
                    <p className="text-[#ececec] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.sender === "ai" && (
                      <div className="flex items-center gap-3 pt-2">
                        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-all">
                          <Copy size={14} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-all">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded transition-all">
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent">
        <form 
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative group"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ChatGPT Clone..."
            className="w-full bg-[#2f2f2f] text-white border border-white/10 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:border-white/20 transition-all placeholder-gray-500 shadow-2xl"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-xl disabled:bg-[#444] disabled:text-gray-600 transition-all hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 mt-3 font-medium">
          ChatGPT Clone can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
