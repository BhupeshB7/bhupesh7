"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { fetchProjects, deleteProject } from "@/lib/projectService";
import { Project } from "@/types/project";
import {
  Star,
  Users,
  User,
  Eye,
  Github,
  Link as LinkIcon,
  Tag,
} from "lucide-react";

const ITEMS_PER_PAGE = 20;

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterFeatured, setFilterFeatured] = useState<
    "all" | "featured" | "normal"
  >("all");

  const load = async () => {
    setLoading(true);
    try {
      setProjects(await fetchProjects());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    setProjects((b) => b.filter((x) => x.$id !== id));
  };

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;
      const matchesFeatured =
        filterFeatured === "all" ||
        (filterFeatured === "featured" && project.isFeatured) ||
        (filterFeatured === "normal" && !project.isFeatured);
      return matchesSearch && matchesCategory && matchesFeatured;
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, filterFeatured]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
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
              Projects
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/dashboard/projects/create"
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
            New Project
          </Link>
        </div>

        <div className="bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                placeholder="Search by title..."
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={filterFeatured}
              onChange={(e) => {
                setFilterFeatured(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="normal">Not Featured</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-500 mt-4">Loading projects...</p>
          </div>
        ) : paginatedProjects.length === 0 ? (
          <div className="text-center py-20 bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl">
            <p className="text-gray-500 mb-4">No projects found.</p>
            <Link
              href="/dashboard/projects/create"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create your first project →
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedProjects.map((project) => (
                <div
                  key={project.$id}
                  className={`group relative bg-[#13131f]/50 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:shadow-xl ${
                    project.isFeatured
                      ? "border-purple-500/50 hover:border-purple-500 hover:shadow-purple-500/10"
                      : "border-[#2a2a3a] hover:border-purple-500/50 hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-center p-5 gap-4">
                    {project.imageUrl && (
                      <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/dashboard/projects/${project.$id}`}>
                          <h2 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors truncate">
                            {project.title}
                          </h2>
                        </Link>
                        {project.isFeatured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          {project.projectType === "team" ? (
                            <Users className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                          {project.projectType === "team"
                            ? `${project.contributors.length} contributors`
                            : "Solo"}
                        </span>
                        {project.githubUrl && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            Repo
                          </span>
                        )}
                        {project.link && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link
                        href={`/dashboard/projects/edit/${project.$id}`}
                        className="px-4 py-2 text-sm bg-[#1a1a24] border border-[#2a2a3a] hover:border-purple-500 text-gray-300 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project.$id)}
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
