'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'notifications' | 'security'>('profile');
  
  // Profile State
  const [name, setName] = useState('Sumiran Shrestha');
  const [username, setUsername] = useState('Alex_Student');
  const [email, setEmail] = useState('sumiran.alex@campus.edu.np');
  const [phone, setPhone] = useState('+977 9800000000');
  const [bio, setBio] = useState('CSIT 3rd Semester student | Tech enthusiast & learner.');

  // Academic State
  const [faculty, setFaculty] = useState('Computer Science & IT (B.Sc. CSIT / BE CS)');
  const [semester, setSemester] = useState('Semester 3');
  const [studentId, setStudentId] = useState('CSIT-2024-042');
  const [collegeName, setCollegeName] = useState('Tribhuvan University Affiliated College');

  // Notification State
  const [transitAlerts, setTransitAlerts] = useState(true);
  const [marketplaceAlerts, setMarketplaceAlerts] = useState(true);
  const [plannerReminders, setPlannerReminders] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  // System State
  const [currency, setCurrency] = useState('NPR');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 min-h-screen text-slate-200">
      {/* Header */}
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
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold animate-fade-in flex items-center gap-2">
            <span>✅</span> Settings saved successfully!
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-3 space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>👤</span> Profile & Bio
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'academic'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>🎓</span> Academic Details
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'notifications'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>🔔</span> Notifications
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
              activeTab === 'security'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>🔒</span> Security & Login
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="md:col-span-3 bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* TAB 1: PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Personal Profile</h2>
                  <p className="text-xs text-slate-400">Update how your name and avatar appear across the marketplace and transit boards.</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-purple-900/60 border-2 border-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-md">
                    {name ? name.charAt(0) : 'A'}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white px-3.5 py-2 rounded-xl border border-slate-700 transition-all"
                    >
                      Change Avatar
                    </button>
                    <p className="text-[10px] text-slate-500 mt-1">JPG, PNG or GIF, max 2MB.</p>
                  </div>
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
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Short Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: ACADEMIC DETAILS */}
            {activeTab === 'academic' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Academic Details</h2>
                  <p className="text-xs text-slate-400">Sets default filters for your Academic Planner and Book Marketplace.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Faculty / Program</label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Computer Science & IT (B.Sc. CSIT / BE CS)">Computer Science & IT (B.Sc. CSIT / BE CS)</option>
                    <option value="Management (BBA / BIM / BBM)">Management (BBA / BIM / BBM)</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Current Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Student Roll / ID No.</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">College / Campus Name</label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: NOTIFICATIONS & PREFERENCES */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Alerts & System Preferences</h2>
                  <p className="text-xs text-slate-400">Choose what push alerts and currency settings you prefer.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#131826] rounded-xl border border-slate-800">
                    <div>
                      <p className="text-xs font-semibold text-white">🚌 Live Transit Delays</p>
                      <p className="text-[11px] text-slate-400">Receive alerts when campus bus routes report heavy delays.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={transitAlerts}
                      onChange={(e) => setTransitAlerts(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#131826] rounded-xl border border-slate-800">
                    <div>
                      <p className="text-xs font-semibold text-white">🛍️ Marketplace Inquiry Messages</p>
                      <p className="text-[11px] text-slate-400">Get notified when a student contacts you regarding a book listing.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketplaceAlerts}
                      onChange={(e) => setMarketplaceAlerts(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#131826] rounded-xl border border-slate-800">
                    <div>
                      <p className="text-xs font-semibold text-white">📚 Academic Planner Reminders</p>
                      <p className="text-[11px] text-slate-400">Receive exam and assignment due date reminders 24 hours prior.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={plannerReminders}
                      onChange={(e) => setPlannerReminders(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="NPR">NPR (Nepalese Rupee)</option>
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (Indian Rupee)</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY */}
            {activeTab === 'security' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">Security & Password</h2>
                  <p className="text-xs text-slate-400">Manage your password and session security.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#131826] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-red-400">Log Out</p>
                    <p className="text-[10px] text-slate-500">Sign out of your active session on this device.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Logged out successfully.')}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
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