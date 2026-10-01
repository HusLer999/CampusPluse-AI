import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CampusPulse AI',
  description: 'Your intelligent university student hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen bg-[#131314] text-slate-200 overflow-hidden selection:bg-indigo-500/30`}>
        
        {/* GLOBAL FIXED SIDEBAR */}
        <aside className="w-[280px] bg-[#1E1F22] flex flex-col flex-shrink-0 h-full border-r border-white/5">
          {/* Header */}
          <div className="h-16 px-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl"> </span>
              <span className="text-[15px] font-medium text-white tracking-wide">   Sumiran Shrestha</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-3 mt-4">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-white/10 text-white text-sm font-medium transition-colors">
              <span className="text-lg">🏠</span> Dashboard
            </Link>
            <Link href="/tasks" className="flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-white/5 text-slate-300 transition-colors text-sm">
              <span className="text-lg">📚</span> Academic Planner
            </Link>
            <Link href="/transit" className="flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-white/5 text-slate-300 transition-colors text-sm">
              <span className="text-lg">🚌</span> Live Transit
            </Link>
            <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-white/5 text-slate-300 transition-colors text-sm">
              <span className="text-lg">🛍️</span> Marketplace
            </Link>
          </nav>

          {/* Empty flex-1 pushes profile to the very bottom */}
          <div className="flex-1"></div>

          {/* Bottom Profile Settings */}
          <div className="mt-auto p-4 mb-2 mx-2 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white shadow-inner">
                AJ
              </div>
              <span className="text-[14px] font-medium text-slate-200">Alex_ Student</span>
            </div>
            <span className="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
          </div>
        </aside>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#131314]">
          {children}
        </main>

      </body>
    </html>
  )
}