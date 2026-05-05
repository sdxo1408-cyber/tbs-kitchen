import { BRAND } from '../brand';
import { MENU } from '../data/menu';
import { Icon } from '../components/Icons';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const FREQUENT = ['anabolic-chicken', 'classic-buddha', 'wrap-veggie', 'dessert-blueberry', 'indian-curry'];

export default function RepeatOrdersScreen({ goto, addToCart }) {
  const items = FREQUENT.map(id => MENU.find(m => m.id === id)).filter(Boolean);

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
    }}>
      <div style={{ padding: '90px 24px 16px' }}>
        <button onClick={() => goto('home')} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: 0, color: BRAND.forest, fontSize: 12,
          marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>{Icon.back(12, BRAND.forest)} Back</button>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 6,
        }}>quick reorder</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 32, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.04em',
        }}>Your <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>regulars</span></h1>
        <p style={{ marginTop: 8, fontSize: 13.5, color: BRAND.inkSoft }}>
          One-tap to add the meals you keep coming back to.
        </p>
      </div>

      <div style={{ padding: '0 22px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(m => (
          <div key={m.id} style={{
            background: '#fff', borderRadius: 16, padding: 12,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <PhotoPlaceholder height={64} tone={m.tone} label="" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                fontSize: 17, color: BRAND.ink, lineHeight: 1.1,
              }}>{m.name}</div>
              <div style={{ marginTop: 4, fontSize: 11.5, color: BRAND.muted }}>
                {m.kcal} kcal · ₹{m.price ?? m.veg}
              </div>
            </div>
            <button onClick={() => { addToCart(m, 1); }}
              style={{
                background: BRAND.forest, color: '#fff', border: 'none',
                padding: '10px 14px', borderRadius: 999, cursor: 'pointer',
                fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>{Icon.plus(12, '#fff')} Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
