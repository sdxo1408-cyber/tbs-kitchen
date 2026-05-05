import { useState, useEffect } from 'react';
import { BRAND } from '../brand';
import { MENU } from '../data/menu';
import { Icon } from '../components/Icons';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const CAROUSEL = [
  {
    src: '/photo-bowl.png',
    eyebrow: 'this week',
    title: 'Bowls, reimagined.',
    sub: 'Slow-cooked grains, bright herbs, real protein.',
    tone: 'forest',
  },
  {
    src: '/photo-waffle.png',
    eyebrow: 'high-protein',
    title: 'Sweet, without the crash.',
    sub: 'Whey-spiked oat waffles, berries, maple drizzle.',
    tone: 'tomato',
  },
];

function HeroCarousel({ onBrowse }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % CAROUSEL.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      margin: '8px 22px 0',
      borderRadius: 22, overflow: 'hidden',
      position: 'relative', height: 220,
      boxShadow: '0 18px 36px -22px rgba(43,58,30,0.45)',
      background: BRAND.forestDeep,
    }}>
      {CAROUSEL.map((slide, i) => (
        <div key={slide.src} style={{
          position: 'absolute', inset: 0,
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 800ms ease',
          pointerEvents: i === idx ? 'auto' : 'none',
        }}>
          <img
            src={slide.src} alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              transform: i === idx ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 6s ease-out',
            }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(31,44,20,0) 35%, rgba(31,44,20,0.78) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 18, right: 18, bottom: 16,
            color: BRAND.cream,
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(240,241,230,0.18)', backdropFilter: 'blur(6px)',
              fontFamily: 'ui-monospace, monospace', fontSize: 9.5,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              marginBottom: 8,
            }}>{slide.eyebrow}</div>
            <div style={{
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.01em',
              marginBottom: 4,
            }}>{slide.title}</div>
            <div style={{
              fontSize: 12.5, color: 'rgba(240,241,230,0.85)',
              letterSpacing: '-0.02em',
            }}>{slide.sub}</div>
          </div>
        </div>
      ))}

      <button onClick={onBrowse} aria-label="Browse menu" style={{
        position: 'absolute', top: 14, right: 14,
        width: 36, height: 36, borderRadius: 999,
        background: 'rgba(240,241,230,0.92)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}>{Icon.arrow(14, BRAND.forest)}</button>

      <div style={{
        position: 'absolute', top: 14, left: 14,
        display: 'flex', gap: 4,
      }}>
        {CAROUSEL.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
            style={{
              width: i === idx ? 18 : 6, height: 4, borderRadius: 999,
              background: i === idx ? BRAND.cream : 'rgba(240,241,230,0.5)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 320ms ease',
            }} />
        ))}
      </div>
    </div>
  );
}

function macroPlanFor(profile) {
  const goal = profile?.goal;
  const activity = profile?.activity;
  const macros = profile?.macros;

  let kcal = 2000;
  if (goal === 'lose') kcal = 1700;
  else if (goal === 'gain') kcal = 2400;
  else if (goal === 'health') kcal = 1900;

  if (activity === 'intense') kcal += 250;
  else if (activity === 'moderate') kcal += 120;
  else if (activity === 'sedentary') kcal -= 100;

  let p = 0.30, c = 0.40, f = 0.30;
  if (macros === 'high-protein') { p = 0.40; c = 0.35; f = 0.25; }
  else if (macros === 'low-carb') { p = 0.35; c = 0.25; f = 0.40; }
  else if (macros === 'high-carb') { p = 0.25; c = 0.55; f = 0.20; }

  return {
    kcal,
    protein: Math.round((kcal * p) / 4),
    carbs: Math.round((kcal * c) / 4),
    fat: Math.round((kcal * f) / 9),
  };
}

function macroFromMeal(meal) {
  const kcal = meal.kcal || 0;
  return {
    protein: Math.round((kcal * 0.30) / 4),
    carbs: Math.round((kcal * 0.45) / 4),
    fat: Math.round((kcal * 0.25) / 9),
  };
}

