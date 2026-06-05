import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PollsTab() {
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: "Where should we host the upcoming Q2 Team Building Event?",
      voted: false,
      userSelection: null,
      options: [
        { id: 'a1', text: 'Beach Resort & BBQ', votes: 14 },
        { id: 'a2', text: 'Mountain Cabin Retreat', votes: 19 },
        { id: 'a3', text: 'City Escape Room & Dinner', votes: 8 },
      ]
    },
    {
      id: 2,
      question: "Which core UI layout style should we pitch to the new client?",
      voted: true,
      userSelection: 'b1',
      options: [
        { id: 'b1', text: 'Minimalist Dark Theme', votes: 24 },
        { id: 'b2', text: 'Bold / High-Contrast Modern', votes: 12 },
      ]
    }
  ]);

  // Form states for creating a custom poll
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '']);

  // Handle Voting & Changing Votes
  const handleVote = (pollId, optionId) => {
    setPolls(polls.map(poll => {
      if (poll.id !== pollId) return poll;

      // Scenario A: Changing an existing vote
      if (poll.voted && poll.userSelection !== optionId) {
        return {
          ...poll,
          userSelection: optionId,
          options: poll.options.map(opt => {
            if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
            if (opt.id === poll.userSelection) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          })
        };
      }

      // Scenario B: First time voting on this poll
      if (!poll.voted) {
        return {
          ...poll,
          voted: true,
          userSelection: optionId,
          options: poll.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
        };
      }

      return poll; // Clicking the exact same option again does nothing
    }));
  };

  // Add Option Input Field
  const addOptionField = () => {
    if (newOptions.length < 5) setNewOptions([...newOptions, '']);
  };

  // Remove Option Input Field
  const removeOptionField = (index) => {
    if (newOptions.length > 2) {
      setNewOptions(newOptions.filter((_, i) => i !== index));
    }
  };

  // Create Poll Submit Handler
  const handleCreatePoll = (e) => {
    e.preventDefault();
    const validOptions = newOptions.filter(opt => opt.trim() !== '');
    if (!newQuestion.trim() || validOptions.length < 2) return;

    const formattedPoll = {
      id: Date.now(),
      question: newQuestion.trim(),
      voted: false,
      userSelection: null,
      options: validOptions.map((text, index) => ({
        id: `custom_${Date.now()}_${index}`,
        text: text.trim(),
        votes: 0
      }))
    };

    setPolls([formattedPoll, ...polls]);
    setNewQuestion('');
    setNewOptions(['', '']);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header Action Controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Team Polls</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Cast your vote, change selections, or create a poll.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 sm:py-2.5 rounded-xl font-semibold text-sm transition-transform active:scale-95"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showCreateForm ? 'Cancel Creation' : 'Create Poll'}
        </button>
      </div>

      {/* Expandable Form to Create Poll */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleCreatePoll} className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Poll Question</label>
                <input
                  required
                  type="text"
                  placeholder="What would you like to ask the workspace team?"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">Answer Options (Min 2, Max 5)</label>
                {newOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      required
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                      value={option}
                      onChange={e => {
                        const updated = [...newOptions];
                        updated[index] = e.target.value;
                        setNewOptions(updated);
                      }}
                    />
                    {newOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOptionField(index)}
                        className="p-2 text-slate-400 hover:text-rose-500"
                      >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                {newOptions.length < 5 ? (
                  <button
                    type="button"
                    onClick={addOptionField}
                    className="text-xs text-sky-500 hover:text-sky-600 font-bold flex items-center gap-1"
                  >
                    + Add Choice Option
                  </button>
                ) : <span />}
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm">
                  Launch Custom Poll
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid List displaying current Active Workspace Polls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

          return (
            <div key={poll.id} className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">{poll.question}</h3>
                  {poll.voted && (
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      Voted
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {poll.options.map((option) => {
                    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                    const isUserSelection = poll.userSelection === option.id;

                    return (
                      <div key={option.id} className="relative">
                        {poll.voted ? (
                          /* Interactive Post-Vote Display Mode (Allows switching votes) */
                          <button
                            onClick={() => handleVote(poll.id, option.id)}
                            className={`w-full text-left relative p-3.5 border rounded-xl overflow-hidden transition-all outline-none ${
                              isUserSelection ? 'border-sky-300 bg-sky-50/10' : 'border-slate-100 bg-transparent hover:border-slate-300'
                            }`}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className={`absolute top-0 left-0 bottom-0 ${
                                isUserSelection ? 'bg-sky-500/10' : 'bg-slate-100/70'
                              }`}
                            />
                            <div className="relative z-10 flex justify-between items-center text-xs sm:text-sm">
                              <span className={`font-medium truncate pr-4 flex items-center gap-2 ${isUserSelection ? 'text-sky-700 font-bold' : 'text-slate-700'}`}>
                                {isUserSelection && <span className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0" />}
                                {option.text}
                              </span>
                              <span className={`text-[11px] font-bold shrink-0 ${isUserSelection ? 'text-sky-600' : 'text-slate-400'}`}>
                                {percentage}% ({option.votes})
                              </span>
                            </div>
                          </button>
                        ) : (
                          /* Standard Initial Active Voting Mode */
                          <button
                            onClick={() => handleVote(poll.id, option.id)}
                            className="w-full text-left p-3.5 border border-slate-200 hover:border-sky-400 active:bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 transition-colors outline-none"
                          >
                            {option.text}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                  {poll.voted ? 'Tap any option to switch your vote' : 'Anonymous Workspace Poll'}
                </span>
                <span>Total: {totalVotes} votes</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}