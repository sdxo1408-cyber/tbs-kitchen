import { BRAND } from '../brand';
import { Icon } from './Icons';

const ITEMS = [
  { id: 'profile', label: 'Profile', sub: 'Your account & preferences', icon: 'user' },
  { id: 'orders', label: 'Orders', sub: 'Past meals & receipts', icon: 'bag' },
  { id: 'track', label: 'Track orders', sub: 'See live delivery status', icon: 'track' },
  { id: 'repeat', label: 'Repeat orders', sub: 'Re-order your favourites', icon: 'arrow' },
  { id: 'settings', label: 'Settings', sub: 'Notifications, allergies, address', icon: 'menu' },
];

function renderIcon(name, color) {
  switch (name) {
    case 'user': return Icon.user(18, color);
    case 'bag': return Icon.bag(18, color);
    case 'track': return Icon.track(18, color);
    case 'arrow': return Icon.arrow(18, color);
    case 'menu': return Icon.menuNav(18, color);
    default: return null;
  }
}

export default function SideDrawer({ open, onClose, onSelect, onLogout, user }) {
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 90,
        background: 'rgba(31,44,20,0.45)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 280ms ease',
      }} />

      <aside style={{
        position: 'absolute', top: 0, bottom: 0, right: 0,
        zIndex: 100, width: 'min(82%, 360px)',
        background: BRAND.cream, color: BRAND.ink,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 360ms cubic-bezier(.2,.7,.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-30px 0 60px -20px rgba(0,0,0,0.35)',
        fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      }}>
        <div style={{
          padding: '22px 22px 18px',
          background: BRAND.forest, color: BRAND.cream,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999,
            background: BRAND.cream, color: BRAND.forest,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 24,
          }}>{user?.name ? user.name[0].toUpperCase() : 'T'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.1,
            }}>{user?.name || 'Welcome'}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
              {user?.phone ? `+91 ${user.phone}` : 'Sign in to sync your plan'}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: 999,
            background: 'rgba(240,241,230,0.15)', border: 'none',
            cursor: 'pointer', color: BRAND.cream,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.close(14, BRAND.cream)}</button>
        </div>

        <nav style={{
          flex: 1, padding: '14px 12px',
          display: 'flex', flexDirection: 'column', gap: 4,
          overflowY: 'auto',
        }}>
          {ITEMS.map(it => (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 14px', borderRadius: 14,
                background: 'transparent', border: 'none', cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 160ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,58,30,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{
                width: 38, height: 38, borderRadius: 12,
                background: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px -8px rgba(0,0,0,0.2)',
              }}>{renderIcon(it.icon, BRAND.forest)}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'block', fontSize: 15, color: BRAND.ink,
                  letterSpacing: '-0.02em', fontWeight: 500,
                }}>{it.label}</span>
                <span style={{
                  display: 'block', marginTop: 2, fontSize: 11.5,
                  color: BRAND.muted, letterSpacing: '-0.01em',
                }}>{it.sub}</span>
              </span>
              {Icon.arrow(14, BRAND.muted)}
            </button>
          ))}
        </nav>

        <div style={{
          padding: '14px 18px 18px', borderTop: `1px solid ${BRAND.line}`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {onLogout && (
            <button onClick={onLogout} style={{
              width: '100%', padding: '13px 16px', borderRadius: 999,
              background: '#fff', border: `1px solid ${BRAND.line}`,
              color: BRAND.tomato, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, letterSpacing: '-0.02em',
            }}>
              {Icon.back(13, BRAND.tomato)} Sign out
            </button>
          )}
          <div style={{ fontSize: 11, color: BRAND.muted, letterSpacing: '0.04em', textAlign: 'center' }}>
            <span style={{
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 14, color: BRAND.forest, marginRight: 4,
            }}>tbs kitchen</span>
            v1.0 · Made in Kanpur
          </div>
        </div>
      </aside>
    </>
  );
}
