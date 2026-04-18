"use client";
import { Plus, Search, MessageSquare, Trash2, FolderPlus, User, Settings, LogOut } from "lucide-react";

export default function Sidebar({ 
  isOpen, 
  onSearchClick, 
  onCreateProjectClick, 
  projects, 
  history, 
  onHistoryClick, 
  onNewChat, 
  onDeleteChat 
}) {
  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#171717] text-gray-200 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out border-r border-white/5 flex flex-col`}>
      {/* New Chat Button */}
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 group"
        >
          <div className="p-1 bg-white/10 rounded-md group-hover:bg-white/20 transition-colors">
            <Plus size={18} className="text-white" />
          </div>
          <span className="font-medium">New chat</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
        {/* Search & Projects Actions */}
        <div className="space-y-1">
          <button 
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
          >
            <Search size={18} />
            <span>Search</span>
          </button>
          <button 
            onClick={onCreateProjectClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
          >
            <FolderPlus size={18} />
            <span>Create project</span>
          </button>
        </div>

        {/* History Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">History</h3>
          <div className="space-y-1">
            {history.length === 0 ? (
              <p className="px-3 text-sm text-gray-600 italic">No recent chats</p>
            ) : (
              history.map((chat) => (
                <div key={chat.id} className="group relative flex items-center">
                  <button 
                    onClick={() => onHistoryClick(chat)}
                    className="flex-1 flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors truncate pr-10"
                  >
                    <MessageSquare size={16} className="shrink-0 opacity-60" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                  <button 
                    onClick={() => onDeleteChat(chat.id)}
                    className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Projects Section */}
        {projects.length > 0 && (
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</h3>
            <div className="space-y-1">
              {projects.map((proj) => (
                <div key={proj.id} className="px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg cursor-pointer transition-colors flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>{proj.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Actions */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
          <User size={18} className="opacity-60" />
          <span>My Plan</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
          <Settings size={18} className="opacity-60" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
