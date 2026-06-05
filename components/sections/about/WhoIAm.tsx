"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { motion } from "framer-motion";
import { BookOpen, Globe, Search, Zap } from "lucide-react";

const TRAITS = [
  {
    icon: Zap,
    label: "Execution focused",
    desc: "I ship fast without compromising scalability — from APIs to full production systems.",
  },
  {
    icon: Search,
    label: "System design mindset",
    desc: "I think in architecture — clean abstractions, SOLID principles, and scalable backend design.",
  },
  {
    icon: BookOpen,
    label: "Depth over surface",
    desc: "I don’t just use tools — I understand how they work internally and optimize them.",
  },
  {
    icon: Globe,
    label: "Open to work",
    desc: "Available for backend roles, freelance projects, and meaningful collaborations.",
  },
] as const;

const PULL_QUOTE =
  "I build systems that don’t just work — they scale, perform, and stay reliable.";

export default function WhoIAm() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[10px] mb-[16px]"
      >
        <div
          className="h-px w-8 shrink-0"
          style={{
            background: "linear-gradient(to right, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "var(--accent-light)" }}
        >
          Who I Am
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display mb-[48px]"
        style={{
          fontSize: "clamp(1.8rem,4vw,2.8rem)",
          letterSpacing: "-.01em",
          lineHeight: 1,
        }}
      >
        BACKGROUND &amp; APPROACH
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "start",
        }}
      >
        <motion.div variants={staggerContainer(0.07)}>
          {[
            "I'm Bhupesh Kumar, currently working as a Full Stack Developer with 1+ year of hands-on experience building production-ready applications using the MERN stack. I specialize in backend systems — designing APIs, handling data at scale, and building secure, efficient architectures.",
            "I have completed an internship at Edureka, where I worked on real-world development problems including API design, database modeling, and performance optimization. Since then, I’ve built and deployed multiple projects, including a Google Drive–like platform with authentication, file management, sharing systems, and security layers.",
            "My focus is not just writing code — I design systems. I actively apply SOLID principles, design patterns, caching strategies, and clean architecture to ensure everything I build is scalable and maintainable. I'm open to backend roles, freelance opportunities, and collaborations where I can contribute to building meaningful products.",
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={listItem}
              className="font-mono mb-[20px] last:mb-0"
              style={{
                fontSize: "clamp(11px, 1.25vw, 13px)",
                lineHeight: 2,
                color: "rgba(255,255,255,.42)",
                letterSpacing: ".015em",
              }}
            >
              {para}
            </motion.p>
          ))}

          <motion.blockquote
            variants={fadeUp}
            style={{
              marginTop: "36px",
              paddingLeft: "20px",
              borderLeft: "2px solid var(--accent)",
              position: "relative",
            }}
          >
            <span
              aria-hidden="true"
              className="font-serif"
              style={{
                position: "absolute",
                top: "-14px",
                left: "14px",
                fontSize: "3rem",
                color: "rgba(99,102,241,0.25)",
                lineHeight: 1,
                fontStyle: "italic",
              }}
            >
              "
            </span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,.65)",
                fontStyle: "italic",
                letterSpacing: ".01em",
              }}
            >
              {PULL_QUOTE}
            </p>
          </motion.blockquote>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {TRAITS.map((t) => (
            <motion.div
              key={t.label}
              variants={listItem}
              style={{
                display: "flex",
                gap: "16px",
                padding: "18px 20px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.016)",
                border: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <t.icon
                aria-hidden="true"
                size={18}
                strokeWidth={1.9}
                style={{
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: "2px",
                  color: "rgba(129,140,248,.85)",
                }}
              />
              <div>
                <p
                  className="font-mono text-[11px] tracking-[.06em] uppercase mb-[5px]"
                  style={{ color: "rgba(255,255,255,.7)", fontWeight: 700 }}
                >
                  {t.label}
                </p>
                <p
                  className="font-mono text-[11px] leading-[1.75]"
                  style={{
                    color: "rgba(255,255,255,.35)",
                    letterSpacing: ".01em",
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
