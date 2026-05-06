// Brand tokens + small shared atoms
const BRAND = {
  forest: '#2B3A1E',
  forestDeep: '#1F2C14',
  cream: '#F0F1E6',
  creamWarm: '#E8E9DC',
  tomato: '#D43A24',
  lavender: '#A98AC1',
  blush: '#F1E8E5',
  ink: '#1A1F12',
  inkSoft: '#4A4F40',
  muted: '#8A8F7E',
  line: 'rgba(43, 58, 30, 0.12)',
};

// Striped placeholder used where a real photo isn't supplied
function PhotoPlaceholder({ label = 'photo', height = 200, tone = 'forest', radius = 0, style = {} }) {
  const colors = {
    forest: ['#2B3A1E', '#3A4A2A'],
    cream: ['#E8E9DC', '#DDDEC9'],
    blush: ['#F1E8E5', '#E5D7D1'],
    lavender: ['#C3ADD2', '#A98AC1'],
    tomato: ['#D43A24', '#B82D18'],
  };
  const [a, b] = colors[tone] || colors.forest;
  const ink = (tone === 'cream' || tone === 'blush') ? BRAND.forest : '#fff';
  return (
    <div style={{
      height, width: '100%', borderRadius: radius,
      background: `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <span style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase',
        color: ink, background: 'rgba(255,255,255,0.85)',
        padding: '4px 10px', borderRadius: 999,
        mixBlendMode: 'normal',
      }}>{label}</span>
    </div>
  );
}

// Inline icon set — minimal, line-based
const Icon = {
  menu: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 8h16M4 16h16"/>
    </svg>
  ),
  close: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  back: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 6l-6 6 6 6"/>
    </svg>
  ),
  bag: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 12H6L5 8z"/>
      <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  search: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>
    </svg>
  ),
  plus: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  minus: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14"/>
    </svg>
  ),
  arrow: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  star: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l2.9 6.5 7 .7-5.3 4.8 1.6 6.9L12 17.5 5.8 21l1.6-6.9L2 9.2l7-.7z"/>
    </svg>
  ),
  leaf: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-8 7-13 14-13 0 7-5 14-13 14-1 0-1-1-1-1z"/>
      <path d="M5 19c3-3 6-5 9-7"/>
    </svg>
  ),
  flame: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-6 1-9z"/>
    </svg>
  ),
  clock: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  check: (s = 14, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l4 4 10-10"/>
    </svg>
  ),
  trash: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/>
    </svg>
  ),
};

// Underlined cream pill button
function PillButton({ children, onClick, variant = 'forest', size = 'md', style = {}, full = false }) {
  const bg = variant === 'forest' ? BRAND.forest : variant === 'cream' ? BRAND.cream : variant === 'tomato' ? BRAND.tomato : 'transparent';
  const fg = variant === 'cream' ? BRAND.forest : '#fff';
  const border = variant === 'ghost' ? `1px solid ${BRAND.forest}` : 'none';
  const fgGhost = variant === 'ghost' ? BRAND.forest : fg;
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 26px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 16 : 14.5;
  return (
    <button onClick={onClick} style={{
      background: bg, color: fgGhost, border, borderRadius: 999,
      padding: pad, fontSize: fs, fontFamily: 'DM Sans, system-ui, sans-serif',
      fontWeight: 500, letterSpacing: '-0.01em',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      width: full ? '100%' : 'auto', justifyContent: 'center',
      transition: 'transform 160ms ease, opacity 160ms ease',
      ...style,
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
    </button>
  );
}

// Fade-on-scroll wrapper
function Reveal({ children, delay = 0, style = {} }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]') || null;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setVisible(true); io.disconnect(); }});
    }, { root, threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 700ms ${delay}ms cubic-bezier(.2,.7,.2,1), transform 700ms ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { BRAND, PhotoPlaceholder, Icon, PillButton, Reveal });
