"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Menu, Sparkles, User, Copy, ThumbsUp, RotateCcw, Paperclip, Mic, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <div className="flex-1 flex flex-col bg-[#212121] relative overflow-hidden font-sans">
      {/* Header */}
      <header className="h-[60px] flex items-center justify-between px-4 z-10 sticky top-0 bg-[#212121]/60 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <button 
              onClick={onToggleSidebar}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"
            >
              <Menu size={20} />
            </button>
          )}
          <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-white/5 rounded-xl transition-all text-gray-300 font-medium text-sm">
            ChatGPT 4o <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <RotateCcw size={18} />
           </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-[760px] mx-auto px-4 py-8 space-y-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center pt-32 text-center space-y-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-black" />
              </div>
              <h1 className="text-[28px] font-semibold text-white tracking-tight">How can I help you today?</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4 text-left">
                {[
                  { icon: "🎨", title: "Create a logo", desc: "for my new startup" },
                  { icon: "💡", title: "Give me ideas", desc: "for a blog post" },
                  { icon: "📝", title: "Summarize text", desc: "from this article" },
                  { icon: "💻", title: "Write code", desc: "for a toggle switch" },
                ].map((item, idx) => (
                  <button key={idx} className="p-4 bg-transparent border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-sm font-medium text-white/90 group-hover:text-white">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-5 ${msg.sender === "user" ? "justify-end" : ""}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-transparent border border-white/10 mt-1">
                      <Sparkles size={16} className="text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-3xl ${
                    msg.sender === "user" 
                      ? "bg-[#2f2f2f] text-white" 
                      : "text-gray-100"
                  }`}>
                    {msg.sender === "ai" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || "");
                              return !inline && match ? (
                                <div className="relative group my-4 rounded-xl overflow-hidden border border-white/10">
                                  <div className="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] text-[10px] uppercase font-bold text-gray-400">
                                    <span>{match[1]}</span>
                                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                                      <Copy size={12} /> Copy
                                    </button>
                                  </div>
                                  <SyntaxHighlighter
                                    style={atomDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: 0, padding: '1.5rem', background: '#171717' }}
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code className="bg-white/10 px-1.5 py-0.5 rounded text-emerald-400" {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                    
                    {msg.sender === "ai" && (
                      <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 -ml-2">
                        <button className="p-1.5 text-gray-500 hover:text-white rounded transition-all">
                          <Copy size={14} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-white rounded transition-all">
                          <ThumbsUp size={14} />
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
      <div className="p-4 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent">
        <form 
          onSubmit={handleSubmit}
          className="max-w-[760px] mx-auto bg-[#2f2f2f] border border-white/5 rounded-3xl p-2.5 flex flex-col gap-2 shadow-2xl focus-within:border-white/10 transition-all"
        >
          <textarea 
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message ChatGPT..."
            className="w-full bg-transparent text-[#ececec] px-4 py-2.5 outline-none resize-none scrollbar-hide placeholder-gray-500 text-base"
          />
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-1">
                <button type="button" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                   <Paperclip size={18} />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                   <Mic size={18} />
                </button>
             </div>
             <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-white text-black rounded-full disabled:bg-[#444] disabled:text-gray-600 transition-all hover:scale-105"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <p className="max-w-3xl mx-auto text-center text-[11px] text-gray-500 mt-3">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
