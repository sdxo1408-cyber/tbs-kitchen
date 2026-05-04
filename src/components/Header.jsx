import { BRAND } from '../brand';
import { Icon } from './Icons';

export default function Header({ scrolled, onMenuClick, onBagClick, onLogoClick, onAccountClick, cartCount, bagPing, user }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 70,
      padding: scrolled ? '8px 16px' : '12px 22px',
      transition: 'padding 280ms ease',
    }}>
      <div style={{
        background: scrolled ? 'rgba(240,241,230,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
        borderRadius: 999,
        padding: scrolled ? '10px 14px' : '8px 6px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: scrolled ? '0 6px 20px -10px rgba(43,58,30,0.2)' : 'none',
        transition: 'all 280ms ease',
      }}>
        <button onClick={onLogoClick} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: scrolled ? 18 : 22, color: BRAND.forest, letterSpacing: '-0.02em',
          transition: 'all 280ms ease',
        }}>
          tbs <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'normal', fontWeight: 500 }}>kitchen</span>
        </button>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={onAccountClick}
            title={user ? user.name : 'Sign in'}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: user ? BRAND.forest : 'transparent',
              color: user ? '#fff' : BRAND.forest,
              border: user ? 'none' : `1px solid ${BRAND.line}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: user ? 'Instrument Serif, serif' : 'inherit',
              fontStyle: user ? 'italic' : 'normal',
              fontSize: 16,
            }}>
            {user ? user.name[0].toUpperCase() : Icon.user(16, BRAND.forest)}
          </button>

          <button
            onClick={onBagClick}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: cartCount > 0 ? BRAND.forest : 'transparent',
              color: cartCount > 0 ? '#fff' : BRAND.forest,
              border: cartCount > 0 ? 'none' : `1px solid ${BRAND.line}`,
              cursor: 'pointer', position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: bagPing ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 300ms ease, background 200ms ease',
            }}>
            {Icon.bag(16, cartCount > 0 ? '#fff' : BRAND.forest)}
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: -2, right: -2,
                background: BRAND.tomato, color: '#fff',
                fontSize: 10, fontWeight: 600,
                width: 16, height: 16, borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'DM Sans, sans-serif',
              }}>{cartCount}</div>
            )}
          </button>

          <button
            onClick={onMenuClick}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: 'transparent', color: BRAND.forest,
              border: `1px solid ${BRAND.line}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            {Icon.menu(16, BRAND.forest)}
          </button>
        </div>
      </div>
    </div>
  );
}
