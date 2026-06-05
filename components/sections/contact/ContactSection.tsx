import ContactHero        from "./ContactHero";
import ContactMethods     from "./ContactMethods";
import CollaborationTypes from "./CollaborationTypes";
import WorkProcess        from "./WorkProcess";
import ContactForm        from "./ContactForm";
import ContactFooter      from "./ContactFooter";

/*
 * Background layers — identical pattern to About/Blog:
 *   rgba(7,8,15,…)     = --bg (#07080f)
 *   rgba(99,102,241,…) = --accent (#6366f1) indigo
 *   rgba(0,229,255,…)  = --cyan (#00e5ff)
 * Radial positions differ from other sections so each feels distinct.
 */
function BackgroundLayers() {
  return (
    <>
      {/* Layer 1 — accent glows, centred at top and bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: [
            "radial-gradient(60% 45% at 50%  0%,  rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 70%)",
            "radial-gradient(45% 35% at 94% 80%,  rgba(0,229,255,0.05)  0%, rgba(0,229,255,0)  72%)",
            "radial-gradient(100% 50% at 50% 108%, rgba(7,8,15,1)        0%, rgba(7,8,15,0)    52%)",
          ].join(", "),
        }}
      />

      {/* Layer 2 — crosshatch grid */}
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

      {/* Layer 3 — top fade from previous section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "140px",
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(7,8,15,0.92), rgba(7,8,15,0))",
        }}
      />

      {/* Layer 4 — bottom fade (this is the last section) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "80px",
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(7,8,15,0), rgba(7,8,15,0.96))",
        }}
      />
    </>
  );
}

// ─── Horizontal rule ──────────────────────────────────────────────────────────
function Hr() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)",
      }}
    />
  );
}

// ─── ContactSection ───────────────────────────────────────────────────────────
export default function ContactSection() {
  return (
    <>
      {/* spin keyframe for form loading spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div
        id="contact"
        aria-label="Contact and collaboration"
        style={{
          background: "var(--bg)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <BackgroundLayers />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "clamp(72px,9vw,120px) clamp(1.5rem,5vw,4rem) clamp(48px,6vw,72px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(56px,7vw,88px)",
          }}
        >
          {/* Top separator */}
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

          {/* 1 ── Hero headline + availability */}
          <ContactHero />

          <Hr />

          {/* 2 ── 3 direct contact methods */}
          <ContactMethods />

          <Hr />

          {/* 3 ── How we can collaborate */}
          <CollaborationTypes />

          <Hr />

          {/* 4 ── 4-step work process */}
          <WorkProcess />

          <Hr />

          {/* 5 ── Project brief form */}
          <ContactForm />

          <Hr />

          {/* 6 ── Socials + footer */}
          <ContactFooter />
        </div>
      </div>
    </>
  );
}
