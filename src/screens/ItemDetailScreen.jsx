import { useState } from 'react';
import { BRAND } from '../brand';
import { MENU, ingredientsFor } from '../data/menu';
import { Icon } from '../components/Icons';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

function Stat({ label, value, unit, italic }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: italic ? 'Instrument Serif, serif' : 'DM Sans, sans-serif',
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: 22, color: BRAND.ink, lineHeight: 1, letterSpacing: '-0.03em',
      }}>{value}</div>
      <div style={{ marginTop: 4, fontSize: 10, color: BRAND.muted, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
        {label} {unit && <span style={{ opacity: 0.6 }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function ItemDetailScreen({ id, goto, addToCart }) {
  const m = MENU.find(x => x.id === id) || MENU[0];
  const isPremium = m.cat === 'premium';
  const [variant, setVariant] = useState(isPremium ? 'veg' : 'std');
  const [qty, setQty] = useState(1);
  const price = isPremium ? (variant === 'veg' ? m.veg : m.nonVeg) : m.price;

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
    }}>
      <div style={{ position: 'relative', height: 380 }}>
        <PhotoPlaceholder label={m.name} tone={m.tone} height={380} />
        <button onClick={() => goto('menu')} style={{
          position: 'absolute', top: 20, left: 18,
          width: 38, height: 38, borderRadius: 999,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.back(16, BRAND.forest)}</button>
      </div>

      <div style={{
        marginTop: -28, background: BRAND.cream,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '24px 24px 140px', position: 'relative',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>
          {m.cat === 'premium' ? 'premium bowl' : m.cat === 'basic' ? 'basic meal' : m.cat}
        </div>
        <h1 style={{
          margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 40, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em',
          color: BRAND.ink,
        }}>{m.name}</h1>
        <p style={{
          margin: '14px 0 18px', fontSize: 14, lineHeight: 1.55,
          color: BRAND.inkSoft, letterSpacing: '-0.02em',
        }}>{m.blurb}</p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          background: '#fff', borderRadius: 18, padding: 16, marginBottom: 22,
        }}>
          <Stat label="Calories" value={`${m.kcal}`} unit="kcal" />
          <Stat label="Ready in" value={`${m.time}`} unit="min" />
          <Stat label="Made" value="fresh" unit="daily" italic />
        </div>

        {isPremium && (
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: BRAND.forest, opacity: 0.55, marginBottom: 10,
            }}>choose your protein</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'veg', label: 'Vegetarian', price: m.veg },
                { id: 'nonVeg', label: 'Non-Veg', price: m.nonVeg },
              ].map(v => {
                const on = variant === v.id;
                return (
                  <button key={v.id} onClick={() => setVariant(v.id)}
                    style={{
                      flex: 1, padding: '14px 14px', borderRadius: 14,
                      background: on ? BRAND.forest : '#fff',
                      color: on ? BRAND.cream : BRAND.ink, border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 200ms ease',
                    }}>
                    <div style={{ fontSize: 13, letterSpacing: '-0.02em' }}>{v.label}</div>
                    <div style={{
                      marginTop: 4, fontFamily: 'Instrument Serif, serif',
                      fontStyle: 'italic', fontSize: 18,
                      color: on ? BRAND.cream : BRAND.forest,
                    }}>₹{v.price}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {m.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 26 }}>
            {m.tags.map(t => (
              <span key={t} style={{
                padding: '6px 12px', borderRadius: 999,
                background: BRAND.blush, color: BRAND.forest,
                fontSize: 11, letterSpacing: '-0.01em',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>{Icon.check(10, BRAND.forest)} {t.replace('-', ' ')}</span>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 26 }}>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 22, marginBottom: 12, color: BRAND.ink,
          }}>What's inside</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ingredientsFor(m).map(ing => (
              <div key={ing} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 13.5, color: BRAND.inkSoft,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: BRAND.forest, opacity: 0.4, flexShrink: 0 }} />
                {ing}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 5,
        background: BRAND.cream,
        padding: '14px 18px 36px',
        boxShadow: '0 -10px 30px -20px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', borderRadius: 999, padding: 4,
        }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            style={{ width: 32, height: 32, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.forest }}>
            {Icon.minus(14, BRAND.forest)}
          </button>
          <div style={{ minWidth: 18, textAlign: 'center', fontSize: 14, color: BRAND.ink }}>{qty}</div>
          <button onClick={() => setQty(q => q + 1)}
            style={{ width: 32, height: 32, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.forest }}>
            {Icon.plus(14, BRAND.forest)}
          </button>
        </div>
        <button onClick={() => { addToCart(m, qty, variant); goto('menu'); }}
          style={{
            flex: 1, padding: '14px 18px', borderRadius: 999,
            background: BRAND.forest, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, letterSpacing: '-0.02em' }}>Add to bag</span>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18, color: BRAND.cream }}>
            ₹{price * qty}
          </span>
        </button>
      </div>
    </div>
  );
}
