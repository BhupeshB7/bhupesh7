"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { fetchBlog, updateBlog } from "@/lib/blogService";
import { Blog, BlogPayload } from "@/types/blog";

export default function BlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlog(id).then(setBlog);
  }, [id]);

  const handleSubmit = async (data: BlogPayload) => {
    await updateBlog(id, data);
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/blog" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
            ← Back to posts
          </Link>
          <h1 className="text-2xl font-bold text-white mt-3">Edit Post</h1>
        </div>
        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-6">
          <BlogForm
            initialData={{
              postTitle: blog.postTitle,
              author: blog.author,
              content: blog.content,
              publishDate: new Date(blog.publishDate).toISOString().slice(0, 16),
              category: blog.category || "",
              featuredImage: blog.featuredImage || "",
            }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
