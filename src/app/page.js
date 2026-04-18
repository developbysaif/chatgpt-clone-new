"use client";

import { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";
import ChatWindow from "./component/Chatwindow";
import SearchPage from "./component/SearchPage";
import CreateProjectModal from "./component/CreateProjectModal";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState({ id: Date.now(), title: "New Chat", messages: [] });

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chats");
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  const saveChat = async (chat) => {
    try {
      await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chat),
      });
      fetchChats();
    } catch (err) {
      console.error("Failed to save chat", err);
    }
  };

  const deleteChat = async (id) => {
    try {
      await fetch("/api/chats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchChats();
      if (currentChat.id === id) {
        handleNewChat();
      }
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  const handleSendMessage = (text) => {
    const userMessage = { id: Date.now(), text, sender: "user" };
    const updatedMessages = [...currentChat.messages, userMessage];

    // Auto-title if it's the first message
    let title = currentChat.title;
    if (currentChat.messages.length === 0) {
      title = text.substring(0, 30) + (text.length > 30 ? "..." : "");
    }

    const updatedChat = { ...currentChat, title, messages: updatedMessages };
    setCurrentChat(updatedChat);
    saveChat(updatedChat);

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: "I'm a ChatGPT clone built with Next.js and Tailwind CSS. How can I help you today?",
        sender: "ai"
      };
      const finalMessages = [...updatedMessages, aiResponse];
      const finalChat = { ...updatedChat, messages: finalMessages };
      setCurrentChat(finalChat);
      saveChat(finalChat);
    }, 800);
  };

  const handleHistoryClick = (chat) => {
    setCurrentChat(chat);
  };

  const handleNewChat = () => {
    setCurrentChat({ id: Date.now(), title: "New Chat", messages: [] });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleAddProject = (name) => {
    setProjects(prev => [...prev, { name, id: Date.now() }]);
    setIsCreateProjectOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#212121]">
      <Sidebar
        isOpen={isSidebarOpen}
        onSearchClick={() => setIsSearchOpen(true)}
        onCreateProjectClick={() => setIsCreateProjectOpen(true)}
        projects={projects}
        history={history}
        onHistoryClick={handleHistoryClick}
        onNewChat={handleNewChat}
        onDeleteChat={deleteChat}
      />
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <ChatWindow
          messages={currentChat.messages}
          onSendMessage={handleSendMessage}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </main>

      <SearchPage
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}