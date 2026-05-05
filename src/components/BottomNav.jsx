import { BRAND } from '../brand';
import { Icon } from './Icons';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: (c) => Icon.home(20, c) },
  { id: 'menu', label: 'Menu', icon: (c) => Icon.menuNav(20, c) },
  { id: 'bag', label: 'Bag', icon: (c) => Icon.bag(20, c) },
];

export default function BottomNav({ screen, goto, onBag, cartCount }) {
  return (
    <div style={{
      position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
      zIndex: 60,
      background: BRAND.forest, color: BRAND.cream,
      borderRadius: 999, padding: 5,
      display: 'flex', gap: 2,
      boxShadow: '0 12px 30px -10px rgba(31,44,20,0.4)',
      maxWidth: 'calc(100% - 40px)',
    }}>
      {NAV_ITEMS.map(it => {
        const active = screen === it.id;
        return (
          <button
            key={it.id}
            onClick={() => it.id === 'bag' ? onBag() : goto(it.id)}
            style={{
              padding: '9px 13px', borderRadius: 999, border: 'none',
              background: active ? BRAND.cream : 'transparent',
              color: active ? BRAND.forest : 'rgba(240,241,230,0.85)',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, letterSpacing: '-0.02em',
              position: 'relative',
              transition: 'all 200ms ease',
            }}>
            {it.icon(active ? BRAND.forest : 'rgba(240,241,230,0.85)')}
            <span>{it.label}</span>
            {it.id === 'bag' && cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 4,
                background: BRAND.tomato, color: '#fff',
                fontSize: 9, fontWeight: 600,
                minWidth: 14, height: 14, borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px',
              }}>{cartCount}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
