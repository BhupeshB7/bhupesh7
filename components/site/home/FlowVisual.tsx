"use client";

import { motion, type Easing } from "framer-motion";
import theme from "@/config/theme.config";

const ac = theme.accent.primary;

const VARIANTS = {
  source: {
    fill: theme.accent.tintStrong,
    stroke: ac,
    text: ac,
  },
  branch: {
    fill: theme.surface[1],
    stroke: theme.border.medium,
    text: theme.text.secondary,
  },
  target: {
    fill: theme.surface[2],
    stroke: theme.border.soft,
    text: theme.text.primary,
  },
};

function FlowVisual({
  steps,
  inView,
  cardIndex,
}: {
  steps: string[];
  inView: boolean;
  cardIndex: number;
}) {
  const W = 680;
  const nodeW = 160;
  const nodeH = 48;
  const midX = W / 2;
  const srcY = 40;
  const branchY = 160;
  const outY = 300;
  const H = outY + nodeH + 40;
  const DELAY = 0.1 + cardIndex * 0.05;

  const middleSteps = steps.slice(1, -1);
  const count = middleSteps.length;
  const branchGap = Math.min(200, 580 / Math.max(count, 1));
  const startX = midX - ((count - 1) * branchGap) / 2;
  const branches = middleSteps.map((_, i) => ({
    x: startX + i * branchGap,
    y: branchY,
  }));

  const ease = "easeOut" as Easing;
  const easeIO = "easeInOut" as Easing;

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 6 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
    transition: { duration: 0.36, delay, ease },
  });

  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const my = y1 + (y2 - y1) * 0.55;
    return `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
  };

  const Edge = ({
    x1,
    y1,
    x2,
    y2,
    delay,
    id,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
    id: string;
  }) => (
    <motion.path
      key={id}
      d={curve(x1, y1, x2, y2)}
      fill="none"
      stroke={`${ac}CC`}
      strokeWidth={0.5}
      strokeDasharray="6 6"
      opacity={1}
      initial={{ pathLength: 0 }}
      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.4, delay, ease: easeIO }}
    />
  );

  const Node = ({
    label,
    cx,
    cy,
    variant,
    delay,
  }: {
    label: string;
    cx: number;
    cy: number;
    variant: "source" | "branch" | "target";
    delay: number;
  }) => {
    const w = variant === "branch" ? 140 : nodeW;
    const s = VARIANTS[variant];
    return (
      <motion.g {...anim(delay)}>
        <rect
          x={cx - w / 2}
          y={cy}
          width={w}
          height={nodeH}
          rx={10}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={0.5}
        />
        <text
          x={cx}
          y={cy + nodeH / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
          fontWeight="500"
          fill={s.text}
        >
          {label}
        </text>
      </motion.g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" fill="none" aria-hidden="true">
      {branches.map((b, i) => (
        <Edge
          key={`s-${i}`}
          id={`s-${i}`}
          x1={midX}
          y1={srcY + nodeH}
          x2={b.x}
          y2={b.y}
          delay={DELAY + 0.05 * i}
        />
      ))}

      {branches.map((b, i) => (
        <Edge
          key={`m-${i}`}
          id={`m-${i}`}
          x1={b.x}
          y1={b.y + nodeH}
          x2={midX}
          y2={outY}
          delay={DELAY + 0.2 + 0.05 * i}
        />
      ))}

      <Node
        label={steps[0]}
        cx={midX}
        cy={srcY}
        variant="source"
        delay={DELAY}
      />

      {middleSteps.map((step, i) => (
        <Node
          key={step}
          label={step}
          cx={branches[i].x}
          cy={branches[i].y}
          variant="branch"
          delay={DELAY + 0.12 + 0.08 * i}
        />
      ))}

      <Node
        label={steps[steps.length - 1]}
        cx={midX}
        cy={outY}
        variant="target"
        delay={DELAY + 0.3}
      />
    </svg>
  );
}

export default FlowVisual;
