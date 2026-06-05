"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StreakPayload, StreakMeta } from "@/types/streak";
import { Plus, Trash2, X, Loader2 } from "lucide-react";

type PrevCounts = { dsa: number; node: number; system: number };

type Props = {
  initialData?: Partial<StreakPayload>;
  prevCounts?: PrevCounts;
  onSubmit: (data: StreakPayload) => Promise<void>;
  submitLabel: string;
};

const inputCls =
  "w-full bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200";

function MetaManager({
  items,
  onChange,
}: {
  items: StreakMeta[];
  onChange: (items: StreakMeta[]) => void;
}) {
  const add = () => onChange([...items, { title: "", ref: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, key: keyof StreakMeta, val: string) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={item.title}
            onChange={(e) => update(i, "title", e.target.value)}
            placeholder="Title"
            className="flex-1 bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          <input
            value={item.ref}
            onChange={(e) => update(i, "ref", e.target.value)}
            placeholder="Link (optional)"
            className="flex-1 bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add item
      </button>
    </div>
  );
}

function SectionBlock({
  label,
  done,
  count,
  prevCount,
  meta,
  onDone,
  onCount,
  onMeta,
}: {
  label: string;
  done: boolean;
  count: number;
  prevCount?: number;
  meta: StreakMeta[];
  onDone: (v: boolean) => void;
  onCount: (v: number) => void;
  onMeta: (v: StreakMeta[]) => void;
}) {
  const isAutoMode = prevCount !== undefined;

  const handleToggle = () => {
    const next = !done;
    onDone(next);
    if (isAutoMode) {
      onCount(next ? prevCount + 1 : prevCount);
    }
  };

  return (
    <div className="bg-[#13131f] border border-[#2a2a3a] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{label}</h3>
          {isAutoMode && (
            <p className="text-xs text-gray-500 mt-0.5">
              {done ? (
                <>
                  <span className="text-gray-600 line-through">{prevCount}</span>
                  {" → "}
                  <span className="text-purple-400 font-medium">{count}</span>
                </>
              ) : (
                <span className="text-gray-500">stays at {prevCount}</span>
              )}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${done ? "bg-purple-600" : "bg-[#2a2a3a]"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${done ? "left-6" : "left-1"}`}
          />
        </button>
      </div>

      {!isAutoMode && (
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Count</label>
          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => onCount(Number(e.target.value))}
            className={inputCls}
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Items</label>
        <MetaManager items={meta} onChange={onMeta} />
      </div>
    </div>
  );
}

export default function StreakForm({ initialData, prevCounts, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<StreakPayload>({
    date: new Date().toISOString().split("T")[0],
    dsaDone: false,
    dsaCount: prevCounts?.dsa ?? 0,
    dsaMeta: [],
    nodeDone: false,
    nodeCount: prevCounts?.node ?? 0,
    nodeMeta: [],
    systemDone: false,
    systemCount: prevCounts?.system ?? 0,
    systemMeta: [],
    ...initialData,
  });

  const set = (key: keyof StreakPayload, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
      router.push("/dashboard/streak");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Date *</label>
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          className={inputCls}
        />
      </div>

      <SectionBlock
        label="DSA"
        done={form.dsaDone}
        count={form.dsaCount}
        prevCount={prevCounts?.dsa}
        meta={form.dsaMeta}
        onDone={(v) => set("dsaDone", v)}
        onCount={(v) => set("dsaCount", v)}
        onMeta={(v) => set("dsaMeta", v)}
      />

      <SectionBlock
        label="Node / Backend"
        done={form.nodeDone}
        count={form.nodeCount}
        prevCount={prevCounts?.node}
        meta={form.nodeMeta}
        onDone={(v) => set("nodeDone", v)}
        onCount={(v) => set("nodeCount", v)}
        onMeta={(v) => set("nodeMeta", v)}
      />

      <SectionBlock
        label="System Design"
        done={form.systemDone}
        count={form.systemCount}
        prevCount={prevCounts?.system}
        meta={form.systemMeta}
        onDone={(v) => set("systemDone", v)}
        onCount={(v) => set("systemCount", v)}
        onMeta={(v) => set("systemMeta", v)}
      />

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500 text-gray-300 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  );
}
