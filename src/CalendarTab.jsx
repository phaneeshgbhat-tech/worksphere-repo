import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarTab() {
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Sprint Planning', date: '2026-06-05', time: '10:00 AM', type: 'Virtual', platform: 'Zoom', attendees: 8 },
    { id: 2, title: 'Product Design Sync', date: '2026-06-05', time: '02:30 PM', type: 'In-Person', platform: 'Room 4B', attendees: 4 },
    { id: 3, title: 'All Hands Meeting', date: '2026-06-08', time: '11:00 AM', type: 'Virtual', platform: 'MS Teams', attendees: 42 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', type: 'Virtual', platform: '', attendees: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMeetings([...meetings, { ...newMeeting, id: Date.now() }]);
    setShowModal(false);
    setNewMeeting({ title: '', date: '', time: '', type: 'Virtual', platform: '', attendees: 1 });
  };

  // Delete Handler Function
  const handleDeleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Meeting Calendar</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Schedule and manage team collaborations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 sm:py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-[0.99]"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5v14" />
          </svg> 
          Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence initial={false}>
          {meetings.map((meeting) => (
            <motion.div 
              key={meeting.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    meeting.type === 'Virtual' ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {meeting.type === 'Virtual' ? (
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>
                    ) : (
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    )}
                    {meeting.type}
                  </span>

                  {/* Inline Delete Button */}
                  <button 
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors outline-none"
                    title="Cancel Meeting"
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-2 truncate pr-4">{meeting.title}</h3>
                
                <div className="space-y-2 text-xs sm:text-sm text-slate-500 mb-1">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span>{meeting.date} at {meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="truncate">{meeting.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    <span>{meeting.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {meetings.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-slate-200 text-center text-slate-400 py-12 rounded-2xl text-sm font-medium">
            No meetings scheduled. Click "Schedule Meeting" to get started.
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            
            <motion.div 
              initial={window.innerWidth < 640 ? { y: "100%" } : { scale: 0.95, opacity: 0, y: 15 }}
              animate={window.innerWidth < 640 ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
              exit={window.innerWidth < 640 ? { y: "100%" } : { scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md p-6 shadow-xl border border-slate-100 z-10 pb-safe-bottom max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">New Meeting</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 p-1"><svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Meeting Title</label>
                  <input required type="text" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                    <input required type="date" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" value={newMeeting.date} onChange={e => setNewMeeting({...newMeeting, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Time</label>
                    <input required type="text" placeholder="10:00 AM" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" value={newMeeting.time} onChange={e => setNewMeeting({...newMeeting, time: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Type</label>
                    <select className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none" value={newMeeting.type} onChange={e => setNewMeeting({...newMeeting, type: e.target.value})}>
                      <option value="Virtual">Virtual</option>
                      <option value="In-Person">In-Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Location / Platform</label>
                    <input required type="text" placeholder="Zoom or Room #" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" value={newMeeting.platform} onChange={e => setNewMeeting({...newMeeting, platform: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-sky-500 text-white font-semibold py-3 sm:py-2.5 rounded-xl text-sm transition-all mt-2 active:bg-sky-600">Create Meeting</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}