function Ring({ value, target, size = 120, color = BRAND.forest }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(1, value / Math.max(1, target));
  const offset = circ * (1 - pct);

  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={BRAND.line} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 600ms ease' }} />
    </svg>
  );
}

function MacroCol({ label, value, target, color }) {
  const pct = Math.min(100, (value / Math.max(1, target)) * 100);
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: BRAND.muted, letterSpacing: '0.04em',
        textTransform: 'uppercase', marginBottom: 6,
      }}>
        <span>{label}</span>
        <span style={{ color: BRAND.ink }}>{value}/{target}g</span>
      </div>
      <div style={{ height: 5, background: BRAND.line, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color,
          transition: 'width 500ms ease',
        }} />
      </div>
    </div>
  );
}

export default function DashboardScreen({ userProfile, goto, addToCart }) {
  const plan = macroPlanFor(userProfile);
  const [logged, setLogged] = useState([]);
  const [water, setWater] = useState(0); // glasses, target 8
  const [showAdd, setShowAdd] = useState(false);

  const totals = logged.reduce((acc, m) => {
    const macs = macroFromMeal(m);
    return {
      kcal: acc.kcal + (m.kcal || 0),
      protein: acc.protein + macs.protein,
      carbs: acc.carbs + macs.carbs,
      fat: acc.fat + macs.fat,
    };
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });

  const addMeal = (m) => {
    setLogged(l => [...l, { ...m, loggedAt: Date.now() }]);
    setShowAdd(false);
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const remaining = Math.max(0, plan.kcal - totals.kcal);

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
    }}>
      <div style={{ padding: '92px 24px 4px' }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55,
        }}>{greeting}</div>
        <h1 style={{
          margin: '6px 0 4px', fontFamily: 'DM Sans, sans-serif',
          fontSize: 34, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.04em',
        }}>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>
            {userProfile?.name || 'Friend'}
          </span>
          <span style={{ color: BRAND.inkSoft }}>.</span>
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: BRAND.inkSoft }}>
          {remaining > 0 ? `${remaining} kcal still on today's plate.` : 'You\'ve hit your target — nice work.'}
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <HeroCarousel onBrowse={() => goto('menu')} />
      </div>

      <div style={{
        padding: '6px 22px 6px',
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: BRAND.muted, marginTop: 14,
      }}>Macros · today</div>

      <div style={{
        margin: '6px 22px 0', padding: '22px 22px 24px',
        background: '#fff', borderRadius: 22,
        display: 'flex', alignItems: 'center', gap: 22,
        boxShadow: '0 12px 28px -22px rgba(43,58,30,0.25)',
      }}>
        <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
          <Ring value={totals.kcal} target={plan.kcal} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 30, lineHeight: 1, color: BRAND.ink,
            }}>{remaining}</div>
            <div style={{
              marginTop: 2, fontSize: 10, color: BRAND.muted,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>kcal left</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <MacroCol label="Protein" value={totals.protein} target={plan.protein} color={BRAND.tomato} />
          <MacroCol label="Carbs" value={totals.carbs} target={plan.carbs} color={BRAND.forest} />
          <MacroCol label="Fat" value={totals.fat} target={plan.fat} color={BRAND.lavender} />
        </div>
      </div>

      <div style={{
        padding: '18px 22px 6px',
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: BRAND.muted,
      }}>Hydration</div>

      <div style={{
        margin: '6px 22px 0', padding: '18px 20px',
        background: BRAND.forest, color: BRAND.cream, borderRadius: 22,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6,
            }}>hydration</div>
            <div style={{
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 26, lineHeight: 1.1,
            }}>{water} of 8 glasses</div>
          </div>
          <button onClick={() => setWater(w => Math.max(0, w - 1))} style={{
            width: 34, height: 34, borderRadius: 999,
            background: 'rgba(240,241,230,0.15)', color: BRAND.cream,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.minus(14, BRAND.cream)}</button>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setWater(i + 1)} style={{
              flex: 1, height: 34, borderRadius: 10,
              background: i < water ? BRAND.cream : 'rgba(240,241,230,0.18)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 200ms ease',
            }}>
              {Icon.water(14, i < water ? BRAND.forest : 'rgba(240,241,230,0.6)')}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        padding: '20px 22px 6px',
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: BRAND.muted,
      }}>Meals logged · {logged.length}</div>

      <div style={{
        margin: '6px 22px 12px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h2 style={{
          margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 24, fontWeight: 400, letterSpacing: '-0.02em',
        }}>{logged.length === 0 ? 'Nothing yet today' : 'Today\'s meals'}</h2>
        <button onClick={() => setShowAdd(true)} style={{
          background: BRAND.tomato, color: '#fff', border: 'none',
          padding: '10px 16px', borderRadius: 999, cursor: 'pointer',
          fontSize: 13, letterSpacing: '-0.02em',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>{Icon.plus(13, '#fff')} Log meal</button>
      </div>

      <div style={{ padding: '0 22px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {logged.length === 0 ? (
          <div style={{
            padding: '24px 20px', textAlign: 'center',
            background: '#fff', borderRadius: 18, color: BRAND.muted,
            fontSize: 13,
          }}>Tap <span style={{ color: BRAND.tomato }}>Log meal</span> to start tracking your day.</div>
        ) : (
          logged.map((m, i) => {
            const macs = macroFromMeal(m);
            return (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, padding: 12,
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <PhotoPlaceholder label="" height={56} tone={m.tone} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                    fontSize: 16, color: BRAND.ink,
                  }}>{m.name}</div>
                  <div style={{ marginTop: 3, fontSize: 11, color: BRAND.muted }}>
                    {m.kcal} kcal · {macs.protein}p · {macs.carbs}c · {macs.fat}f
                  </div>
                </div>
                <button onClick={() => setLogged(l => l.filter((_, j) => j !== i))} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: 6, color: BRAND.muted,
                }}>{Icon.trash(14, BRAND.muted)}</button>
              </div>
            );
          })
        )}
      </div>

      <div style={{
        margin: '0 22px 24px', padding: 22,
        background: BRAND.blush, borderRadius: 22,
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 6,
        }}>recommended for you</div>
        <h3 style={{
          margin: '0 0 12px', fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic', fontSize: 24, fontWeight: 400,
        }}>Hit your protein, fast</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: BRAND.inkSoft }}>
          Order one of these — designed to slot right into your remaining macros.
        </p>
        <button onClick={() => goto('menu')} style={{
          background: BRAND.forest, color: '#fff', border: 'none',
          padding: '12px 18px', borderRadius: 999, cursor: 'pointer',
          fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>Browse the menu {Icon.arrow(13, '#fff')}</button>
      </div>

      <div style={{ height: 100 }} />

      {showAdd && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 80,
          background: 'rgba(31,44,20,0.45)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'flex-end',
          animation: 'tbs-screen-in 280ms ease-out both',
        }}
          onClick={() => setShowAdd(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxHeight: '78%', overflowY: 'auto',
            background: BRAND.cream,
            borderTopLeftRadius: 28, borderTopRightRadius: 28,
            padding: '20px 22px 32px',
          }}>
            <div style={{
              width: 40, height: 4, borderRadius: 999,
              background: 'rgba(43,58,30,0.18)',
              margin: '0 auto 18px',
            }} />
            <h3 style={{
              margin: '0 0 14px', fontFamily: 'DM Sans, sans-serif',
              fontSize: 22, fontWeight: 400, letterSpacing: '-0.03em',
            }}>Log a meal</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MENU.slice(0, 12).map(m => (
                <button key={m.id} onClick={() => addMeal(m)} style={{
                  background: '#fff', border: 'none', cursor: 'pointer',
                  padding: 10, borderRadius: 14, textAlign: 'left',
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden' }}>
                    <PhotoPlaceholder label="" height={48} tone={m.tone} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                      fontSize: 15, color: BRAND.ink,
                    }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>
                      {m.kcal} kcal
                    </div>
                  </div>
                  {Icon.plus(14, BRAND.forest)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
