"use client";

import {
  fadeUp,
  listItem,
  staggerContainer,
  VIEWPORT,
} from "@/components/animations/variants";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { motion } from "framer-motion";

// ─── Level dots (1–5) ─────────────────────────────────────────────────────────
function LevelDots({ level, color }: { level: number; color: string }) {
  return (
    <div
      role="img"
      aria-label={`Proficiency: ${level} out of 5`}
      style={{ display: "flex", gap: "3px", alignItems: "center" }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: i < level ? color : "rgba(255,255,255,0.08)",
            boxShadow: i < level ? `0 0 4px ${color}60` : "none",
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Single skill row ─────────────────────────────────────────────────────────
function SkillRow({
  name,
  level,
  color,
}: {
  name: string;
  level: number;
  color: string;
}) {
  return (
    <motion.li
      variants={listItem}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        listStyle: "none",
      }}
    >
      <span
        className="font-mono text-[11px] tracking-[.03em]"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {name}
      </span>
      <LevelDots level={level} color={color} />
    </motion.li>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({
  category,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
}) {
  return (
    <motion.div
      variants={listItem}
      style={{
        padding: "clamp(20px,2.5vw,28px)",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.016)",
        border: "1px solid rgba(99,102,241,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${category.color}70, transparent)`,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            background: `${category.color}12`,
            border: `1px solid ${category.color}22`,
            fontSize: "11px",
            color: category.color,
            flexShrink: 0,
          }}
        >
          {category.icon}
        </span>
        <h3
          className="font-mono text-[11px] tracking-[.1em] uppercase font-bold"
          style={{ color: category.color }}
        >
          {category.label}
        </h3>
      </div>

      {/* Skills list */}
      <motion.ul
        variants={staggerContainer(0.04)}
        style={{ padding: 0 }}
        aria-label={`${category.label} skills`}
      >
        {category.skills.map((skill) => (
          <SkillRow
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-[10px] mb-[16px]"
      >
        <div
          className="h-px w-8 shrink-0"
          style={{
            background: "linear-gradient(to right, #3B82F6, transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[.14em] uppercase"
          style={{ color: "#2a76f8" }}
        >
          Technical Skills
        </span>
      </motion.div>

      <motion.div variants={fadeUp} style={{ marginBottom: "48px" }}>
        <h2
          className="font-display mb-[10px]"
          style={{
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            letterSpacing: "-.01em",
            lineHeight: 1,
          }}
        >
          TECH STACK
        </h2>
        <p
          className="font-mono text-[clamp(10px,1.2vw,12px)] tracking-[.06em] uppercase"
          style={{ color: "rgba(255,255,255,.22)" }}
        >
          Tools I reach for — and how comfortable I am with each
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer(0.1)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(14px, 2vw, 20px)",
        }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.label} category={cat} />
        ))}
      </motion.div>

      {/* Legend */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "28px",
          flexWrap: "wrap",
        }}
      >
        <span
          className="font-mono text-[9px] tracking-[.08em] uppercase"
          style={{ color: "rgba(255,255,255,.2)" }}
        >
          Proficiency:
        </span>
        {[
          [1, "Learning"],
          [3, "Proficient"],
          [5, "Expert"],
        ].map(([lvl, lbl]) => (
          <div
            key={lbl as string}
            style={{ display: "flex", alignItems: "center", gap: "7px" }}
          >
            <LevelDots level={lvl as number} color="var(--accent-light)" />
            <span
              className="font-mono text-[9px] tracking-[.05em]"
              style={{ color: "rgba(255,255,255,.2)" }}
            >
              {lbl as string}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
