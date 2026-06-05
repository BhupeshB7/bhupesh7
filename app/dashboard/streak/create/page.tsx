"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createStreak, fetchStreaks } from "@/lib/streakService";
import { StreakPayload } from "@/types/streak";
import StreakForm from "@/components/dashboard/streak/StreakForm";

export default function StreakCreatePage() {
  const [prevCounts, setPrevCounts] = useState({ dsa: 0, node: 0, system: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const streaks = await fetchStreaks();
        if (streaks.length > 0) {
          const latest = streaks[0];
          setPrevCounts({
            dsa: latest.dsaCount,
            node: latest.nodeCount,
            system: latest.systemCount,
          });
        }
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard/streak"
            className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
          >
            ← Back to streak
          </Link>
          <h1 className="text-2xl font-bold text-white mt-3">Log New Day</h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <StreakForm
            prevCounts={prevCounts}
            onSubmit={async (data) => { await createStreak(data); }}
            submitLabel="Save Entry"
          />
        </div>
      </div>
    </div>
  );
}
