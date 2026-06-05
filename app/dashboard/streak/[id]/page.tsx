"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, ExternalLink } from "lucide-react";
import { fetchStreak, deleteStreak } from "@/lib/streakService";
import { Streak, StreakMeta } from "@/types/streak";

function StatusBadge({ done }: { done: boolean }) {
  return done ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
      <Check className="w-3 h-3" /> Done
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
      <X className="w-3 h-3" /> Skipped
    </span>
  );
}

function MetaList({ items }: { items: StreakMeta[] }) {
  if (!items.length) return <p className="text-gray-500 text-sm">—</p>;
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
          {item.ref ? (
            <a
              href={item.ref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center gap-1"
            >
              {item.title}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span>{item.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  label,
  done,
  count,
  meta,
}: {
  label: string;
  done: boolean;
  count: number;
  meta: StreakMeta[];
}) {
  return (
    <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">{label}</h3>
        <StatusBadge done={done} />
      </div>
      <p className="text-sm text-gray-400">
        Count: <span className="text-purple-400 font-medium">{count}</span>
      </p>
      <MetaList items={meta} />
    </div>
  );
}

export default function StreakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStreak(id as string);
        setStreak(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this entry?")) return;
    await deleteStreak(id as string);
    router.push("/dashboard/streak");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!streak) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center flex-col gap-4">
        <p className="text-gray-400">Entry not found</p>
        <Link href="/dashboard/streak" className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Back to streak
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard/streak"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to streak
            </Link>
            <div className="flex gap-3">
              <Link
                href={`/dashboard/streak/edit/${streak.$id}`}
                className="px-4 py-2 text-sm bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500 text-gray-300 rounded-xl transition-all duration-200"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-[#1a1a24] border border-red-800/50 hover:border-red-500 text-red-400 rounded-xl transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-white">
              {new Date(streak.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h1>
            <SectionCard label="DSA" done={streak.dsaDone} count={streak.dsaCount} meta={streak.dsaMeta} />
            <SectionCard label="Node / Backend" done={streak.nodeDone} count={streak.nodeCount} meta={streak.nodeMeta} />
            <SectionCard label="System Design" done={streak.systemDone} count={streak.systemCount} meta={streak.systemMeta} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
