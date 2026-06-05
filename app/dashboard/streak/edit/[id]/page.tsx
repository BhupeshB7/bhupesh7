"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StreakForm from "@/components/dashboard/streak/StreakForm";
import { fetchStreaks, updateStreak } from "@/lib/streakService";
import { Streak, StreakPayload } from "@/types/streak";

export default function StreakEditPage() {
  const { id } = useParams<{ id: string }>();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [prevCounts, setPrevCounts] = useState({ dsa: 0, node: 0, system: 0 });

  useEffect(() => {
    (async () => {
      const streaks = await fetchStreaks();
      const idx = streaks.findIndex((s) => s.$id === id);
      if (idx !== -1) {
        setStreak(streaks[idx]);
        const prev = streaks[idx + 1];
        if (prev) {
          setPrevCounts({
            dsa: prev.dsaCount,
            node: prev.nodeCount,
            system: prev.systemCount,
          });
        }
      }
    })();
  }, [id]);

  if (!streak) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center text-gray-500">
        Loading...
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
          <h1 className="text-2xl font-bold text-white mt-3">Edit Entry</h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <StreakForm
            initialData={{
              date: streak.date,
              dsaDone: streak.dsaDone,
              dsaCount: streak.dsaCount,
              dsaMeta: streak.dsaMeta,
              nodeDone: streak.nodeDone,
              nodeCount: streak.nodeCount,
              nodeMeta: streak.nodeMeta,
              systemDone: streak.systemDone,
              systemCount: streak.systemCount,
              systemMeta: streak.systemMeta,
            }}
            prevCounts={prevCounts}
            onSubmit={async (data) => { await updateStreak(id, data); }}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
