"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { BlogPayload } from "@/types/blog";
import ImageUploader from "./ImageUploader";
import {
  ChevronDown,
  Check,
  Loader2,
  ImageIcon,
  Calendar,
  User,
  Tag,
  Type,
  X
} from "lucide-react";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "finance", label: "Finance" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "ai", label: "AI" },
  { value: "fullstack", label: "Fullstack" },
  { value: "optimization", label: "Optimization" },
  { value: "interview", label: "Interview" },
];

type Props = {
  initialData?: Partial<BlogPayload>;
  onSubmit: (data: BlogPayload) => Promise<void>;
  submitLabel: string;
};

export default function BlogForm({
  initialData,
  onSubmit,
  submitLabel,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editorUploading, setEditorUploading] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<BlogPayload>({
    postTitle: "",
    author: "",
    content: "",
    publishDate: new Date().toISOString().slice(0, 16),
    category: "",
    featuredImage: "",
    ...initialData,
  });

  const set = (key: keyof BlogPayload, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editorUploading) return;
    setLoading(true);
    try {
      await onSubmit(form);
      router.push("/dashboard/blog");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = CATEGORIES.find(c => c.value === form.category);

  const inputCls = "w-full bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Type className="w-4 h-4 text-purple-500" />
          Post Title *
        </label>
        <input
          required
          maxLength={255}
          value={form.postTitle}
          onChange={(e) => set("postTitle", e.target.value)}
          placeholder="Enter an engaging title..."
          className={inputCls}
        />
        <p className="text-xs text-gray-500">{form.postTitle.length}/255 characters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-500" />
            Author *
          </label>
          <input
            required
            maxLength={128}
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Your name or pen name"
            className={inputCls}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            Publish Date *
          </label>
          <input
            required
            type="datetime-local"
            value={form.publishDate}
            onChange={(e) => set("publishDate", e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="space-y-2" ref={categoryRef}>
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500" />
            Category
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`${inputCls} text-left flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                {selectedCategory ? (
                  <span>{selectedCategory.label}</span>
                ) : (
                  <span className="text-gray-500">Select a category</span>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCategoryOpen(false)}
                />
                <div className="absolute z-20 mt-2 w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      set("category", "");
                      setIsCategoryOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors text-gray-400 hover:text-gray-200 flex items-center justify-between"
                  >
                    <span>No category</span>
                    {form.category === "" && <Check className="w-4 h-4 text-purple-500" />}
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        set("category", cat.value);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                    >
                      <span className="text-gray-300 group-hover:text-white">{cat.label}</span>
                      {form.category === cat.value && (
                        <Check className="w-4 h-4 text-purple-500" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-purple-500" />
            Featured Image
          </label>
          <ImageUploader
            value={form.featuredImage || ""}
            onChange={(url) => set("featuredImage", url)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Type className="w-4 h-4 text-purple-500" />
            Content *
          </label>
          {editorUploading && (
            <span className="text-xs text-purple-400 animate-pulse flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Uploading image...
            </span>
          )}
        </div>
        <QuillEditor
          value={form.content}
          onChange={(v) => set("content", v)}
          onUploadStart={() => setEditorUploading(true)}
          onUploadEnd={() => setEditorUploading(false)}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading || editorUploading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Saving..." : editorUploading ? "Waiting for upload..." : submitLabel}
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
