import Link from 'next/link';

export default async function DashboardPage() {
  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-10">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Good afternoon, Alex
        </h1>
        <p className="text-slate-400 mt-2 text-[15px]">
          Here is your campus overview for today. You have <span className="text-indigo-400">2 assignments</span> due this week.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Link href="/tasks" className="group bg-[#1E1F22] hover:bg-[#25262A] border border-white/5 rounded-2xl p-6 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-xl">📚</span>
          </div>
          <h3 className="text-[15px] font-medium text-white mb-1">Upload Syllabus</h3>
          <p className="text-[13px] text-slate-400">Let Gemini AI parse your deadlines automatically.</p>
        </Link>

        <Link href="/transit" className="group bg-[#1E1F22] hover:bg-[#25262A] border border-white/5 rounded-2xl p-6 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-xl">🚌</span>
          </div>
          <h3 className="text-[15px] font-medium text-white mb-1">Check Transit</h3>
          <p className="text-[13px] text-slate-400">View live, crowdsourced shuttle board & delays.</p>
        </Link>

        <Link href="/marketplace" className="group bg-[#1E1F22] hover:bg-[#25262A] border border-white/5 rounded-2xl p-6 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-xl">🛍️</span>
          </div>
          <h3 className="text-[15px] font-medium text-white mb-1">Student Market</h3>
          <p className="text-[13px] text-slate-400">Buy and sell textbooks or dorm items securely.</p>
        </Link>

      </div>
    </div>
  );
}