"use client";

import { motion } from "framer-motion";
import { staggerContainer, VIEWPORT } from "@/components/animations/variants";
import { BLOG_POSTS } from "@/lib/constants";
import BlogPostCard from "./BlogPostCard";

export default function BlogGrid() {
  // All posts except the featured one
  const posts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(14px, 2vw, 20px)",
        alignItems: "stretch",
      }}
    >
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
