"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { fetchBlogs, deleteBlog } from "@/lib/blogService";
import { Blog } from "@/types/blog";

const CATEGORIES = [
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "lifestyle", label: "Lifestyle", icon: "🌟" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "health", label: "Health", icon: "💪" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "frontend", label: "Frontend", icon: "🎨" },
  { value: "backend", label: "Backend", icon: "⚙️" },
  { value: "database", label: "Database", icon: "🗄️" },
  { value: "ai", label: "AI", icon: "🤖" },
  { value: "fullstack", label: "Fullstack", icon: "🚀" },
  { value: "optimization", label: "Optimization", icon: "⚡" },
  { value: "interview", label: "Interview", icon: "🎯" },
];

const ITEMS_PER_PAGE = 20;

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "title" | "views">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const load = async () => {
    setLoading(true);
    try {
      setBlogs(await fetchBlogs());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlog(id);
    setBlogs((b) => b.filter((x) => x.$id !== id));
  };

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else if (sortBy === "title") {
        return sortOrder === "desc"
          ? b.postTitle.localeCompare(a.postTitle)
          : a.postTitle.localeCompare(b.postTitle);
      } else {
        const viewsA = a.viewCount || 0;
        const viewsB = b.viewCount || 0;
        return sortOrder === "desc" ? viewsB - viewsA : viewsA - viewsB;
      }
    });

    return filtered;
  }, [blogs, searchTerm, selectedCategory, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredAndSortedBlogs.length} post
              {filteredAndSortedBlogs.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/dashboard/blog/create"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Post
          </Link>
        </div>

        <div className="bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#0a0a14] border border-[#2a2a3a] rounded-xl pl-10 pr-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="views">Sort by Views</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder((order) => (order === "desc" ? "asc" : "desc"))
                }
                className="px-4 bg-[#0a0a14] border border-[#2a2a3a] rounded-xl hover:border-purple-500 transition-colors"
              >
                {sortOrder === "desc" ? "↓" : "↑"}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-500 mt-4">Loading posts...</p>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="text-center py-20 bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl">
            <p className="text-gray-500 mb-4">No posts found.</p>
            <Link
              href="/dashboard/blog/create"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedBlogs.map((blog) => (
                <div
                  key={blog.$id}
                  className="group relative bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex items-center p-5 gap-4">
                    {blog.featuredImage && (
                      <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={blog.featuredImage}
                          alt={blog.postTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link href={`/dashboard/blog/${blog.$id}`}>
                        <h2 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors truncate">
                          {blog.postTitle}
                        </h2>
                      </Link>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {blog.author}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(blog.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                        {blog.category && (
                          <span className="px-2.5 py-0.5 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium flex items-center gap-1">
                            <span>
                              {
                                CATEGORIES.find(
                                  (c) => c.value === blog.category,
                                )?.icon
                              }
                            </span>
                            <span className="capitalize">{blog.category}</span>
                          </span>
                        )}
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {blog.viewCount || 0} views
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link
                        href={`/dashboard/blog/edit/${blog.$id}`}
                        className="px-4 py-2 text-sm bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500 text-gray-300 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.$id)}
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
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
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
