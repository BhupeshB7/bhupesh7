"use client";

import { motion } from "framer-motion";
import { Blog } from "@/types/blog";
import BlogPostCard from "./BlogPostCard";

export default function BlogGrid({ posts }: { posts: Blog[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(14px, 2vw, 20px)",
        alignItems: "stretch",
      }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.$id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <BlogPostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
