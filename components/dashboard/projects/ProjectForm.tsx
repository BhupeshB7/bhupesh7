"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ProjectPayload } from "@/types/project";
import ImageUploader from "@/components/ImageUploader";
import ContributorsManager from "./ContributorsManager";
import {
  ChevronDown,
  Check,
  Loader2,
  ImageIcon,
  Link as LinkIcon,
  Github,
  Tag,
  Users,
  User,
  Star,
  X,
  Layers,
} from "lucide-react";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

const CATEGORIES = [
  {
    value: "web",
    label: "Web Development",
    subcategories: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "fullstack", label: "Fullstack" },
      { value: "jamstack", label: "Jamstack" },
      { value: "wordpress", label: "WordPress" },
      { value: "ecommerce", label: "E-commerce" },
    ]
  },
  {
    value: "mobile",
    label: "Mobile App",
    subcategories: [
      { value: "android", label: "Android" },
      { value: "ios", label: "iOS" },
      { value: "react_native", label: "React Native" },
      { value: "flutter", label: "Flutter" },
      { value: "cross_platform", label: "Cross Platform" },
    ]
  },
  {
    value: "ai",
    label: "AI/ML",
    subcategories: [
      { value: "machine_learning", label: "Machine Learning" },
      { value: "deep_learning", label: "Deep Learning" },
      { value: "nlp", label: "NLP" },
      { value: "computer_vision", label: "Computer Vision" },
      { value: "llm", label: "LLM / GPT" },
    ]
  },
  {
    value: "blockchain",
    label: "Blockchain",
    subcategories: [
      { value: "web3", label: "Web3" },
      { value: "defi", label: "DeFi" },
      { value: "nft", label: "NFT" },
      { value: "smart_contracts", label: "Smart Contracts" },
    ]
  },
  {
    value: "devops",
    label: "DevOps",
    subcategories: [
      { value: "ci_cd", label: "CI/CD" },
      { value: "containerization", label: "Containerization" },
      { value: "cloud", label: "Cloud" },
      { value: "monitoring", label: "Monitoring" },
    ]
  },
  {
    value: "design",
    label: "Design System",
    subcategories: [
      { value: "ui_design", label: "UI Design" },
      { value: "ux_design", label: "UX Design" },
      { value: "design_tokens", label: "Design Tokens" },
      { value: "component_library", label: "Component Library" },
    ]
  },
  {
    value: "opensource",
    label: "Open Source",
    subcategories: [
      { value: "library", label: "Library" },
      { value: "framework", label: "Framework" },
      { value: "tool", label: "Tool" },
      { value: "cli", label: "CLI" },
    ]
  },
  {
    value: "game",
    label: "Game Development",
    subcategories: [
      { value: "unity", label: "Unity" },
      { value: "unreal", label: "Unreal Engine" },
      { value: "2d", label: "2D Game" },
      { value: "3d", label: "3D Game" },
    ]
  },
  {
    value: "iot",
    label: "IoT",
    subcategories: [
      { value: "embedded", label: "Embedded Systems" },
      { value: "smart_home", label: "Smart Home" },
      { value: "wearables", label: "Wearables" },
    ]
  },
  {
    value: "security",
    label: "Security",
    subcategories: [
      { value: "penetration_testing", label: "Penetration Testing" },
      { value: "encryption", label: "Encryption" },
      { value: "auth", label: "Authentication" },
      { value: "vulnerability", label: "Vulnerability Scanner" },
    ]
  },
];

type Props = {
  initialData?: Partial<ProjectPayload>;
  onSubmit: (data: ProjectPayload) => Promise<void>;
  submitLabel: string;
};

