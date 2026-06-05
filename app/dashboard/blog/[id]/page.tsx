"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fetchBlog, deleteBlog } from "@/lib/blogService";
import { Blog } from "@/types/blog";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlog(id).then(setBlog).catch(() => router.push("/dashboard/blog"));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await deleteBlog(id);
    router.push("/dashboard/blog");
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
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard/blog" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
            ← Back to posts
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/blog/edit/${blog.$id}`}
              className="px-4 py-1.5 text-sm bg-[#1e1e2e] border border-[#3b3b5c] hover:border-purple-600 text-gray-300 rounded-lg transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-1.5 text-sm border border-red-800/50 hover:border-red-500 text-red-400 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.postTitle}
            className="w-full h-56 object-cover rounded-xl mb-6"
          />
        )}

        <div className="bg-[#13131f] border border-[#3b3b5c] rounded-2xl p-8">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            {blog.category && (
              <span className="px-2.5 py-0.5 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium">
                {blog.category}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {new Date(blog.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{blog.postTitle}</h1>
          <p className="text-gray-500 text-sm mb-8">By {blog.author}</p>

          <div
            className="prose prose-invert prose-purple max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          {blog.viewCount} views · Last updated {new Date(blog.$updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
