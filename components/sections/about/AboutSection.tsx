import AboutHero from "./AboutHero";
import WhoIAm from "./WhoIAm";
import Journey from "./Journey";
import Skills from "./Skills";
import Values from "./Values";

// ─── Shared section wrapper ───────────────────────────────────────────────────
function SectionBlock({
  id,
  children,
  first = false,
}: {
  id?: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        padding: `${first ? "clamp(96px,11vw,144px)" : "clamp(72px,9vw,120px)"} clamp(1.5rem,5vw,4rem) clamp(72px,9vw,120px)`,
        position: "relative",
      }}
    >
      {!first && (
        <div
          aria-hidden="true"
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
      )}
      {children}
    </section>
  );
}

// ─── AboutSection ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <div
      id="about"
      aria-label="About Bhupesh Kumar"
      style={{
        background: "var(--bg)", // #07080f — exact match to hero
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {/*
       * Decorative background layers
       * ─────────────────────────────
       * All solid-color stops use rgba(7,8,15,…) — the exact RGB of --bg (#07080f).
       * Accent stops use the hero's two accent hues only:
       *   indigo  → rgba(99,102,241,…)  = #6366f1  (--accent)
       *   cyan    → rgba(0,229,255,…)   = #00e5ff  (--cyan)
       * Opacities are kept subtle so the section feels dark and on-theme.
       */}

      {/* Layer 1 — soft accent radial glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(62% 42% at 14%  7%,  rgba(99,102,241,0.13) 0%, rgba(99,102,241,0) 72%)",
            "radial-gradient(50% 38% at 88% 12%,  rgba(0,229,255,0.06)  0%, rgba(0,229,255,0)  76%)",
            "radial-gradient(110% 60% at 50% 110%, rgba(7,8,15,1)        0%, rgba(7,8,15,0)    55%)",
          ].join(", "),
        }}
      />

      {/* Layer 2 — fine crosshatch grid (same glass texture as hero code card) */}
      <div
        aria-hidden="true"
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

      {/* Layer 3 — top fade: blends from hero section above */}
      <div
        aria-hidden="true"
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

      {/* Layer 4 — bottom fade: blends into ActivitySection */}
      <div
        aria-hidden="true"
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

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <SectionBlock first>
          <AboutHero />
        </SectionBlock>

        <SectionBlock>
          <WhoIAm />
        </SectionBlock>

        <SectionBlock id="journey">
          <Journey />
        </SectionBlock>

        <SectionBlock>
          <Skills />
        </SectionBlock>

        <SectionBlock>
          <Values />
        </SectionBlock>
      </div>
    </div>
  );
}
