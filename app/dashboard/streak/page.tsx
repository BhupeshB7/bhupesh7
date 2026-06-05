"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { fetchStreaks, deleteStreak } from "@/lib/streakService";
import { Streak } from "@/types/streak";
import { Check, X } from "lucide-react";

const ITEMS_PER_PAGE = 20;

function Dot({ done }: { done: boolean }) {
  return done ? (
    <span className="inline-flex items-center gap-1 text-xs text-green-400">
      <Check className="w-3 h-3" /> Done
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-red-400">
      <X className="w-3 h-3" /> Skip
    </span>
  );
}

export default function StreakListPage() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setStreaks(await fetchStreaks());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await deleteStreak(id);
    setStreaks((b) => b.filter((x) => x.$id !== id));
  };

  const filtered = useMemo(
    () =>
      streaks.filter((s) =>
        s.date.includes(searchTerm)
      ),
    [streaks, searchTerm]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Streak
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"} found
            </p>
          </div>
          <Link
            href="/dashboard/streak/create"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Log Day
          </Link>
        </div>

        <div className="bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl p-6 mb-8">
          <div className="relative max-w-xs">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by date..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#0a0a14] border border-[#2a2a3a] rounded-xl pl-10 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
            <p className="text-gray-500 mt-4">Loading streak...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20 bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl">
            <p className="text-gray-500 mb-4">No entries found.</p>
            <Link href="/dashboard/streak/create" className="text-purple-400 hover:text-purple-300 transition-colors">
              Log your first day →
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginated.map((streak) => (
                <div
                  key={streak.$id}
                  className="group bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex items-center p-5 gap-4">
                    <div className="flex-1 min-w-0">
                      <Link href={`/dashboard/streak/${streak.$id}`}>
                        <h2 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                          {new Date(streak.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </h2>
                      </Link>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          DSA <Dot done={streak.dsaDone} /> ({streak.dsaCount})
                        </span>
                        <span className="text-sm text-gray-500">
                          Node <Dot done={streak.nodeDone} /> ({streak.nodeCount})
                        </span>
                        <span className="text-sm text-gray-500">
                          System <Dot done={streak.systemDone} /> ({streak.systemCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link
                        href={`/dashboard/streak/edit/${streak.$id}`}
                        className="px-4 py-2 text-sm bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500 text-gray-300 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(streak.$id)}
                        className="px-4 py-2 text-sm bg-[#1a1a24] border border-red-800/50 hover:border-red-500 text-red-400 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-[#1a1a24] border border-[#2a2a3a] text-gray-400 hover:border-purple-500"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
