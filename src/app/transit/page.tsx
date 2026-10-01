'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TransitReport {
  id: string;
  line: string;
  title: string;
  description: string;
  postedTime: string;
  upvotes: number;
  hasUpvoted: boolean;
  authorId: string;
}

export default function TransitPage() {
  // Simulated logged-in user ID (Change this to your auth user ID if available)
  const CURRENT_USER_ID = 'user-alex-123';

  const [reports, setReports] = useState<TransitReport[]>([
    {
      id: 'report-1',
      line: 'Green Line',
      title: 'Green Line delayed by 15 mins',
      description: 'Traffic accident near the main library roundabout slowing buses down.',
      postedTime: '11:47 AM',
      upvotes: 8,
      hasUpvoted: false,
      authorId: 'user-alex-123', // Author match -> Delete button will appear
    },
    {
      id: 'report-2',
      line: 'Red Line',
      title: 'Red Line running on schedule',
      description: 'Shuttles arriving every 10 minutes at the Student Union stop.',
      postedTime: '10:30 AM',
      upvotes: 14,
      hasUpvoted: false,
      authorId: 'other-user-999', // Other author -> Delete button hidden
    },
  ]);

  // Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState('Green Line');
  const [delayTitle, setDelayTitle] = useState('');
  const [delayDescription, setDelayDescription] = useState('');

  // 1. Upvote Toggle Handler
  const handleUpvote = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const nextState = !report.hasUpvoted;
          return {
            ...report,
            hasUpvoted: nextState,
            upvotes: nextState ? report.upvotes + 1 : report.upvotes - 1,
          };
        }
        return report;
      })
    );
  };

  // 2. Delete Report Handler (Author Only)
  const handleDeleteReport = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this transit alert?')) {
      setReports((prev) => prev.filter((report) => report.id !== reportId));
    }
  };

  // 3. Submit New Delay Report Handler
  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delayTitle.trim()) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAlert: TransitReport = {
      id: 'report-' + Date.now(),
      line: selectedLine,
      title: delayTitle,
      description: delayDescription,
      postedTime: formattedTime,
      upvotes: 1,
      hasUpvoted: true,
      authorId: CURRENT_USER_ID, // Automatically assigned to current logged in user
    };

    setReports([newAlert, ...reports]);

    // Reset Form & Close Modal
    setDelayTitle('');
    setDelayDescription('');
    setSelectedLine('Green Line');
    setIsReportModalOpen(false);
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link href="/" className="text-xs text-cyan-400 hover:underline mb-2 block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🚌 Live Campus Transit Board
          </h1>
        </div>

        {/* Report Delay Button */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        >
          + Report Delay / Shuttle Status
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => {
          const isOwner = report.authorId === CURRENT_USER_ID;

          return (
            <div
              key={report.id}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-lg">
                    {report.line}
                  </span>
                  <span className="text-xs text-slate-400">• Posted {report.postedTime}</span>
                  {isOwner && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
                      Your Post
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-white">{report.title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed">{report.description}</p>
              </div>

              {/* Action Buttons: Upvote & Delete */}
              <div className="flex items-center gap-3 self-end sm:self-start">
                {/* Delete Button (Only visible if the current user is the author) */}
                {isOwner && (
                  <button
                    onClick={(e) => handleDeleteReport(report.id, e)}
                    title="Delete your report"
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 active:scale-95"
                  >
                    🗑️
                  </button>
                )}

                {/* Upvote Button with Hover Effects */}
                <button
                  onClick={(e) => handleUpvote(report.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer active:scale-95 ${
                    report.hasUpvoted
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-800/80 hover:bg-cyan-500/20 border-slate-700 hover:border-cyan-500/50 text-cyan-400'
                  }`}
                >
                  <span className="text-sm">👍</span>
                  <span>Upvotes</span>
                  <span className="bg-slate-900/60 px-2 py-0.5 rounded-md text-white font-mono">
                    {report.upvotes}
                  </span>
                </button>
              </div>
            </div>
          );
        })}

        {reports.length === 0 && (
          <div className="text-center py-12 bg-[#111827] border border-slate-800 rounded-2xl text-slate-400 text-sm">
            No transit delay reports submitted yet.
          </div>
        )}
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                📢 Report Campus Transit Alert
              </h2>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Transit Line</label>
                <select
                  value={selectedLine}
                  onChange={(e) => setSelectedLine(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Green Line">Green Line</option>
                  <option value="Red Line">Red Line</option>
                  <option value="Blue Express">Blue Express</option>
                  <option value="Night Shuttle">Night Shuttle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Alert Headline / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Line delayed by 15 mins"
                  value={delayTitle}
                  onChange={(e) => setDelayTitle(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Details / Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the cause or location of the delay..."
                  value={delayDescription}
                  onChange={(e) => setDelayDescription(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Post Delay Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}