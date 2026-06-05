"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/dashboard/projects/ProjectForm";
import { fetchProject, updateProject } from "@/lib/projectService";
import { Project, ProjectPayload } from "@/types/project";

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProject(id).then(setProject);
  }, [id]);

  const handleSubmit = async (data: ProjectPayload) => {
    await updateProject(id, data);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard/projects"
            className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
          >
            ← Back to projects
          </Link>
          <h1 className="text-2xl font-bold text-white mt-3">Edit Project</h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <ProjectForm
            initialData={{
              title: project.title,
              description: project.description,
              imageUrl: project.imageUrl || "",
              link: project.link || "",
              githubUrl: project.githubUrl || "",
              secondaryGithubUrl: project.secondaryGithubUrl || "",
              category: project.category,
              projectType: project.projectType,
              contributors: project.contributors,
              isFeatured: project.isFeatured,
            }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
