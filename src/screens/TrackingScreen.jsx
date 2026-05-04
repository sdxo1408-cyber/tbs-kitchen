import { useState, useEffect } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';

const STAGES = [
  { id: 'placed', label: 'Order placed', sub: 'Confirmed at the kitchen' },
  { id: 'cooking', label: 'In the kitchen', sub: 'Chef is plating now' },
  { id: 'pickup', label: 'Out for delivery', sub: 'Rider has your bag' },
  { id: 'delivered', label: 'Delivered', sub: 'Bon appétit' },
];

function RiderDot({ t }) {
  const pts = [[70, 320], [120, 280], [160, 240], [210, 200], [260, 170], [320, 110]];
  const idx = Math.min(pts.length - 2, Math.floor(t * (pts.length - 1)));
  const local = (t * (pts.length - 1)) - idx;
  const [x1, y1] = pts[idx];
  const [x2, y2] = pts[idx + 1];
  const x = x1 + (x2 - x1) * local;
  const y = y1 + (y2 - y1) * local;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="14" fill="#fff" opacity="0.9" />
      <circle r="9" fill="#D43A24" />
      <text y="3" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="ui-monospace, monospace">▲</text>
    </g>
  );
}

function FakeMap({ stage }) {
  const t = Math.min(1, (stage + 0.5) / 3.5);
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#E5E6D8' }}>
      <svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="400" height="380" fill="#E8E9DC" />
        <path d="M0 50 Q60 30 120 60 T240 70 L240 130 Q160 140 80 120 T0 130 Z" fill="#D5D9C4" opacity="0.7" />
        <path d="M260 200 Q320 180 380 210 L400 260 L400 320 L260 310 Z" fill="#D5D9C4" opacity="0.7" />
        <path d="M-20 280 Q120 240 240 290 T420 270" stroke="#C5D2D8" strokeWidth="22" fill="none" opacity="0.6" />
        <g stroke="#fff" strokeWidth="14" fill="none" opacity="0.85">
          <path d="M-20 190 L420 170" />
          <path d="M50 -20 L60 400" />
          <path d="M260 -20 L240 400" />
          <path d="M-20 90 Q120 100 250 80 T420 95" />
        </g>
        <g stroke="#fff" strokeWidth="6" fill="none" opacity="0.7">
          <path d="M120 -20 L130 400" />
          <path d="M-20 250 L420 240" />
          <path d="M-20 320 L420 310" />
        </g>
        <path d="M70 320 Q120 280 160 240 T260 170 L320 110"
          stroke="#2B3A1E" strokeWidth="3.5" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
        <g transform="translate(70 320)">
          <circle r="14" fill="#D43A24" />
          <circle r="6" fill="#fff" />
        </g>
        <g transform="translate(320 110)">
          <circle r="18" fill="#2B3A1E" opacity="0.15" />
          <circle r="11" fill="#2B3A1E" />
          <circle r="11" fill="none" stroke="#2B3A1E" strokeWidth="2" opacity="0.4">
            <animate attributeName="r" values="11;22;11" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
        <RiderDot t={t} />
        <text x="40" y="345" fontFamily="ui-monospace, monospace" fontSize="9" fill="#2B3A1E" opacity="0.7">KITCHEN</text>
        <text x="296" y="92" fontFamily="ui-monospace, monospace" fontSize="9" fill="#2B3A1E" opacity="0.7">YOU</text>
      </svg>
    </div>
  );
}

