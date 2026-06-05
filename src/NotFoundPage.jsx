import React from 'react';
import { motion } from 'framer-motion';

export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background radial blurs */}
      <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-sky-500/10 blur-[100px] top-1/4 left-1/4 -z-10" />
      <div className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-indigo-500/10 blur-[90px] bottom-1/4 right-1/4 -z-10" />

      <div className="text-center space-y-5 max-w-sm sm:max-w-md z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative inline-block">
          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500">
            404
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Lost in Space?</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The page you are trying to access doesn't exist, has been archived, or moved to another directory.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="pt-2">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-transform active:scale-[0.98] shadow-lg shadow-sky-500/10"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}