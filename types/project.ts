export interface Contributor {
  name: string;
  role: string;
}

export interface Project {
  $id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  link: string | null;
  githubUrl: string | null;
  secondaryGithubUrl: string | null;
  category: string;
  subcategory?: string;
  projectType: "solo" | "team";
  contributors: Contributor[];
  isFeatured: boolean;
  $createdAt: string;
  $updatedAt: string;
}

export interface ProjectPayload {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  githubUrl?: string;
  secondaryGithubUrl?: string;
  category: string;
  subcategory?: string;
  projectType: "solo" | "team";
  contributors: Contributor[];
  isFeatured: boolean;
}
