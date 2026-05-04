import { BRAND } from '../brand';
import { Icon } from './Icons';
import PhotoPlaceholder from './PhotoPlaceholder';
import PillButton from './PillButton';

function Row({ label, value, bold, highlight }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0', fontSize: bold ? 16 : 13,
      color: bold ? BRAND.ink : BRAND.inkSoft,
      letterSpacing: '-0.02em',
    }}>
      <span>{label}</span>
      <span style={{
        fontFamily: bold ? 'Instrument Serif, serif' : 'DM Sans, sans-serif',
        fontStyle: bold ? 'italic' : 'normal',
        fontSize: bold ? 22 : 13,
        color: highlight ? BRAND.tomato : (bold ? BRAND.ink : BRAND.forest),
      }}>{value}</span>
    </div>
  );
}

export default function CartDrawer({ open, onClose, cart, removeItem, setQty, goto, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? (subtotal > 500 ? 0 : 49) : 0;
  const total = subtotal + delivery;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 90,
        background: 'rgba(31,44,20,0.45)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 280ms ease',
      }} />

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        zIndex: 100, height: '90%',
        background: BRAND.cream, color: BRAND.ink,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 380ms cubic-bezier(.2,.7,.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'rgba(43,58,30,0.2)' }} />
        </div>

        <div style={{
          padding: '8px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{
            margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em',
          }}>Your bag</h2>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'rgba(43,58,30,0.08)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.close(16, BRAND.forest)}</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 0' }}>
          {cart.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                fontSize: 26, color: BRAND.ink, marginBottom: 10,
              }}>Your bag is empty.</div>
              <div style={{ fontSize: 13, color: BRAND.muted, marginBottom: 24 }}>
                Pick a meal — we'll do the rest.
              </div>
              <PillButton onClick={() => { onClose(); goto('menu'); }}>Browse menu</PillButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map(i => (
                <div key={i.lineId} style={{
                  display: 'flex', gap: 12, padding: 10, borderRadius: 16, background: '#fff',
                }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                    <PhotoPlaceholder height={64} tone={i.tone} label="" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                      fontSize: 16, lineHeight: 1.1, color: BRAND.ink,
                    }}>{i.name}</div>
                    <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 3 }}>
                      {i.variant === 'veg' ? 'Vegetarian' : i.variant === 'nonVeg' ? 'Non-Veg' : 'Standard'}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        border: `1px solid ${BRAND.line}`, borderRadius: 999, padding: 2,
                      }}>
                        <button onClick={() => setQty(i.lineId, i.qty - 1)}
                          style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {Icon.minus(12, BRAND.forest)}
                        </button>
                        <div style={{ minWidth: 14, textAlign: 'center', fontSize: 12 }}>{i.qty}</div>
                        <button onClick={() => setQty(i.lineId, i.qty + 1)}
                          style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {Icon.plus(12, BRAND.forest)}
                        </button>
                      </div>
                      <button onClick={() => removeItem(i.lineId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: BRAND.muted, display: 'inline-flex', alignItems: 'center' }}>
                        {Icon.trash(14, BRAND.muted)}
                      </button>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: BRAND.forest, fontWeight: 500 }}>
                    ₹{i.price * i.qty}
                  </div>
                </div>
              ))}

              {subtotal < 500 && (
                <div style={{
                  margin: '6px 4px 0', padding: '12px 14px',
                  background: BRAND.blush, borderRadius: 14,
                  fontSize: 12, color: BRAND.ink, letterSpacing: '-0.01em',
                }}>
                  <div style={{ marginBottom: 6 }}>
                    Add <strong>₹{500 - subtotal}</strong> for <em style={{ fontFamily: 'Instrument Serif, serif' }}>free delivery</em>.
                  </div>
                  <div style={{ height: 4, background: 'rgba(43,58,30,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${Math.min(100, (subtotal / 500) * 100)}%`,
                      background: BRAND.forest, transition: 'width 400ms ease',
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{
            padding: '16px 22px 32px', borderTop: `1px solid ${BRAND.line}`,
            background: BRAND.cream,
          }}>
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Delivery" value={delivery === 0 ? 'Free' : `₹${delivery}`} highlight={delivery === 0} />
            <Row label="Total" value={`₹${total}`} bold />
            <PillButton variant="forest" full size="lg" style={{ marginTop: 16 }} onClick={onCheckout}>
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>Place order · Track live</span>
              {Icon.arrow(14, '#fff')}
            </PillButton>
          </div>
        )}
      </div>
    </>
  );
}
