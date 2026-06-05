import { Blog, BlogPayload } from "@/types/blog";

const BASE = "/api/blogs";

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlog(id: string): Promise<Blog> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export async function createBlog(data: BlogPayload): Promise<Blog> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
}

export async function updateBlog(id: string, data: BlogPayload): Promise<Blog> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update blog");
  return res.json();
}

export async function deleteBlog(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");
}
