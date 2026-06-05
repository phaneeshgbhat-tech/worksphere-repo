import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarTab from './CalendarTab.jsx';
import PollsTab from './PollsTab.jsx';
import TodoTab from './TodoTab.jsx';
import ContactsTab from './ContactsTab.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  const tabs = [
    { id: 'calendar', name: 'Calendar' },
    { id: 'polls', name: 'Polls' },
    { id: 'todo', name: 'Tasks' },
    { id: 'contacts', name: 'Team' }, // 👈 Added Contacts/Team item
  ];

  const isValidTab = tabs.some(tab => tab.id === activeTab);

  if (!isValidTab) {
    return <NotFoundPage onGoHome={() => setActiveTab('calendar')} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans antialiased selection:bg-sky-500/10">
      
      {/* 1. Desktop Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <svg className="h-7 w-7 text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
            <h1 className="text-xl font-bold tracking-tight">Worksphere Pro</h1>
          </div>
          
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 outline-none ${
                    isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicatorDesktop"
                      className="absolute inset-0 bg-slate-800 rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    {tab.id === 'calendar' && (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>
                    )}
                    {tab.id === 'polls' && (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg>
                    )}
                    {tab.id === 'todo' && (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                    )}
                    {tab.id === 'contacts' && (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    )}
                    {tab.name === 'Calendar' ? 'Meeting Calendar' : tab.name === 'Tasks' ? 'Task Manager (CRUD)' : tab.name === 'Team' ? 'Team Directory' : 'Team Polls'}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-slate-800 pt-4 px-2 text-xs text-slate-500">
          Logged in as: <span className="text-slate-300 font-medium">Phaneesh</span>
        </div>
      </aside>

      {/* 2. Mobile App Header Bar */}
      <header className="md:hidden bg-slate-900 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>
          <span className="font-bold text-base tracking-tight">Worksphere Pro</span>
        </div>
      </header>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto mb-20 md:mb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'calendar' && <CalendarTab />}
            {activeTab === 'polls' && <PollsTab />}
            {activeTab === 'todo' && <TodoTab />}
            {activeTab === 'contacts' && <ContactsTab />} {/* 👈 Added matching display route */}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Bottom Sticky Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-40 pb-safe shadow-[0_-4px_12px_rgba(15,23,42,0.03)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-1 py-1.5 px-3 min-w-[64px] rounded-xl transition-all duration-150 outline-none ${
                isActive ? 'text-sky-500 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <div className="relative z-10">
                {tab.id === 'calendar' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>
                )}
                {tab.id === 'polls' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg>
                )}
                {tab.id === 'todo' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                )}
                {tab.id === 'contacts' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                )}
              </div>
              <span className="text-[10px] tracking-tight relative z-10">{tab.name}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}