import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function MarketplacePage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <Link href="/" className="text-xs text-emerald-400 hover:underline">&larr; Back to Dashboard</Link>
            <h1 className="text-2xl font-bold mt-1">🛍️ Student Marketplace</h1>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
            + Create AI Listing
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-900">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">{item.condition.replace('_', ' ')}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-400">${item.price}</span>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}