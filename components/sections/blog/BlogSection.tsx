"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "@/lib/blogService";
import { Blog } from "@/types/blog";
import BlogGrid from "./BlogGrid";
import BlogNewsletter from "./BlogNewsletter";
import FeaturedPost from "./FeaturedPost";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featured, setFeatured] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
        if (data.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * Math.min(3, data.length),
          );
          setFeatured(data[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const otherPosts = blogs.filter((post) => post.$id !== featured?.$id);

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

  return (
    <div
      id="blog"
      style={{
        background: "#07080f",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
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
            "radial-gradient(100% 55% at 50% 108%, rgba(7,8,15,1)        0%, rgba(7,8,15,0)    52%)",
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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "140px",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(7,8,15,0.92), rgba(7,8,15,0))",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(7,8,15,0), rgba(7,8,15,0.88))",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(72px,9vw,120px) clamp(1.5rem,5vw,4rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "clamp(1.5rem,5vw,4rem)",
            right: "clamp(1.5rem,5vw,4rem)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "clamp(40px,5.5vw,60px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-[10px] mb-[14px]">
              <div
                className="h-px w-8 shrink-0"
                style={{
                  background: "linear-gradient(to right, #6366f1, transparent)",
                }}
              />
              <span
                className="font-mono text-[9px] tracking-[.14em] uppercase"
                style={{ color: "#818cf8" }}
              >
                Writing
              </span>
            </div>

            <h2
              className="font-display mb-[10px]"
              style={{
                fontSize: "clamp(1.8rem,4.5vw,3rem)",
                letterSpacing: "-.01em",
                lineHeight: 1,
              }}
            >
              LATEST POSTS
            </h2>
            <p
              className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
              style={{ color: "rgba(255,255,255,.22)" }}
            >
              Thoughts on code, architecture, and shipping
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-[14px]"
          >
            <span
              className="font-mono text-[10px] tracking-[.06em]"
              style={{ color: "rgba(255,255,255,.2)" }}
            >
              {blogs.length} posts
            </span>
            <Link
              href="/blog/all"
              className="font-mono text-[10px] tracking-[.1em] uppercase no-underline"
              style={{
                color: "#818cf8",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "5px",
                padding: "8px 14px",
                background: "rgba(99,102,241,0.06)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="inline-flex items-center gap-[5px]">
                All posts <ArrowUpRight size={10} strokeWidth={1.8} />
              </span>
            </Link>
          </motion.div>
        </div>

        {featured && (
          <div style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
            <FeaturedPost post={featured} />
          </div>
        )}

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.14), transparent)",
            marginBottom: "clamp(32px,4vw,48px)",
          }}
        />

        <div style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
          <BlogGrid posts={otherPosts} />
        </div>

        <BlogNewsletter />
      </div>
    </div>
  );
}
