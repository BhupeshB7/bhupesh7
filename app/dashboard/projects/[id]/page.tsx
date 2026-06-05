"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Link as LinkIcon,
  Users,
  User,
  Star,
  Calendar,
  Tag,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fetchProject, deleteProject } from "@/lib/projectService";
import { Project } from "@/types/project";

function getProjectTypeIcon(type: string) {
  return type === "team" ? (
    <Users className="w-4 h-4" />
  ) : (
    <User className="w-4 h-4" />
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProject(id as string);
        setProject(data);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProject();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id as string);
    router.push("/dashboard/projects");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center flex-col gap-4">
        <p className="text-gray-400">Project not found</p>
        <Link
          href="/dashboard/projects"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f1a] to-[#0a0a14]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Link>
            <div className="flex gap-3">
              <Link
                href={`/dashboard/projects/edit/${project.$id}`}
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

          {project.imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-[#2a2a3a]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="bg-[#13131f]/50 backdrop-blur-sm border border-[#2a2a3a] rounded-2xl p-8">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a1a24] text-gray-400 rounded-full text-xs">
                {getProjectTypeIcon(project.projectType)}
                {project.projectType === "team"
                  ? "Team Project"
                  : "Solo Project"}
              </span>
              {project.isFeatured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-[#2a2a3a]">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(project.$createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              )}
              {project.secondaryGithubUrl && (
                <a
                  href={project.secondaryGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  Secondary Repo
                </a>
              )}
            </div>

            {project.projectType === "team" &&
              project.contributors &&
              project.contributors.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    Contributors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.contributors.map((contributor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl"
                      >
                        <span className="text-gray-300 font-medium">
                          {contributor.name}
                        </span>
                        <span className="text-xs text-purple-400 bg-purple-600/20 px-2 py-1 rounded">
                          {contributor.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Description
              </h2>
              <div
                className="prose prose-invert prose-purple max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
