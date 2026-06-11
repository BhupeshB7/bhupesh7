"use client";

import { motion } from "framer-motion";

const DRAW_EASE = "easeInOut";

type DrawProps = {
  delay?: number;
  duration?: number;
  pathLength?: number;
};

function draw(delay = 0, duration = 0.7): DrawProps {
  return { delay, duration };
}

function DrawPath({
  d,
  stroke,
  strokeWidth = 2,
  dashed = false,
  delay = 0,
  duration = 0.6,
  fill = "none",
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  dashed?: boolean;
  delay?: number;
  duration?: number;
  fill?: string;
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={dashed ? "6 4" : undefined}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, delay, ease: DRAW_EASE }}
    />
  );
}

function DrawRect({
  x,
  y,
  width,
  height,
  rx = 8,
  stroke,
  strokeWidth = 2,
  fill = "none",
  delay = 0,
  duration = 0.5,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  stroke: string;
  strokeWidth?: number;
  fill?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, delay, ease: DRAW_EASE }}
    />
  );
}

function FadeText({
  x,
  y,
  text,
  fill,
  fontSize = 14,
  anchor = "middle",
  delay = 0,
  bold = false,
}: {
  x: number;
  y: number;
  text: string;
  fill: string;
  fontSize?: number;
  anchor?: "middle" | "start" | "end";
  delay?: number;
  bold?: boolean;
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="middle"
      fill={fill}
      fontSize={fontSize}
      fontWeight={bold ? "700" : "400"}
      fontFamily="'Caveat', 'Comic Sans MS', cursive"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {text}
    </motion.text>
  );
}

function SketchMark({
  x1,
  y1,
  x2,
  y2,
  stroke,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  delay?: number;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    />
  );
}

function ArrowHead({
  points,
  fill,
  delay = 0,
}: {
  points: string;
  fill: string;
  delay?: number;
}) {
  return (
    <motion.polygon
      points={points}
      fill={fill}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
    />
  );
}

const C = {
  lime: "#c4d94e",
  orange: "#e8a838",
  green: "#7cb342",
  teal: "#4db6ac",
  red: "#ef5350",
  blue: "#4fc3f7",
  purple: "#ab47bc",
  coral: "#ef7043",
  white: "#ffffff",
  dim: "rgba(255,255,255,0.55)",
};

