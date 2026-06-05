"use client";

import Link from "next/link";
import { createProject } from "@/lib/projectService";
import { ProjectPayload } from "@/types/project";
import ProjectForm from "@/components/dashboard/projects/ProjectForm";

export default function ProjectCreatePage() {
  const handleSubmit = async (data: ProjectPayload) => {
    await createProject(data);
  };

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
          <h1 className="text-2xl font-bold text-white mt-3">
            Create New Project
          </h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <ProjectForm onSubmit={handleSubmit} submitLabel="Publish Project" />
        </div>
      </div>
    </div>
  );
}
