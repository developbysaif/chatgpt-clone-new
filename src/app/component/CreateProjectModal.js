"use client";
import { useState } from "react";
import { X, FolderPlus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProjectModal({ isOpen, onClose, onAddProject }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddProject(name);
      setName("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#171717] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-emerald-500/10 rounded-2xl">
                  <FolderPlus size={32} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">New Project</h2>
                <p className="text-gray-500">Organize your chats into a dedicated project space.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase px-1">Project Name</label>
                  <input 
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Website Overhaul"
                    className="w-full bg-[#2f2f2f] border border-white/5 rounded-xl py-4 px-5 text-white outline-none focus:border-emerald-500/50 transition-all font-medium"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:bg-gray-700 disabled:text-gray-500"
                >
                  <Sparkles size={18} />
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
