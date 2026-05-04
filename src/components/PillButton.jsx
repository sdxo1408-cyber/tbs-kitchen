import { BRAND } from '../brand';

export default function PillButton({ children, onClick, variant = 'forest', size = 'md', style = {}, full = false }) {
  const bg = variant === 'forest' ? BRAND.forest
    : variant === 'cream' ? BRAND.cream
    : variant === 'tomato' ? BRAND.tomato
    : 'transparent';
  const fg = variant === 'cream' ? BRAND.forest : '#fff';
  const border = variant === 'ghost' ? `1px solid ${BRAND.forest}` : 'none';
  const fgGhost = variant === 'ghost' ? BRAND.forest : fg;
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 32px' : '14px 26px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 16 : 14.5;

  return (
    <button
      onClick={onClick}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      style={{
        background: bg, color: fgGhost, border, borderRadius: 999,
        padding: pad, fontSize: fs, fontFamily: 'DM Sans, system-ui, sans-serif',
        fontWeight: 500, letterSpacing: '-0.01em',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        width: full ? '100%' : 'auto', justifyContent: 'center',
        transition: 'transform 160ms ease, opacity 160ms ease',
        ...style,
      }}>
      {children}
    </button>
  );
}
