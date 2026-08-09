import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldAlert,
  Users,
  BookOpen,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BarChart2,
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    courses,
    artists,
    user,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'bookings' | 'donations'>('overview');
  
  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Music Production');
  const [newInstructor, setNewInstructor] = useState('Dr. Marcus Vance');

  if (!isAdminOpen) return null;

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addToast(`New course "${newTitle}" created and published globally!`, 'success');
    setNewTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                Aura Foundation Admin Control Center
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                System Administrator Access • Level 1 Credentials
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 my-6 text-xs font-bold font-mono">
          {['overview', 'courses', 'bookings', 'donations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'border-amber-500 text-amber-500 font-extrabold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Total Enrolled Students</div>
                <div className="text-2xl font-black text-amber-500 mt-1 font-mono">50,420</div>
                <div className="text-[10px] text-emerald-500 font-mono mt-1">↑ +14% this month</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Active Curriculum Courses</div>
                <div className="text-2xl font-black text-amber-500 mt-1 font-mono">{courses.length}</div>
                <div className="text-[10px] text-neutral-400 font-mono mt-1">100% Free Access</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Verified Global Mentors</div>
                <div className="text-2xl font-black text-amber-500 mt-1 font-mono">{artists.length}</div>
                <div className="text-[10px] text-neutral-400 font-mono mt-1">1-on-1 Sessions Live</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Total Foundation Funds</div>
                <div className="text-2xl font-black text-amber-500 mt-1 font-mono">€52,700</div>
                <div className="text-[10px] text-emerald-500 font-mono mt-1">Grants & Subsidies Ready</div>
              </div>
            </div>

            {/* Recent System Activity */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-neutral-400">
                Live Audit Logs
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-300">
                  [LOG-2026-08-09] User booked 1-on-1 Mentorship with Amina Diallo (€1,200 EUR).
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-300">
                  [LOG-2026-08-09] Issued Certificate AURA-CERT-99120 for Music Theory Masterclass.
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-300">
                  [LOG-2026-08-08] Anonymous donor contributed €250 EUR to Equipment Grant Fund.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <form onSubmit={handleCreateCourse} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-amber-500">
                Publish New Academy Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Course Title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
                >
                  <option>Music Production</option>
                  <option>Vocals</option>
                  <option>Music Theory</option>
                  <option>Mixing & Mastering</option>
                  <option>Songwriting</option>
                </select>
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Publish Course
                </button>
              </div>
            </form>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold">{c.title}</span>
                    <span className="ml-2 text-[10px] font-mono text-amber-500">({c.category})</span>
                  </div>
                  <button
                    onClick={() => addToast(`Removed course "${c.title}"`, 'info')}
                    className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-500">
              Active Private Mentorship Ledger
            </h3>
            <div className="space-y-2">
              {user.bookings.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs flex justify-between">
                  <div>
                    <div className="font-bold">{b.artistName} • {b.sessionTitle}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">Booked by: {b.userName} ({b.userEmail})</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-amber-500 font-bold">€{b.priceEUR} EUR</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{b.date} @ {b.timeSlot}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DONATIONS */}
        {activeTab === 'donations' && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-amber-500">
              Equipment Grant Donations
            </h3>
            <p className="text-xs text-neutral-400">Total accumulated donations: €14,500 EUR.</p>
          </div>
        )}

      </div>
    </div>
  );
};
