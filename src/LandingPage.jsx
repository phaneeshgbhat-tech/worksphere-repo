import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage({ onEnterDashboard }) {
  const features = [
    {
      title: 'Meeting Calendar',
      desc: 'Seamlessly schedule, organize, and view active project syncs via our interactive matrix grid layout.',
      icon: (
        <svg className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      )
    },
    {
      title: 'Interactive Polls',
      desc: 'Gather immediate workplace consensus with anonymous team voting bars and real-time choice adjustments.',
      icon: (
        <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      )
    },
    {
      title: 'CRUD Task Manager',
      desc: 'Take complete command over your personal assignments queue using fluid local update hooks and tracking states.',
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-hidden select-none flex flex-col justify-between">
      {/* Decorative Radial Background Lights */}
      <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-sky-500/10 blur-[120px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-indigo-500/10 blur-[100px] bottom-10 -right-10 pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>
          <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">Worksphere Pro</span>
        </div>
        <button 
          onClick={onEnterDashboard}
          className="text-xs font-bold border border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900 px-4 py-2 rounded-xl transition-all outline-none"
        >
          Sign In
        </button>
      </header>

      {/* Hero Section Container */}
      <main className="max-w-5xl mx-auto w-full px-6 py-12 md:py-20 text-center z-10 space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-[11px] font-bold tracking-wider uppercase">
              ✨ Next-Gen Workspace Engine
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500"
          >
            All corporate tools, <br className="hidden sm:inline" /> unified in one panel.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium"
          >
            Manage team sync agendas, trigger custom internal sentiment polling, and balance sprints inside a fully reactive, high-speed interface.
          </motion.p>
        </div>

        {/* Hero Actions Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={onEnterDashboard}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-transform active:scale-[0.98] shadow-lg shadow-sky-400/10 outline-none"
          >
            Launch Free Workspace
            <svg className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>

        {/* Features Preview Cards Row Block Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left pt-8"
        >
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-slate-800 transition-colors"
            >
              <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl w-fit mb-4">
                {feat.icon}
              </div>
              <h3 className="font-extrabold text-slate-100 text-base mb-1.5">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Corporate Meta Dashboard Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-900 text-[11px] text-slate-600 tracking-wide z-10">
        © 2026 Worksphere Pro Inc. Built securely with React, Vite, and Tailwind CSS.
      </footer>
    </div>
  );
}



