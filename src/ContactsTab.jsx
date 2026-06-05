import React, { useState } from 'react';

export default function ContactsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const contacts = [
    { id: 1, name: 'Phaneesh Bhat', role: 'Lead Developer', dept: 'Engineering', email: 'phaneesh@Worksphere.pro', status: 'Active' },
    { id: 2, name: 'Sarah Jenkins', role: 'UI/UX Designer', dept: 'Design', email: 'sarah.j@Worksphere.pro', status: 'In Meeting' },
    { id: 3, name: 'Arjun Mehta', role: 'Product Manager', dept: 'Management', email: 'arjun.m@Worksphere.pro', status: 'Active' },
    { id: 4, name: 'Emily Wong', role: 'QA Engineer', dept: 'Engineering', email: 'emily.w@Worksphere.pro', status: 'Offline' },
    { id: 5, name: 'Michael Chang', role: 'DevOps Specialist', dept: 'Engineering', email: 'm.chang@Worksphere.pro', status: 'Active' },
    { id: 6, name: 'Elena Rostova', role: 'Brand Strategist', dept: 'Design', email: 'elena.r@Worksphere.pro', status: 'Away' },
  ];

  const departments = ['All', 'Engineering', 'Design', 'Management'];

  // Filter and Search Logic
  const filteredContacts = contacts.filter(contact => {
    const matchesDept = activeFilter === 'All' || contact.dept === activeFilter;
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          contact.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header Area */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Team Directory</h2>
        <p className="text-slate-500 text-xs sm:text-sm">Connect and collaborate with your project teammates.</p>
      </div>

      {/* Controls Container (Search + Department Filter) */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input Box */}
        <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-200/80 shadow-sm flex-1 max-w-md">
          <svg className="h-4 w-4 text-slate-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            className="bg-transparent text-sm text-slate-800 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors outline-none ${
                activeFilter === dept 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {/* Card Meta Row */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  {/* Status Indicator Bubble */}
                  <span className={`w-2 h-2 rounded-full ${
                    contact.status === 'Active' ? 'bg-emerald-500' : 
                    contact.status === 'In Meeting' ? 'bg-amber-500' : 
                    contact.status === 'Away' ? 'bg-sky-400' : 'bg-slate-300'
                  }`} />
                  <span className="text-[11px] font-semibold text-slate-400">{contact.status}</span>
                </div>
                <span className="text-[10px] font-extrabold tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase">
                  {contact.dept}
                </span>
              </div>

              {/* Profile Main Stack */}
              <h3 className="font-bold text-slate-800 text-base">{contact.name}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{contact.role}</p>
            </div>

            {/* Quick Action Contact Button */}
            <div className="mt-5 pt-3 border-t border-slate-50">
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center gap-2 w-full py-2 border border-slate-200 hover:border-sky-200 hover:bg-sky-50/20 text-slate-600 hover:text-sky-600 rounded-xl text-xs font-bold transition-colors outline-none"
              >
                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-slate-200 text-center text-slate-400 py-12 rounded-2xl text-sm font-medium px-4">
            No teammates found matching those search criteria.
          </div>
        )}
      </div>
    </div>
  );
}