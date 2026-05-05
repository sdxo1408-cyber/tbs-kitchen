import { useState } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';
import PillButton from '../components/PillButton';

const STEPS = [
  {
    key: 'name', title: 'What should we call you?',
    sub: 'We\'ll use this on your dashboard and check-ins.',
    type: 'text', placeholder: 'Your first name',
  },
  {
    key: 'diet', title: 'Eating preference', sub: 'What you mostly eat day-to-day.',
    type: 'single',
    options: [
      { id: 'veg', label: 'Vegetarian' },
      { id: 'nonveg', label: 'Non-vegetarian' },
      { id: 'eggetarian', label: 'Eggetarian' },
      { id: 'vegan', label: 'Vegan' },
    ],
  },
  {
    key: 'goal', title: 'Primary goal', sub: 'Pick the one that fits you most.',
    type: 'single',
    options: [
      { id: 'lose', label: 'Lose fat' },
      { id: 'gain', label: 'Build muscle' },
      { id: 'maintain', label: 'Maintain & feel better' },
      { id: 'health', label: 'Heal a health condition' },
    ],
  },
  {
    key: 'conditions', title: 'Health conditions', sub: 'Any of these apply? (optional)',
    type: 'multi',
    options: [
      { id: 'pcos', label: 'PCOS / PCOD' },
      { id: 'diabetes', label: 'Diabetes / pre-diabetic' },
      { id: 'thyroid', label: 'Thyroid' },
      { id: 'bp', label: 'High blood pressure' },
      { id: 'gut', label: 'Gut / IBS issues' },
      { id: 'none', label: 'None of these' },
    ],
  },
  {
    key: 'allergies', title: 'Allergies', sub: 'We will avoid these in your meals.',
    type: 'multi',
    options: [
      { id: 'dairy', label: 'Dairy' },
      { id: 'gluten', label: 'Gluten' },
      { id: 'nuts', label: 'Nuts' },
      { id: 'soy', label: 'Soy' },
      { id: 'shellfish', label: 'Shellfish' },
      { id: 'none', label: 'None' },
    ],
  },
  {
    key: 'cooking', title: 'Cooking time you have', sub: 'How long do you typically have?',
    type: 'single',
    options: [
      { id: 'none', label: 'I want it cooked for me' },
      { id: '15', label: 'Under 15 min' },
      { id: '30', label: '15–30 min' },
      { id: '45', label: '30+ min' },
    ],
  },
  {
    key: 'budget', title: 'Daily food budget', sub: 'Per meal, roughly.',
    type: 'single',
    options: [
      { id: 'low', label: 'Under ₹250' },
      { id: 'mid', label: '₹250–₹400' },
      { id: 'high', label: '₹400+' },
    ],
  },
  {
    key: 'lifestyle', title: 'Your lifestyle', sub: 'A typical week looks like…',
    type: 'single',
    options: [
      { id: 'desk', label: 'Mostly desk work' },
      { id: 'mixed', label: 'Mixed — desk + active' },
      { id: 'active', label: 'On my feet most days' },
      { id: 'athlete', label: 'Training like an athlete' },
    ],
  },
  {
    key: 'activity', title: 'Activity level', sub: 'How often do you train?',
    type: 'single',
    options: [
      { id: 'sedentary', label: 'Rarely / never' },
      { id: 'light', label: '1–2x per week' },
      { id: 'moderate', label: '3–4x per week' },
      { id: 'intense', label: '5+ times per week' },
    ],
  },
  {
    key: 'health_goals', title: 'Specific outcomes', sub: 'Pick what you want to feel.',
    type: 'multi',
    options: [
      { id: 'energy', label: 'More daily energy' },
      { id: 'sleep', label: 'Better sleep' },
      { id: 'focus', label: 'Sharper focus' },
      { id: 'digestion', label: 'Calmer digestion' },
      { id: 'strength', label: 'More strength' },
      { id: 'leaner', label: 'Leaner body' },
    ],
  },
  {
    key: 'macros', title: 'Macro preference', sub: 'How do you like your plate?',
    type: 'single',
    options: [
      { id: 'balanced', label: 'Balanced (default)' },
      { id: 'high-protein', label: 'High protein' },
      { id: 'low-carb', label: 'Lower carb' },
      { id: 'high-carb', label: 'Higher carb (endurance)' },
    ],
  },
];

