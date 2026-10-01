import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Pulse AI",
  description: "All-in-one student dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-[#0b0f17] min-h-screen text-slate-200">
        {/* Sidebar */}
        <aside className="w-64 bg-[#111827] border-r border-slate-800 h-screen p-4 flex flex-col justify-between sticky top-0 shrink-0">
          <div className="space-y-6">
            <h1 className="text-base font-bold text-white px-2">Sumiran Shrestha</h1>

            <nav className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>🏠</span>
                <span>Dashboard</span>
              </Link>

              {/* Links to 'tasks' folder */}
              <Link
                href="/tasks"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>📚</span>
                <span>Academic Planner</span>
              </Link>

              {/* Links to 'transit' folder */}
              <Link
                href="/transit"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>🚌</span>
                <span>Live Transit</span>
              </Link>

              {/* Links to 'marketplace' folder */}
              <Link
                href="/marketplace"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>🛍️️</span>
                <span>Marketplace</span>
              </Link>
            </nav>
          </div>

          {/* User Footer Profile & Settings Link */}
          <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500 flex items-center justify-center text-xs font-bold text-white">
                N
              </div>
              <span className="text-xs font-semibold text-white">Alex_Student</span>
            </div>

            <Link
              href="/settings"
              title="Open Settings"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              ⚙️
            </Link>
          </div>
        </aside>

        {/* Main Content View */}
        <main className="flex-1 overflow-y-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}