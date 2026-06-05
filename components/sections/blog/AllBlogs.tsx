// app/blog/page.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "@/lib/blogService";
import { Blog } from "@/types/blog";
import BlogPostCard from "./BlogPostCard";
export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);

  if (loading) {
    return (
      <div
        style={{
          background: "#07080f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid rgba(99,102,241,0.2)",
            borderTopColor: "#6366f1",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#07080f",
        color: "#fff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(55% 40% at 92% 10%,  rgba(99,102,241,0.11) 0%, rgba(99,102,241,0) 70%)",
            "radial-gradient(45% 35% at 6%  88%,  rgba(0,229,255,0.05)  0%, rgba(0,229,255,0)  72%)",
          ].join(", "),
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(40px,8vw,80px) clamp(1.5rem,5vw,3rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: "13px",
              marginBottom: "40px",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
            }
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-.02em",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #fff, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            All Blog Posts
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
              marginBottom: "48px",
            }}
          >
            {blogs.length} articles about code, design, and everything in
            between
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                position: "relative",
              }}
            >
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.3)",
                }}
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "12px",
                  padding: "12px 12px 12px 36px",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat ?? ""} value={cat ?? ""}>
                  {(cat ?? "").charAt(0).toUpperCase() + (cat ?? "").slice(1)}
                </option>
              ))}
            </select>
          </div>

          {filteredBlogs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <p>No posts found matching your criteria.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <BlogPostCard post={blog} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