function Choice({ option, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      padding: '16px 18px', borderRadius: 14,
      background: selected ? BRAND.forest : '#fff',
      color: selected ? BRAND.cream : BRAND.ink,
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: 'DM Sans, sans-serif', fontSize: 14.5,
      letterSpacing: '-0.02em',
      boxShadow: selected ? '0 8px 18px -10px rgba(43,58,30,0.4)' : '0 4px 12px -10px rgba(0,0,0,0.1)',
      transition: 'all 200ms ease',
    }}>
      <span>{option.label}</span>
      {selected && (
        <span style={{
          width: 22, height: 22, borderRadius: 999, background: BRAND.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.check(12, BRAND.forest)}</span>
      )}
    </button>
  );
}

export default function OnboardingScreen({ onComplete, onBack }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const step = STEPS[stepIdx];

  const select = (id) => {
    setAnswers(a => {
      if (step.type === 'single') return { ...a, [step.key]: id };
      const cur = a[step.key] || [];
      const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
      return { ...a, [step.key]: next };
    });
  };

  const setText = (val) => {
    setAnswers(a => ({ ...a, [step.key]: val }));
  };

  const isSelected = (id) => {
    const v = answers[step.key];
    if (step.type === 'single') return v === id;
    return Array.isArray(v) && v.includes(id);
  };

  const canContinue = () => {
    const v = answers[step.key];
    if (step.type === 'single') return !!v;
    if (step.type === 'text') return typeof v === 'string' && v.trim().length > 0;
    return Array.isArray(v) && v.length > 0;
  };

  const next = () => {
    if (!canContinue()) return;
    if (stepIdx < STEPS.length - 1) setStepIdx(i => i + 1);
    else onComplete(answers);
  };

  const back = () => {
    if (stepIdx === 0) onBack && onBack();
    else setStepIdx(i => i - 1);
  };

  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '20px 24px 8px', display: 'flex',
        alignItems: 'center', gap: 12,
      }}>
        <button onClick={back} style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'transparent', border: `1px solid ${BRAND.line}`,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.back(14, BRAND.forest)}</button>

        <div style={{ flex: 1, height: 4, background: BRAND.line, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: BRAND.forest, transition: 'width 320ms ease',
          }} />
        </div>

        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          color: BRAND.muted, letterSpacing: '0.04em',
        }}>{stepIdx + 1}/{STEPS.length}</span>
      </div>

      <div key={stepIdx} style={{
        flex: 1, padding: '28px 24px 24px',
        animation: 'tbs-step-in 380ms ease-out both',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>{step.type === 'multi' ? 'pick any that apply' : step.type === 'text' ? 'tell us' : 'pick one'}</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 30, lineHeight: 1.1, fontWeight: 400,
          letterSpacing: '-0.04em', color: BRAND.ink,
        }}>{step.title}</h1>
        <p style={{ marginTop: 8, fontSize: 13.5, color: BRAND.inkSoft }}>{step.sub}</p>

        {step.type === 'text' ? (
          <div style={{
            marginTop: 22, background: '#fff', borderRadius: 16,
            padding: '14px 18px',
            boxShadow: '0 6px 14px -10px rgba(0,0,0,0.15)',
          }}>
            <input
              autoFocus
              type="text"
              value={answers[step.key] || ''}
              onChange={e => setText(e.target.value)}
              placeholder={step.placeholder || ''}
              onKeyDown={e => { if (e.key === 'Enter' && canContinue()) next(); }}
              style={{
                width: '100%', border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'DM Sans, sans-serif', fontSize: 18,
                letterSpacing: '-0.02em', color: BRAND.ink,
              }} />
          </div>
        ) : (
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {step.options.map(o => (
              <Choice
                key={o.id} option={o}
                selected={isSelected(o.id)}
                onClick={() => select(o.id)} />
            ))}
          </div>
        )}
      </div>

      <div style={{
        padding: '14px 22px 28px', background: BRAND.cream,
        boxShadow: '0 -10px 30px -20px rgba(0,0,0,0.12)',
      }}>
        <PillButton
          variant="forest" full size="lg" onClick={next}
          style={{ opacity: canContinue() ? 1 : 0.45, pointerEvents: canContinue() ? 'auto' : 'none' }}>
          {stepIdx === STEPS.length - 1 ? 'Build my plan' : 'Continue'}
          {Icon.arrow(14, '#fff')}
        </PillButton>
      </div>
    </div>
  );
}
