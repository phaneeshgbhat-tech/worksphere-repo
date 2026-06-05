import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoTab() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Finalize quarterly marketing brief', completed: false },
    { id: 2, text: 'Review security compliance protocol documentation', completed: true },
  ]);

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t));
    setEditingId(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Task Manager</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Full CRUD-enabled personal task workspace</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm">
        <input
          type="text"
          placeholder="Add a new workplace task..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 min-w-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-slate-900 text-white p-2.5 rounded-lg shrink-0 active:scale-95 transition-transform">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
      </form>

      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        {todos.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No active tasks found.</div>
        ) : (
          <motion.div layout className="divide-y divide-slate-50">
            <AnimatePresence initial={false}>
              {todos.map((todo) => (
                <motion.div 
                  key={todo.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-between p-3.5 sm:p-4 gap-3 bg-white"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))} className="text-slate-400 shrink-0 p-1">
                      {todo.completed ? (
                        <svg className="h-5 w-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                      ) : (
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
                      )}
                    </button>

                    {editingId === todo.id ? (
                      <input
                        type="text"
                        className="flex-1 border-b border-sky-400 bg-transparent text-sm text-slate-800 outline-none py-0.5"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span className={`text-xs sm:text-sm text-slate-700 truncate ${todo.completed ? 'line-through text-slate-400' : ''}`}>{todo.text}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {editingId === todo.id ? (
                      <>
                        <button onClick={() => handleSaveEdit(todo.id)} className="p-2 text-emerald-600 active:bg-emerald-50 rounded-lg"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></button>
                        <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 active:bg-slate-100 rounded-lg"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(todo.id); setEditText(todo.text); }} className="p-2 text-slate-400 active:text-slate-600"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg></button>
                        <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))} className="p-2 text-slate-400 hover:text-rose-600"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}