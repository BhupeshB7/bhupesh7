export const HERO_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital@1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
  body { background: #07080f; color: #fff; overflow-x: hidden; font-family: 'JetBrains Mono', monospace; }
  @media(hover: none) { body { cursor: auto !important; } }
  @media(prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
  ::selection { background: rgba(99,102,241,.28); color: #818cf8; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 2px; }

  @keyframes cursor-blink  { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes slide-left    { from{opacity:0;transform:translateX(-48px);} to{opacity:1;transform:translateX(0);} }
  @keyframes slide-up      { from{opacity:0;transform:translateY(26px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fade-in       { from{opacity:0;} to{opacity:1;} }
  @keyframes badge-pop     { from{opacity:0;transform:scale(.82);} to{opacity:1;transform:scale(1);} }
  @keyframes pulseGlow     { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(99,102,241,.4);} 50%{opacity:.6;box-shadow:0 0 0 5px rgba(99,102,241,.0);} }
  @keyframes slideUp       { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes scan-travel   { 0%{transform:translateY(-100%);} 100%{transform:translateY(300%);} }
  @keyframes scroll-wheel  { 0%{opacity:1;transform:translateX(-50%) translateY(0);} 75%{opacity:0;transform:translateX(-50%) translateY(11px);} 100%{opacity:0;transform:translateX(-50%) translateY(0);} }
  @keyframes btn-shine     { 0%{left:-80%;opacity:0;} 30%{opacity:1;} 100%{left:140%;opacity:0;} }
  @keyframes ring-breathe  { 0%,100%{opacity:.5;} 50%{opacity:1;} }

  .hero-mono { font-family: 'JetBrains Mono', monospace !important; }

  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    background: linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #6366f1 100%);
    background-size: 200% 100%;
    color: #fff; border: none; border-radius: 7px; padding: 15px 32px;
    text-decoration: none; cursor: none;
    transition: transform .22s, box-shadow .22s, background-position .4s, filter .2s;
    white-space: nowrap; position: relative; overflow: hidden;
    min-width: 168px;
    box-shadow: 0 0 0 1px rgba(99,102,241,.3), 0 4px 20px rgba(99,102,241,.22);
  }
  .btn-primary::before {
    content: ''; position: absolute; top: 0; left: -80%; width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
    transform: skewX(-15deg);
    animation: btn-shine 4.5s ease-in-out 2.5s infinite;
    pointer-events: none;
  }
  .btn-primary::after { content: ''; position: absolute; inset: 0; background: #fff; opacity: 0; transition: opacity .2s; pointer-events: none; }
  .btn-primary:hover::after { opacity: .06; }
  .btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    background-position: 100% 0;
    box-shadow: 0 0 0 1px rgba(129,140,248,.55), 0 18px 44px rgba(99,102,241,.42), 0 0 70px rgba(99,102,241,.12);
  }
  .btn-primary:active { transform: translateY(0) scale(.99); transition-duration: .08s; }

  .btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    background: rgba(255,255,255,.03); color: rgba(255,255,255,.6);
    border: 1.5px solid rgba(255,255,255,.13); border-radius: 7px; padding: 15px 32px;
    text-decoration: none; cursor: none;
    transition: border-color .25s, color .25s, background .25s, transform .25s, box-shadow .25s;
    white-space: nowrap; min-width: 168px; position: relative; overflow: hidden;
  }
  .btn-ghost::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0), rgba(99,102,241,.08));
    opacity: 0; transition: opacity .25s; pointer-events: none;
  }
  .btn-ghost:hover::before { opacity: 1; }
  .btn-ghost:hover {
    border-color: rgba(99,102,241,.55); color: #818cf8;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(99,102,241,.18), inset 0 0 0 1px rgba(99,102,241,.06);
  }
  .btn-ghost:active { transform: translateY(0); transition-duration: .08s; }

  .tag-pill {
    font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(129,140,248,.65);
    border: 1px solid rgba(99,102,241,.18); border-radius: 3px;
    padding: 3px 8px; background: rgba(99,102,241,.05);
  }

  .stat-val {
    font-family: 'Anton', 'Impact', sans-serif;
    font-size: clamp(1.5rem,2.8vw,2.2rem);
    color: #818cf8; line-height: 1; letter-spacing: -.01em;
  }
  .stat-label {
    font-size: clamp(8px,.9vw,10px);
    color: rgba(255,255,255,.25); letter-spacing: .09em; text-transform: uppercase; margin-top: 3px;
  }
  .stat-div { width: 1px; height: 32px; background: rgba(255,255,255,.07); align-self: center; }

  .social-link {
    display: flex; align-items: center; gap: 8px; text-decoration: none;
    color: rgba(255,255,255,.3); transition: color .2s;
    font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .05em;
  }
  .social-icon {
    width: 28px; height: 28px; border-radius: 6px;
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0; transition: all .2s;
    background: rgba(255,255,255,.02);
  }
  .social-link:hover { color: #818cf8; }
  .social-link:hover .social-icon { border-color: #6366f1; background: rgba(99,102,241,.08); transform: scale(1.1); }

  .scroll-line { width: 1px; height: 48px; background: linear-gradient(to bottom, rgba(99,102,241,.5), transparent); position: relative; overflow: hidden; }
  .scroll-line::after { content: ''; position: absolute; top: -100%; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, transparent, rgba(129,140,248,.9), transparent); animation: scan-travel 1.9s ease-in-out infinite; }

  .trail-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; border-radius: 50%; pointer-events: none; will-change: transform, opacity; }

  @media(max-width: 1100px) { .card-zone { display: none !important; } .hero-left { flex: 1 !important; max-width: 100% !important; } }
  @media(max-width: 768px) {
    .ctas-row { display: grid !important; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px !important; }
    .btn-primary, .btn-ghost { width: 100%; min-width: 0; padding: 16px 12px; font-size: 10px; }
  }
  @media(max-width: 480px) {
    .stats-row { gap: 14px !important; }
    .stat-div { display: none !important; }
    .ctas-row { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px !important; }
    .btn-primary, .btn-ghost { font-size: 10px; padding: 14px 8px; letter-spacing: .07em; }
  }
`;
