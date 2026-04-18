"use client";
import { X, Search, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#000000e0] backdrop-blur-xl flex flex-col items-center pt-[15vh] px-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl space-y-8"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                autoFocus
                type="text"
                placeholder="Search across history and projects..."
                className="w-full bg-[#171717] border border-white/10 rounded-3xl py-6 px-16 text-xl text-white outline-none focus:border-emerald-500/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-2">Recent Searches</h3>
              <div className="space-y-2">
                {["Next.js integration", "UI Design patterns", "API Documentation"].map((search, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl cursor-pointer group transition-all">
                    <div className="flex items-center gap-4">
                      <Clock size={16} className="text-gray-600" />
                      <span className="text-gray-300 font-medium group-hover:text-white">{search}</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
