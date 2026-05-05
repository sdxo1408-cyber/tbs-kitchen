import { useState, useEffect } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';
import PillButton from '../components/PillButton';

const STEPS = [
  { label: 'Reading your goals', icon: 'target' },
  { label: 'Mapping your macros', icon: 'flame' },
  { label: 'Picking the right meals', icon: 'leaf' },
  { label: 'Calibrating your coach', icon: 'star' },
];

function macroPlan(profile) {
  const goal = profile?.goal;
  const activity = profile?.activity;
  const macros = profile?.macros;

  let kcal = 2000;
  if (goal === 'lose') kcal = 1700;
  else if (goal === 'gain') kcal = 2400;
  else if (goal === 'maintain') kcal = 2000;
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

function MacroBar({ label, value, unit, pct, color }) {
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: BRAND.inkSoft, marginBottom: 6,
      }}>
        <span style={{ letterSpacing: '-0.02em' }}>{label}</span>
        <span style={{ color: BRAND.ink }}>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16 }}>{value}</span>
          <span style={{ marginLeft: 3 }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: 6, background: BRAND.line, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color, borderRadius: 999,
          transition: 'width 800ms ease-out',
        }} />
      </div>
    </div>
  );
}

export default function AICoachScreen({ userProfile, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (activeStep >= STEPS.length) { setDone(true); return; }
    const t = setTimeout(() => setActiveStep(s => s + 1), 900);
    return () => clearTimeout(t);
  }, [activeStep, done]);

  const plan = macroPlan(userProfile);
  const total = plan.protein * 4 + plan.carbs * 4 + plan.fat * 9;

  if (!done) {
    return (
      <div style={{
        height: '100%', background: BRAND.cream, color: BRAND.ink,
        fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
        padding: '64px 28px 48px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>your coach</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 34, lineHeight: 1.05, fontWeight: 400,
          letterSpacing: '-0.04em', color: BRAND.ink,
        }}>Building your{' '}
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>plan</span>…
        </h1>
        <p style={{ marginTop: 12, fontSize: 14, color: BRAND.inkSoft }}>
          One moment — making sense of everything you told us.
        </p>

        <div style={{
          marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {STEPS.map((s, i) => {
            const status = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
            return (
              <div key={s.label} style={{
                background: '#fff', borderRadius: 16,
                padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
                opacity: status === 'pending' ? 0.45 : 1,
                transition: 'opacity 400ms ease',
                animation: status === 'active' ? 'tbs-card-in 360ms ease-out both' : 'none',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 999,
                  background: status === 'done' ? BRAND.forest : BRAND.cream,
                  color: status === 'done' ? BRAND.cream : BRAND.forest,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {status === 'done'
                    ? Icon.check(16, BRAND.cream)
                    : (s.icon === 'target' ? Icon.target(16, BRAND.forest)
                      : s.icon === 'flame' ? Icon.flame(16, BRAND.forest)
                      : s.icon === 'leaf' ? Icon.leaf(16, BRAND.forest)
                      : Icon.star(16, BRAND.forest))}
                  {status === 'active' && (
                    <span style={{
                      position: 'absolute', inset: 0, borderRadius: 999,
                      border: `2px solid ${BRAND.forest}`,
                      animation: 'tbs-pulse 1.4s ease-out infinite',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, fontSize: 14, color: BRAND.ink }}>{s.label}</div>
                {status === 'done' && (
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: 10,
                    letterSpacing: '0.1em', color: BRAND.muted,
                  }}>done</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const proteinKcal = plan.protein * 4;
  const carbKcal = plan.carbs * 4;
  const fatKcal = plan.fat * 9;

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '64px 28px 0',
        animation: 'tbs-plan-up 600ms ease-out both',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>plan ready</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 34, lineHeight: 1.05, fontWeight: 400,
          letterSpacing: '-0.04em', color: BRAND.ink,
        }}>Your daily{' '}
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>blueprint</span>
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, color: BRAND.inkSoft }}>
          Tuned to your goals, body, and the way you actually live.
        </p>
      </div>

      <div style={{
        margin: '24px 24px 12px', padding: 24,
        background: BRAND.forest, color: BRAND.cream, borderRadius: 24,
        animation: 'tbs-card-in 600ms ease-out 200ms both',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          opacity: 0.6,
        }}>daily calories</div>
        <div style={{
          marginTop: 6, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em',
        }}>{plan.kcal}<span style={{ fontSize: 18, opacity: 0.7, marginLeft: 6 }}>kcal</span></div>
      </div>

      <div style={{
        margin: '0 24px', padding: 22, background: '#fff', borderRadius: 24,
        display: 'flex', flexDirection: 'column', gap: 16,
        animation: 'tbs-card-in 600ms ease-out 320ms both',
      }}>
        <MacroBar label="Protein" value={plan.protein} unit="g" pct={(proteinKcal / total) * 100} color={BRAND.tomato} />
        <MacroBar label="Carbs" value={plan.carbs} unit="g" pct={(carbKcal / total) * 100} color={BRAND.forest} />
        <MacroBar label="Fat" value={plan.fat} unit="g" pct={(fatKcal / total) * 100} color={BRAND.lavender} />
      </div>

      <div style={{
        margin: '20px 24px', padding: 20, background: BRAND.blush, borderRadius: 20,
        animation: 'tbs-card-in 600ms ease-out 440ms both',
      }}>
        <div style={{
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 18, color: BRAND.ink, marginBottom: 6,
        }}>"You're set up for steady wins."</div>
        <div style={{ fontSize: 12.5, color: BRAND.inkSoft }}>
          We'll tune this as you log meals and feedback. No crash dieting, no nonsense.
        </div>
      </div>

      <div style={{
        marginTop: 'auto', padding: '14px 22px 28px', background: BRAND.cream,
      }}>
        <PillButton variant="forest" full size="lg" onClick={onComplete}>
          Continue {Icon.arrow(14, '#fff')}
        </PillButton>
      </div>
    </div>
  );
}
