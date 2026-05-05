import { BRAND } from '../brand';
import { MENU } from '../data/menu';
import { Icon } from '../components/Icons';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const STUB_ORDERS = [
  { id: 'TBS-2891', date: '2 days ago', total: 698, items: ['classic-buddha', 'dessert-blueberry'], status: 'Delivered' },
  { id: 'TBS-2740', date: '5 days ago', total: 524, items: ['anabolic-chicken', 'wrap-veggie'], status: 'Delivered' },
  { id: 'TBS-2631', date: '1 week ago', total: 379, items: ['indian-curry'], status: 'Delivered' },
];

export default function OrdersScreen({ goto, addToCart }) {
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
        }}>history</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 32, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.04em',
        }}>Your <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>orders</span></h1>
      </div>

      <div style={{ padding: '0 22px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STUB_ORDERS.map(o => (
          <div key={o.id} style={{
            background: '#fff', borderRadius: 18, padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{
                  fontFamily: 'ui-monospace, monospace', fontSize: 10,
                  letterSpacing: '0.12em', color: BRAND.muted,
                }}>{o.id}</div>
                <div style={{ marginTop: 2, fontSize: 12, color: BRAND.inkSoft }}>{o.date}</div>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: 999,
                background: BRAND.blush, color: BRAND.forest,
                fontSize: 11, letterSpacing: '-0.01em',
              }}>{o.status}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {o.items.map(id => {
                const m = MENU.find(x => x.id === id);
                if (!m) return null;
                return (
                  <div key={id} style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden' }}>
                    <PhotoPlaceholder height={56} tone={m.tone} label="" />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                fontSize: 22, color: BRAND.ink,
              }}>₹{o.total}</span>
              <button onClick={() => {
                o.items.forEach(id => {
                  const m = MENU.find(x => x.id === id);
                  if (m) addToCart(m, 1);
                });
                goto('home');
              }}
                style={{
                  background: BRAND.forest, color: '#fff', border: 'none',
                  padding: '10px 16px', borderRadius: 999, cursor: 'pointer',
                  fontSize: 13, letterSpacing: '-0.02em',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>Reorder {Icon.arrow(12, '#fff')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
