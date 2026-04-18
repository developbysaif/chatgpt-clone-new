"use client";
import { useState } from "react";
import { Plus, Search, MessageSquare, Trash2, FolderPlus, User, Settings, Sparkles, Pin, MoreHorizontal } from "lucide-react";

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
  const [sidebarSearch, setSidebarSearch] = useState("");

  const filteredHistory = history.filter(chat => 
    chat.title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const groupHistory = (items) => {
    const sorted = [...items].sort((a, b) => b.id - a.id);
    const groups = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: []
    };

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;

    sorted.forEach(chat => {
      const diff = now - chat.id;
      if (diff < oneDay) groups.Today.push(chat);
      else if (diff < 2 * oneDay) groups.Yesterday.push(chat);
      else if (diff < sevenDays) groups["Previous 7 Days"].push(chat);
      else groups.Older.push(chat);
    });

    return Object.entries(groups).filter(([_, list]) => list.length > 0);
  };

  const historyGroups = groupHistory(filteredHistory);

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-[#171717] text-gray-200 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out flex flex-col font-sans`}>
      {/* Top Header */}
      <div className="p-3">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#2f2f2f] rounded-lg transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-black" />
            </div>
            <span className="font-semibold text-sm">New chat</span>
          </div>
          <div className="p-1 hover:bg-white/10 rounded">
            <Plus size={18} className="text-gray-400 group-hover:text-white" />
          </div>
        </button>
      </div>

      {/* Sidebar Search */}
      <div className="px-3 mb-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text"
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full bg-[#212121] border border-transparent focus:border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-sm outline-none transition-all placeholder-gray-600"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-6 scrollbar-thin scrollbar-thumb-[#2f2f2f]">
        {/* History Groups */}
        {historyGroups.map(([group, list]) => (
          <div key={group} className="space-y-0.5">
            <h3 className="px-3 text-[11px] font-bold text-gray-500 py-2">{group}</h3>
            {list.map((chat) => (
              <div key={chat.id} className="group relative flex items-center px-1">
                <button 
                  onClick={() => onHistoryClick(chat)}
                  className="flex-1 flex items-center gap-3 px-2 py-2 text-sm text-gray-300 hover:bg-[#212121] rounded-lg transition-colors truncate text-left"
                >
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  <button 
                    onClick={() => onDeleteChat(chat.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 rounded-md transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-white rounded-md transition-all">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="pt-4 border-t border-white/5 mx-2">
            <h3 className="px-3 text-[11px] font-bold text-gray-500 py-2">Projects</h3>
            <div className="space-y-1">
              {projects.map((proj) => (
                <div key={proj.id} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#212121] rounded-lg cursor-pointer transition-all">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="truncate">{proj.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / User Profile */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <button 
          onClick={onCreateProjectClick}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#212121] rounded-lg transition-all"
        >
          <FolderPlus size={18} className="opacity-70" />
          <span>My projects</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 text-sm text-white hover:bg-[#212121] rounded-lg transition-all mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">
            S
          </div>
          <span className="font-medium">Saif Dev</span>
        </button>
      </div>
    </div>
  );
}
