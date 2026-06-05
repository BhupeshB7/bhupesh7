"use client";
import Link from "next/link";
import BlogForm from "@/components/BlogForm";
import { createBlog } from "@/lib/blogService";
import { BlogPayload } from "@/types/blog";

export default function BlogCreatePage() {
  const handleSubmit = async (data: BlogPayload) => {
    await createBlog(data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/blog" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
            ← Back to posts
          </Link>
          <h1 className="text-2xl font-bold text-white mt-3">Create New Post</h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <BlogForm onSubmit={handleSubmit} submitLabel="Publish Post" />
        </div>
      </div>
    </div>
  );
}