export default function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 600 820"
      className="w-full h-auto"
      style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
    >
      <rect width="600" height="820" fill="transparent" />

      <DrawPath
        d="M95 728 C95 700 95 698 95 682"
        stroke={C.lime}
        dashed
        delay={1.8}
        duration={0.4}
      />
      <ArrowHead points="95,676 90,686 100,686" fill={C.lime} delay={2.2} />

      <DrawPath
        d="M95 590 C95 555 95 530 140 490 Q180 452 180 432"
        stroke={C.lime}
        delay={2.4}
        duration={0.6}
      />
      <ArrowHead points="180,426 175,436 185,436" fill={C.lime} delay={3.0} />

      <DrawPath
        d="M200 372 C200 294 200 214 280 152 Q318 118 340 108"
        stroke={C.white}
        dashed
        delay={3.2}
        duration={0.7}
      />
      <ArrowHead points="346,106 334,101 337,111" fill={C.white} delay={3.9} />

      <DrawPath
        d="M250 390 C278 368 300 348 318 330"
        stroke={C.white}
        dashed
        delay={4.1}
        duration={0.5}
      />
      <ArrowHead points="323,326 313,324 317,334" fill={C.white} delay={4.6} />

      <DrawPath
        d="M260 418 C300 428 320 440 338 450"
        stroke={C.white}
        dashed
        delay={4.8}
        duration={0.5}
      />
      <ArrowHead points="344,453 332,447 336,457" fill={C.white} delay={5.3} />

      <DrawPath
        d="M450 108 C478 108 498 118 518 138"
        stroke={C.white}
        dashed
        delay={5.5}
        duration={0.4}
      />
      <ArrowHead points="524,141 512,136 516,146" fill={C.white} delay={5.9} />

      <DrawPath
        d="M428 288 C476 248 498 208 518 188"
        stroke={C.white}
        dashed
        delay={6.0}
        duration={0.5}
      />
      <ArrowHead points="523,184 513,190 520,198" fill={C.white} delay={6.5} />

      <DrawPath
        d="M440 328 C478 348 498 368 518 388"
        stroke={C.white}
        dashed
        delay={6.7}
        duration={0.5}
      />
      <ArrowHead points="524,392 512,386 516,396" fill={C.white} delay={7.2} />

      <DrawPath
        d="M440 488 C478 528 490 548 500 568"
        stroke={C.white}
        delay={7.4}
        duration={0.5}
      />
      <ArrowHead points="502,574 496,562 506,565" fill={C.white} delay={7.9} />

      <DrawPath
        d="M478 628 C468 668 458 688 448 708"
        stroke={C.white}
        delay={8.0}
        duration={0.4}
      />
      <ArrowHead points="447,714 441,702 452,705" fill={C.white} delay={8.4} />

      <g transform="translate(50, 738)">
        <DrawRect
          x={0}
          y={0}
          width={90}
          height={60}
          rx={8}
          stroke={C.lime}
          delay={0.1}
          duration={0.6}
        />
        <SketchMark
          x1={-5}
          y1={5}
          x2={-10}
          y2={10}
          stroke={C.lime}
          delay={0.5}
        />
        <SketchMark
          x1={-5}
          y1={55}
          x2={-10}
          y2={60}
          stroke={C.lime}
          delay={0.55}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <circle
            cx="25"
            cy="22"
            r="5"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <path
            d="M25 29 L25 36 M20 42 L25 36 L30 42"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="45"
            cy="22"
            r="5"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <path
            d="M45 29 L45 36 M40 42 L45 36 L50 42"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="65"
            cy="22"
            r="5"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <path
            d="M65 29 L65 36 M60 42 L65 36 L70 42"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
        </motion.g>
        <FadeText x={45} y={54} text="Users" fill={C.lime} delay={0.8} bold />
      </g>

      <g transform="translate(40, 598)">
        <DrawRect
          x={0}
          y={0}
          width={110}
          height={70}
          rx={8}
          stroke={C.lime}
          delay={0.9}
          duration={0.6}
        />
        <SketchMark
          x1={-5}
          y1={5}
          x2={-10}
          y2={0}
          stroke={C.lime}
          delay={1.2}
        />
        <SketchMark
          x1={115}
          y1={5}
          x2={120}
          y2={0}
          stroke={C.lime}
          delay={1.25}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          <rect
            x="15"
            y="12"
            width="25"
            height="18"
            rx="2"
            stroke={C.lime}
            strokeWidth={1.5}
            fill="none"
          />
          <line
            x1="15"
            y1="18"
            x2="40"
            y2="18"
            stroke={C.lime}
            strokeWidth={1.5}
          />
          <circle cx="19" cy="15" r="1.5" fill={C.lime} />
          <circle cx="24" cy="15" r="1.5" fill={C.lime} />
          <circle cx="29" cy="15" r="1.5" fill={C.lime} />
        </motion.g>
        <FadeText
          x={68}
          y={38}
          text="Frontend"
          fill={C.lime}
          delay={1.4}
          bold
        />
        <FadeText x={68} y={56} text="Apps" fill={C.lime} delay={1.5} />
      </g>

      <g transform="translate(130, 378)">
        <DrawRect
          x={0}
          y={0}
          width={120}
          height={70}
          rx={10}
          stroke={C.orange}
          strokeWidth={2.5}
          delay={1.6}
          duration={0.6}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 0.4 }}
        >
          <rect
            x="15"
            y="20"
            width="20"
            height="15"
            rx="2"
            stroke={C.orange}
            strokeWidth={1.5}
            fill="none"
          />
          <path
            d="M19 20 L19 16 C19 12 31 12 31 16 L31 20"
            stroke={C.orange}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="25"
            cy="28"
            r="2.5"
            stroke={C.orange}
            strokeWidth={1}
            fill="none"
          />
        </motion.g>
        <FadeText x={80} y={36} text="API" fill={C.white} delay={1.9} bold />
        <FadeText x={80} y={54} text="Gateway" fill={C.white} delay={2.0} />
      </g>

      <g transform="translate(320, 68)">
        <DrawRect
          x={0}
          y={0}
          width={120}
          height={70}
          rx={10}
          stroke={C.green}
          delay={3.0}
          duration={0.6}
        />
        <SketchMark
          x1={50}
          y1={-8}
          x2={55}
          y2={-15}
          stroke={C.green}
          delay={3.4}
        />
        <SketchMark
          x1={60}
          y1={-8}
          x2={60}
          y2={-18}
          stroke={C.green}
          delay={3.45}
        />
        <SketchMark
          x1={70}
          y1={-8}
          x2={65}
          y2={-15}
          stroke={C.green}
          delay={3.5}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.4 }}
        >
          <path
            d="M28 18 L40 24 L40 36 C40 46 28 53 28 53 C28 53 16 46 16 36 L16 24 Z"
            stroke={C.green}
            strokeWidth={2}
            fill="none"
          />
          <path
            d="M24 34 L27 38 L34 30"
            stroke={C.green}
            strokeWidth={2}
            fill="none"
          />
        </motion.g>
        <FadeText x={80} y={32} text="Auth" fill={C.white} delay={3.6} bold />
        <FadeText x={80} y={52} text="Service" fill={C.white} delay={3.7} />
      </g>

      <g transform="translate(300, 258)">
        <DrawRect
          x={0}
          y={0}
          width={130}
          height={70}
          rx={10}
          stroke={C.orange}
          delay={3.9}
          duration={0.55}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.4 }}
        >
          <circle
            cx="30"
            cy="30"
            r="12"
            stroke={C.orange}
            strokeWidth={2}
            fill="none"
          />
          <circle
            cx="30"
            cy="30"
            r="5"
            stroke={C.orange}
            strokeWidth={1.5}
            fill="none"
          />
          <line
            x1="30"
            y1="12"
            x2="30"
            y2="17"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="30"
            y1="43"
            x2="30"
            y2="48"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="12"
            y1="30"
            x2="17"
            y2="30"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="43"
            y1="30"
            x2="48"
            y2="30"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="17"
            y1="17"
            x2="20"
            y2="20"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="40"
            y1="40"
            x2="43"
            y2="43"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="17"
            y1="43"
            x2="20"
            y2="40"
            stroke={C.orange}
            strokeWidth={3}
          />
          <line
            x1="40"
            y1="20"
            x2="43"
            y2="17"
            stroke={C.orange}
            strokeWidth={3}
          />
        </motion.g>
        <FadeText
          x={97}
          y={28}
          text="Business"
          fill={C.white}
          delay={4.3}
          bold
        />
        <FadeText x={97} y={48} text="Logic" fill={C.white} delay={4.4} />
      </g>

      <g transform="translate(340, 428)">
        <DrawRect
          x={0}
          y={0}
          width={110}
          height={70}
          rx={10}
          stroke={C.teal}
          delay={4.5}
          duration={0.55}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.75, duration: 0.4 }}
        >
          <rect
            x="12"
            y="10"
            width="22"
            height="22"
            rx="3"
            stroke={C.teal}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="23"
            cy="21"
            r="5"
            stroke={C.teal}
            strokeWidth={1.5}
            fill="none"
          />
          <line
            x1="12"
            y1="15"
            x2="6"
            y2="15"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="12"
            y1="27"
            x2="6"
            y2="27"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="34"
            y1="15"
            x2="40"
            y2="15"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="34"
            y1="27"
            x2="40"
            y2="27"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="17"
            y1="10"
            x2="17"
            y2="4"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="29"
            y1="10"
            x2="29"
            y2="4"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="17"
            y1="32"
            x2="17"
            y2="38"
            stroke={C.teal}
            strokeWidth={1.5}
          />
          <line
            x1="29"
            y1="32"
            x2="29"
            y2="38"
            stroke={C.teal}
            strokeWidth={1.5}
          />
        </motion.g>
        <FadeText x={78} y={32} text="AI" fill={C.white} delay={4.8} bold />
        <FadeText x={78} y={52} text="Service" fill={C.white} delay={4.9} />
      </g>

      <g transform="translate(480, 138)">
        <DrawRect
          x={0}
          y={0}
          width={100}
          height={60}
          rx={8}
          stroke={C.red}
          delay={5.6}
          duration={0.5}
        />
        <SketchMark
          x1={105}
          y1={10}
          x2={112}
          y2={5}
          stroke={C.red}
          delay={5.9}
        />
        <SketchMark
          x1={105}
          y1={20}
          x2={115}
          y2={18}
          stroke={C.red}
          delay={5.95}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.0, duration: 0.4 }}
        >
          <rect
            x="12"
            y="8"
            width="28"
            height="8"
            rx="1"
            stroke={C.red}
            strokeWidth={1.5}
            fill="none"
          />
          <rect
            x="12"
            y="22"
            width="28"
            height="8"
            rx="1"
            stroke={C.red}
            strokeWidth={1.5}
            fill="none"
          />
          <rect
            x="12"
            y="36"
            width="28"
            height="8"
            rx="1"
            stroke={C.red}
            strokeWidth={1.5}
            fill="none"
          />
        </motion.g>
        <FadeText x={68} y={36} text="Redis" fill={C.white} delay={6.1} bold />
      </g>

      <g transform="translate(480, 348)">
        <DrawRect
          x={0}
          y={0}
          width={110}
          height={70}
          rx={8}
          stroke={C.blue}
          delay={6.4}
          duration={0.55}
        />
        <SketchMark
          x1={115}
          y1={15}
          x2={122}
          y2={10}
          stroke={C.blue}
          delay={6.75}
        />
        <SketchMark
          x1={115}
          y1={25}
          x2={125}
          y2={23}
          stroke={C.blue}
          delay={6.8}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.8, duration: 0.4 }}
        >
          <ellipse
            cx="28"
            cy="14"
            rx="14"
            ry="6"
            stroke={C.blue}
            strokeWidth={1.5}
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="14"
            y2="44"
            stroke={C.blue}
            strokeWidth={1.5}
          />
          <line
            x1="42"
            y1="14"
            x2="42"
            y2="44"
            stroke={C.blue}
            strokeWidth={1.5}
          />
          <ellipse
            cx="28"
            cy="44"
            rx="14"
            ry="6"
            stroke={C.blue}
            strokeWidth={1.5}
            fill="none"
          />
          <path
            d="M14 24 Q28 32 42 24"
            stroke={C.blue}
            strokeWidth={1}
            fill="none"
          />
        </motion.g>
        <FadeText
          x={80}
          y={42}
          text="Database"
          fill={C.white}
          delay={6.9}
          bold
        />
      </g>

      <g transform="translate(430, 568)">
        <DrawRect
          x={0}
          y={0}
          width={100}
          height={55}
          rx={8}
          stroke={C.purple}
          delay={7.5}
          duration={0.5}
        />
        <SketchMark
          x1={105}
          y1={10}
          x2={112}
          y2={5}
          stroke={C.purple}
          delay={7.8}
        />
        <SketchMark
          x1={105}
          y1={20}
          x2={115}
          y2={18}
          stroke={C.purple}
          delay={7.85}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.9, duration: 0.4 }}
        >
          <rect
            x="12"
            y="10"
            width="20"
            height="22"
            rx="2"
            stroke={C.purple}
            strokeWidth={1.5}
            fill="none"
          />
          <line
            x1="18"
            y1="10"
            x2="18"
            y2="32"
            stroke={C.purple}
            strokeWidth={1}
          />
          <line
            x1="24"
            y1="10"
            x2="24"
            y2="32"
            stroke={C.purple}
            strokeWidth={1}
          />
          <text
            x="13"
            y="24"
            fill={C.purple}
            fontSize="7"
            fontFamily="monospace"
          >
            010
          </text>
        </motion.g>
        <FadeText x={66} y={32} text="Queue" fill={C.white} delay={8.0} bold />
      </g>

      <g transform="translate(380, 710)">
        <DrawRect
          x={0}
          y={0}
          width={110}
          height={60}
          rx={10}
          stroke={C.coral}
          delay={8.1}
          duration={0.5}
        />
        <SketchMark
          x1={115}
          y1={15}
          x2={122}
          y2={10}
          stroke={C.coral}
          delay={8.4}
        />
        <SketchMark
          x1={115}
          y1={25}
          x2={125}
          y2={23}
          stroke={C.coral}
          delay={8.45}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.5, duration: 0.4 }}
        >
          <circle
            cx="18"
            cy="22"
            r="8"
            stroke={C.coral}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="18"
            cy="22"
            r="3"
            stroke={C.coral}
            strokeWidth={1}
            fill="none"
          />
          <line
            x1="18"
            y1="10"
            x2="18"
            y2="14"
            stroke={C.coral}
            strokeWidth={2.5}
          />
          <line
            x1="18"
            y1="30"
            x2="18"
            y2="34"
            stroke={C.coral}
            strokeWidth={2.5}
          />
          <line
            x1="6"
            y1="22"
            x2="10"
            y2="22"
            stroke={C.coral}
            strokeWidth={2.5}
          />
          <line
            x1="26"
            y1="22"
            x2="30"
            y2="22"
            stroke={C.coral}
            strokeWidth={2.5}
          />
          <circle
            cx="32"
            cy="30"
            r="6"
            stroke={C.coral}
            strokeWidth={1.5}
            fill="none"
          />
          <circle
            cx="32"
            cy="30"
            r="2.5"
            stroke={C.coral}
            strokeWidth={1}
            fill="none"
          />
        </motion.g>
        <FadeText
          x={76}
          y={36}
          text="Workers"
          fill={C.white}
          delay={8.55}
          bold
        />
      </g>
    </svg>
  );
}