export default function ProjectForm({
  initialData,
  onSubmit,
  submitLabel,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editorUploading, setEditorUploading] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const subcategoryRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<ProjectPayload>({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    githubUrl: "",
    secondaryGithubUrl: "",
    category: "",
    subcategory: "",
    projectType: "solo",
    contributors: [],
    isFeatured: false,
    ...initialData,
  });

  const set = (key: keyof ProjectPayload, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editorUploading) return;
    setLoading(true);
    try {
      const submitData = {
        ...form,
        category: form.subcategory || form.category,
      };
      await onSubmit(submitData);
      router.push("/dashboard/projects");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = CATEGORIES.find((c) => c.value === form.category);
  const selectedSubcategory = selectedCategory?.subcategories?.find(
    (s) => s.value === form.subcategory
  );

  const inputCls =
    "w-full bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Star className="w-4 h-4 text-purple-500" />
          Project Title *
        </label>
        <input
          required
          maxLength={255}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Enter project title..."
          className={inputCls}
        />
        <p className="text-xs text-gray-500">
          {form.title.length}/255 characters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2" ref={categoryRef}>
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500" />
            Main Category *
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
                  <span className="text-gray-500">Select main category</span>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCategoryOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCategoryOpen(false)}
                />
                <div className="absolute z-20 mt-2 w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        set("category", cat.value);
                        set("subcategory", "");
                        setIsCategoryOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                    >
                      <span className="text-gray-300 group-hover:text-white">
                        {cat.label}
                      </span>
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

        {selectedCategory?.subcategories && selectedCategory.subcategories.length > 0 && (
          <div className="space-y-2" ref={subcategoryRef}>
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              Subcategory
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
                className={`${inputCls} text-left flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  {selectedSubcategory ? (
                    <span>{selectedSubcategory.label}</span>
                  ) : (
                    <span className="text-gray-500">Select subcategory (optional)</span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${isSubcategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSubcategoryOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSubcategoryOpen(false)}
                  />
                  <div className="absolute z-20 mt-2 w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        set("subcategory", "");
                        setIsSubcategoryOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                    >
                      <span className="text-gray-400 group-hover:text-gray-300">
                        None
                      </span>
                      {form.subcategory === "" && (
                        <Check className="w-4 h-4 text-purple-500" />
                      )}
                    </button>
                    {selectedCategory.subcategories.map((sub) => (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => {
                          set("subcategory", sub.value);
                          setIsSubcategoryOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                      >
                        <span className="text-gray-300 group-hover:text-white">
                          {sub.label}
                        </span>
                        {form.subcategory === sub.value && (
                          <Check className="w-4 h-4 text-purple-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Optional: Choose a more specific category
            </p>
          </div>
        )}

        <div className="space-y-2" ref={typeRef}>
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            Project Type *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTypeOpen(!isTypeOpen)}
              className={`${inputCls} text-left flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    form.projectType === "team"
                      ? "text-green-400"
                      : "text-blue-400"
                  }
                >
                  {form.projectType === "team"
                    ? "👥 Team Project"
                    : "👤 Solo Project"}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${isTypeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isTypeOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsTypeOpen(false)}
                />
                <div className="absolute z-20 mt-2 w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      set("projectType", "solo");
                      setIsTypeOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      👤 Solo Project
                    </span>
                    {form.projectType === "solo" && (
                      <Check className="w-4 h-4 text-purple-500" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      set("projectType", "team");
                      setIsTypeOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#2a2a3a] transition-colors flex items-center justify-between group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      👥 Team Project
                    </span>
                    {form.projectType === "team" && (
                      <Check className="w-4 h-4 text-purple-500" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-purple-500" />
            Live Demo URL
          </label>
          <input
            type="url"
            value={form.link || ""}
            onChange={(e) => set("link", e.target.value)}
            placeholder="https://your-project.com"
            className={inputCls}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Github className="w-4 h-4 text-purple-500" />
            GitHub Repository
          </label>
          <input
            type="url"
            value={form.githubUrl || ""}
            onChange={(e) => set("githubUrl", e.target.value)}
            placeholder="https://github.com/username/repo"
            className={inputCls}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Github className="w-4 h-4 text-purple-500" />
            Secondary GitHub (Optional)
          </label>
          <input
            type="url"
            value={form.secondaryGithubUrl || ""}
            onChange={(e) => set("secondaryGithubUrl", e.target.value)}
            placeholder="https://github.com/username/another-repo"
            className={inputCls}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-500" />
            Featured Project
          </label>
          <div className="flex items-center gap-3 p-3 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl">
            <button
              type="button"
              onClick={() => set("isFeatured", !form.isFeatured)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                form.isFeatured ? "bg-purple-600" : "bg-[#2a2a3a]"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  form.isFeatured ? "left-6" : "left-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-400">
              {form.isFeatured ? "Featured on homepage" : "Not featured"}
            </span>
          </div>
        </div>
      </div>

      {form.projectType === "team" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            Contributors *
          </label>
          <ContributorsManager
            contributors={form.contributors}
            onChange={(contributors) => set("contributors", contributors)}
          />
          {form.contributors.length === 0 && (
            <p className="text-xs text-red-400">
              At least one contributor required for team projects
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-purple-500" />
          Project Image
        </label>
        <ImageUploader
          value={form.imageUrl || ""}
          onChange={(url) => set("imageUrl", url)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-500" />
            Description *
          </label>
          {editorUploading && (
            <span className="text-xs text-purple-400 animate-pulse flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Uploading image...
            </span>
          )}
        </div>
        <QuillEditor
          value={form.description}
          onChange={(v) => set("description", v)}
          onUploadStart={() => setEditorUploading(true)}
          onUploadEnd={() => setEditorUploading(false)}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={
            loading ||
            editorUploading ||
            (form.projectType === "team" && form.contributors.length === 0)
          }
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading
            ? "Saving..."
            : editorUploading
              ? "Waiting for upload..."
              : submitLabel}
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