export default function TrackingScreen({ goto, cart, resetCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [stage, setStage] = useState(0);
  const [eta, setEta] = useState(28);
  const [orderId] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  const rider = { name: 'Vikram', vehicle: 'Bike · UP78 4421', rating: 4.9 };

  useEffect(() => {
    const id = setInterval(() => setStage(s => Math.min(STAGES.length - 1, s + 1)), 4500);
    const idEta = setInterval(() => setEta(e => Math.max(2, e - 1)), 1500);
    return () => { clearInterval(id); clearInterval(idEta); };
  }, []);

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      position: 'relative',
    }}>
      <div style={{ height: 380, position: 'relative', overflow: 'hidden' }}>
        <FakeMap stage={stage} />

        <button onClick={() => { resetCart(); goto('home'); }} style={{
          position: 'absolute', top: 20, left: 18,
          width: 38, height: 38, borderRadius: 999,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>{Icon.close(16, BRAND.forest)}</button>

        <div style={{
          position: 'absolute', top: 20, right: 18,
          background: '#fff', borderRadius: 999, padding: '8px 14px',
          fontSize: 12, color: BRAND.forest, letterSpacing: '-0.01em',
          boxShadow: '0 6px 18px -8px rgba(0,0,0,0.2)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {Icon.clock(12, BRAND.forest)}
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 15 }}>{eta}</span>
          <span>min</span>
        </div>
      </div>

      <div style={{
        marginTop: -32, background: BRAND.cream,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '24px 22px 120px', position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'rgba(43,58,30,0.18)', marginBottom: 18 }} />
        </div>

        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 6,
        }}>order #TBS-{orderId}</div>
        <h1 style={{
          margin: '0 0 4px', fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em',
        }}>{STAGES[stage].label}</h1>
        <p style={{ margin: '0 0 22px', fontSize: 13.5, color: BRAND.inkSoft, letterSpacing: '-0.02em' }}>
          {STAGES[stage].sub}
        </p>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {STAGES.map((s, i) => (
            <div key={s.id} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i <= stage ? BRAND.forest : 'rgba(43,58,30,0.12)',
              transition: 'background 500ms ease',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {STAGES.map((s, i) => {
            const done = i < stage;
            const active = i === stage;
            return (
              <div key={s.id} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                opacity: i > stage ? 0.4 : 1,
                transition: 'opacity 300ms ease',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                  background: done ? BRAND.forest : active ? BRAND.tomato : 'transparent',
                  border: done || active ? 'none' : `1.5px solid ${BRAND.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {done && Icon.check(13, '#fff')}
                  {active && (
                    <>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />
                      <span style={{
                        position: 'absolute', inset: -4, borderRadius: 999,
                        border: `2px solid ${BRAND.tomato}`, opacity: 0.4,
                        animation: 'tbs-pulse 1.4s ease-out infinite',
                      }} />
                    </>
                  )}
                </div>
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <div style={{ fontSize: 14, color: BRAND.ink, letterSpacing: '-0.02em', fontWeight: active ? 500 : 400 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 11.5, color: BRAND.muted, marginTop: 2 }}>{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {stage >= 2 && (
          <div style={{
            background: '#fff', borderRadius: 20, padding: 16,
            display: 'flex', alignItems: 'center', gap: 14,
            marginBottom: 18,
            animation: 'tbs-rise 500ms ease both',
            boxShadow: '0 10px 24px -16px rgba(43,58,30,0.3)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 999, flexShrink: 0,
              background: BRAND.forest, color: BRAND.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 22,
            }}>{rider.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, letterSpacing: '-0.02em', color: BRAND.ink }}>{rider.name}</div>
              <div style={{ fontSize: 11.5, color: BRAND.muted, marginTop: 2 }}>{rider.vehicle}</div>
              <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4, color: BRAND.forest, fontSize: 11 }}>
                {Icon.star(11, BRAND.forest)} {rider.rating} · 1,200 deliveries
              </div>
            </div>
            <button style={{
              width: 40, height: 40, borderRadius: 999,
              background: BRAND.cream, color: BRAND.forest,
              border: `1px solid ${BRAND.line}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.phone(16, BRAND.forest)}</button>
            <button style={{
              width: 40, height: 40, borderRadius: 999,
              background: BRAND.tomato, color: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.chat(16, '#fff')}</button>
          </div>
        )}

        <div style={{ background: BRAND.blush, borderRadius: 20, padding: 18 }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: BRAND.forest, opacity: 0.6, marginBottom: 10,
          }}>your order · {cart.reduce((s, i) => s + i.qty, 0)} items</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cart.length === 0 ? (
              <div style={{ fontSize: 13, color: BRAND.inkSoft }}>
                <em style={{ fontFamily: 'Instrument Serif, serif' }}>1× Classic Buddha Bowl</em>,{' '}
                <em style={{ fontFamily: 'Instrument Serif, serif' }}>1× Anabolic Chicken Meal</em>
              </div>
            ) : (
              cart.map(i => (
                <div key={i.lineId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: BRAND.ink }}>
                    <span style={{ color: BRAND.muted }}>{i.qty}×</span>{' '}
                    <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>{i.name}</span>
                  </span>
                  <span style={{ color: BRAND.forest }}>₹{i.price * i.qty}</span>
                </div>
              ))
            )}
          </div>
          {total > 0 && (
            <div style={{
              marginTop: 14, paddingTop: 12,
              borderTop: '1px solid rgba(43,58,30,0.1)',
              display: 'flex', justifyContent: 'space-between',
              fontSize: 14, color: BRAND.ink,
            }}>
              <span>Total paid</span>
              <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18 }}>₹{total}</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, padding: '14px', borderRadius: 999,
            background: 'transparent', color: BRAND.forest,
            border: `1px solid ${BRAND.line}`, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, letterSpacing: '-0.02em',
          }}>Need help?</button>
          <button onClick={() => { resetCart(); goto('menu'); }} style={{
            flex: 1, padding: '14px', borderRadius: 999,
            background: BRAND.forest, color: '#fff',
            border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, letterSpacing: '-0.02em',
          }}>Order again</button>
        </div>
      </div>
    </div>
  );
}
