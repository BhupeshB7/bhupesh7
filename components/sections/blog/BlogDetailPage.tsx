"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchBlog } from "@/lib/blogService";
import { Blog } from "@/types/blog";

function getAccentColor(category: string): string {
  const colors: Record<string, string> = {
    technology: "#8b5cf6",
    lifestyle: "#ec489a",
    finance: "#10b981",
    health: "#ef4444",
    education: "#f59e0b",
    frontend: "#06b6d4",
    backend: "#6b7280",
    database: "#14b8a6",
    ai: "#a855f7",
    fullstack: "#f97316",
    optimization: "#84cc16",
    interview: "#6366f1",
  };
  return colors[category] || "#6366f1";
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlog(id as string);
        setBlog(data);
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadBlog();
  }, [id]);

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
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          background: "#07080f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Post not found</p>
        <Link
          href="/blog"
          style={{
            color: "#818cf8",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back to all posts
        </Link>
      </div>
    );
  }

  const accent = getAccentColor(blog.category ?? "");
  const readTime = Math.ceil(blog.content.split(" ").length / 200);

  return (
    <div
      style={{
        background: "#07080f",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
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
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "repeating-linear-gradient(  0deg, rgba(129,140,248,0.012) 0px, rgba(129,140,248,0.012) 1px, transparent 1px, transparent 28px)",
            "repeating-linear-gradient( 90deg, rgba(129,140,248,0.006) 0px, rgba(129,140,248,0.006) 1px, transparent 1px, transparent 28px)",
          ].join(", "),
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(40px,8vw,80px) clamp(1.5rem,5vw,3rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: blog.featuredImage ? "1fr 320px" : "1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
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
              Back to all posts
            </Link>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  color: accent,
                  background: `${accent}10`,
                  border: `1px solid ${accent}20`,
                  borderRadius: "3px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                {blog.category}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "3px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                }}
              >
                {readTime} min read
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                marginBottom: "24px",
                background: `linear-gradient(135deg, #fff, ${accent}cc)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {blog.postTitle}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                marginBottom: "48px",
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                }}
              >
                <User size={14} />
                <span>{blog.author}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                }}
              >
                <Calendar size={14} />
                <time dateTime={blog.publishDate}>
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>

            <div
              className="blog-content"
              style={{
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.85)",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div
              style={{
                marginTop: "60px",
                paddingTop: "40px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
              }}
            >
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#818cf8",
                  textDecoration: "none",
                  fontSize: "14px",
                  padding: "12px 24px",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "12px",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                }}
              >
                <ArrowLeft size={14} />
                Read more articles
              </Link>
            </div>
          </div>

          {blog.featuredImage && (
            <div
              style={{
                position: "sticky",
                top: "100px",
                alignSelf: "start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: `1px solid ${accent}30`,
                  background: `linear-gradient(135deg, ${accent}10, transparent)`,
                }}
              >
                <img
                  src={blog.featuredImage}
                  alt={blog.postTitle}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    opacity: 0.85,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: [
                      "repeating-linear-gradient(0deg, rgba(129,140,248,0.03) 0px, rgba(129,140,248,0.03) 1px, transparent 1px, transparent 16px)",
                      "repeating-linear-gradient(90deg, rgba(129,140,248,0.02) 0px, rgba(129,140,248,0.02) 1px, transparent 1px, transparent 16px)",
                    ].join(", "),
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .blog-content h1,
          .blog-content h2,
          .blog-content h3 {
            color: #fff;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
            letter-spacing: -0.01em;
          }
          .blog-content h1 { font-size: 1.8rem; }
          .blog-content h2 { font-size: 1.5rem; }
          .blog-content h3 { font-size: 1.3rem; }
          .blog-content p {
            margin-bottom: 1.2em;
          }
          .blog-content a {
            color: #818cf8;
            text-decoration: none;
            border-bottom: 1px solid rgba(129,140,248,0.3);
            transition: border-color 0.2s;
          }
          .blog-content a:hover {
            border-bottom-color: #818cf8;
          }
          .blog-content code {
            background: rgba(255,255,255,0.05);
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-size: 0.9em;
            font-family: monospace;
          }
          .blog-content pre {
            background: rgba(0,0,0,0.3);
            padding: 1em;
            border-radius: 12px;
            overflow-x: auto;
            margin: 1.5em 0;
          }
          .blog-content img {
            max-width: 100%;
            border-radius: 12px;
            margin: 1.5em 0;
          }
          .blog-content blockquote {
            border-left: 3px solid #818cf8;
            padding-left: 1.2em;
            margin: 1.5em 0;
            color: rgba(255,255,255,0.6);
            font-style: italic;
          }
          .blog-content ul, .blog-content ol {
            margin: 1em 0;
            padding-left: 1.5em;
          }
          .blog-content li {
            margin: 0.5em 0;
          }
        }

        @media (max-width: 768px) {
          .blog-content h1,
          .blog-content h2,
          .blog-content h3 {
            color: #fff;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
            letter-spacing: -0.01em;
          }
          .blog-content h1 { font-size: 1.8rem; }
          .blog-content h2 { font-size: 1.5rem; }
          .blog-content h3 { font-size: 1.3rem; }
          .blog-content p {
            margin-bottom: 1.2em;
          }
          .blog-content a {
            color: #818cf8;
            text-decoration: none;
            border-bottom: 1px solid rgba(129,140,248,0.3);
            transition: border-color 0.2s;
          }
          .blog-content a:hover {
            border-bottom-color: #818cf8;
          }
          .blog-content code {
            background: rgba(255,255,255,0.05);
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-size: 0.9em;
            font-family: monospace;
          }
          .blog-content pre {
            background: rgba(0,0,0,0.3);
            padding: 1em;
            border-radius: 12px;
            overflow-x: auto;
            margin: 1.5em 0;
          }
          .blog-content img {
            max-width: 100%;
            border-radius: 12px;
            margin: 1.5em 0;
          }
          .blog-content blockquote {
            border-left: 3px solid #818cf8;
            padding-left: 1.2em;
            margin: 1.5em 0;
            color: rgba(255,255,255,0.6);
            font-style: italic;
          }
          .blog-content ul, .blog-content ol {
            margin: 1em 0;
            padding-left: 1.5em;
          }
          .blog-content li {
            margin: 0.5em 0;
          }
        }
      `}</style>
    </div>
  );
}
