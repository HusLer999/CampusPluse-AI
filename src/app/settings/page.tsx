'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'notifications' | 'security'>('profile');
  
  const [name, setName] = useState('Sumiran Shrestha');
  const [username, setUsername] = useState('Alex_Student');
  const [email, setEmail] = useState('sumiran.alex@campus.edu.np');
  const [phone, setPhone] = useState('+977 9800000000');
  const [bio, setBio] = useState('CSIT student | Tech enthusiast & learner.');

  const [faculty, setFaculty] = useState('Computer Science & IT (B.Sc. CSIT / BE CS)');
  const [semester, setSemester] = useState('Semester 3');
  const [studentId, setStudentId] = useState('CSIT-2024-042');
  const [collegeName, setCollegeName] = useState('Tribhuvan University Affiliated College');

  const [transitAlerts, setTransitAlerts] = useState(true);
  const [marketplaceAlerts, setMarketplaceAlerts] = useState(true);
  const [plannerReminders, setPlannerReminders] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 min-h-screen text-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link href="/" className="text-xs text-purple-400 hover:underline mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            ⚙️ Account & Application Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your student profile, academic preferences, notifications, and security.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold animate-fade-in">
            ✅ Settings saved successfully!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-3 space-y-1 h-fit">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            👤 Profile & Bio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'academic'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🎓 Academic Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🔔 Notifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🔒 Security & Login
          </button>
        </div>

        <div className="md:col-span-3 bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Personal Profile</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Academic Details</h2>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Faculty / Program</label>
                  <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Semester</label>
                    <input
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Student ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Notifications</h2>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#131826] rounded-xl border border-slate-800">
                  <span className="text-xs text-white">🚌 Live Transit Delays</span>
                  <input
                    type="checkbox"
                    checked={transitAlerts}
                    onChange={(e) => setTransitAlerts(e.target.checked)}
                    className="accent-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#131826] rounded-xl border border-slate-800">
                  <span className="text-xs text-white">🛍️ Marketplace Messages</span>
                  <input
                    type="checkbox"
                    checked={marketplaceAlerts}
                    onChange={(e) => setMarketplaceAlerts(e.target.checked)}
                    className="accent-purple-600"
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Security</h2>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}