"use client";

import { useState } from "react";
import { Plus, Trash2, User, Briefcase } from "lucide-react";
import { Contributor } from "@/types/project";

const ROLE_OPTIONS = [
  { value: "backend", label: "Backend Developer" },
  { value: "frontend", label: "Frontend Developer" },
  { value: "fullstack", label: "Fullstack Developer" },
  { value: "design", label: "UI/UX Designer" },
  { value: "documentation", label: "Documentation" },
  { value: "prototype", label: "Prototype" },
  { value: "mentor", label: "Mentor" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "mobile", label: "Mobile Developer" },
  { value: "qa", label: "QA Engineer" },
  { value: "project_manager", label: "Project Manager" },
  { value: "security", label: "Security Specialist" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "ml_engineer", label: "ML Engineer" },
];

type Props = {
  contributors: Contributor[];
  onChange: (contributors: Contributor[]) => void;
};

export default function ContributorsManager({ contributors, onChange }: Props) {
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  const addContributor = () => {
    if (!newName.trim()) return;
    onChange([
      ...contributors,
      { name: newName.trim(), role: newRole || "Contributor" },
    ]);
    setNewName("");
    setNewRole("");
  };

  const removeContributor = (index: number) => {
    onChange(contributors.filter((_, i) => i !== index));
  };

  const updateContributor = (
    index: number,
    field: keyof Contributor,
    value: string,
  ) => {
    const updated = [...contributors];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const inputCls =
    "bg-[#0a0a14] border border-[#2a2a3a] rounded-xl px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm";

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Contributor name"
            className={`${inputCls} pl-9 w-full`}
            onKeyDown={(e) => e.key === "Enter" && addContributor()}
          />
        </div>
        <div className="flex-1 relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className={`${inputCls} pl-9 w-full appearance-none cursor-pointer`}
          >
            <option value="">Select role</option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role.value} value={role.label}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={addContributor}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {contributors.length > 0 && (
        <div className="space-y-2">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="flex gap-3 items-center p-3 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={contributor.name}
                  onChange={(e) =>
                    updateContributor(index, "name", e.target.value)
                  }
                  className={`${inputCls} w-full`}
                />
              </div>
              <div className="flex-1">
                <select
                  value={contributor.role}
                  onChange={(e) =>
                    updateContributor(index, "role", e.target.value)
                  }
                  className={`${inputCls} w-full appearance-none cursor-pointer`}
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role.value} value={role.label}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeContributor(index)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
