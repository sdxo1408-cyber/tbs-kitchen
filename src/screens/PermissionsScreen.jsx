import { useState } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';
import PillButton from '../components/PillButton';

const PERMS = [
  {
    id: 'location',
    title: 'Location',
    blurb: 'So we can show meals available near you and accurate delivery times.',
    icon: 'mapPin',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    blurb: 'Daily macro nudges, meal reminders, and order updates. Opt out anytime.',
    icon: 'bell',
  },
  {
    id: 'health',
    title: 'Health & camera',
    blurb: 'Sync workouts and scan barcodes. We never share your health data.',
    icon: 'heart',
  },
];

function PermCard({ p, status, onAllow, onSkip }) {
  const ic = p.icon;
  return (
    <div style={{
      background: '#fff', borderRadius: 22,
      padding: '22px 22px 20px',
      boxShadow: '0 12px 30px -20px rgba(43,58,30,0.3)',
      animation: 'tbs-card-in 420ms ease-out both',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: BRAND.cream, display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        {ic === 'mapPin' && Icon.mapPin(24, BRAND.forest)}
        {ic === 'bell' && Icon.bell(24, BRAND.forest)}
        {ic === 'heart' && Icon.heart(24, BRAND.forest)}
      </div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 20,
        fontWeight: 500, letterSpacing: '-0.03em', color: BRAND.ink,
      }}>{p.title}</div>
      <p style={{
        margin: '8px 0 16px', fontSize: 13.5, lineHeight: 1.5,
        color: BRAND.inkSoft,
      }}>{p.blurb}</p>

      {status === 'pending' ? (
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onSkip} style={{
            flex: 1, padding: '12px 16px', borderRadius: 999,
            background: 'transparent', border: `1px solid ${BRAND.line}`,
            color: BRAND.forest, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, letterSpacing: '-0.02em',
          }}>Not now</button>
          <button onClick={onAllow} style={{
            flex: 1, padding: '12px 16px', borderRadius: 999,
            background: BRAND.forest, border: 'none',
            color: '#fff', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, letterSpacing: '-0.02em',
          }}>Allow</button>
        </div>
      ) : (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 999,
          background: status === 'allowed' ? BRAND.forest : BRAND.blush,
          color: status === 'allowed' ? BRAND.cream : BRAND.forest,
          fontSize: 12, letterSpacing: '-0.01em',
        }}>
          {status === 'allowed' ? Icon.check(11, BRAND.cream) : Icon.close(11, BRAND.forest)}
          {status === 'allowed' ? 'Allowed' : 'Skipped'}
        </div>
      )}
    </div>
  );
}

export default function PermissionsScreen({ onComplete }) {
  const [statuses, setStatuses] = useState({});

  const set = (id, v) => setStatuses(s => ({ ...s, [id]: v }));
  const settled = PERMS.every(p => statuses[p.id]);

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '64px 28px 8px' }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>last step</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 34, lineHeight: 1.05, fontWeight: 400,
          letterSpacing: '-0.04em', color: BRAND.ink,
        }}>A few{' '}
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>permissions</span>
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, color: BRAND.inkSoft }}>
          Skip any you're not comfortable with — you can change these later in Settings.
        </p>
      </div>

      <div style={{
        padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {PERMS.map(p => (
          <PermCard
            key={p.id} p={p}
            status={statuses[p.id] || 'pending'}
            onAllow={() => set(p.id, 'allowed')}
            onSkip={() => set(p.id, 'skipped')} />
        ))}
      </div>

      <div style={{
        marginTop: 'auto', padding: '14px 22px 28px', background: BRAND.cream,
      }}>
        <PillButton
          variant="forest" full size="lg" onClick={onComplete}
          style={{ opacity: settled ? 1 : 0.55, pointerEvents: settled ? 'auto' : 'none' }}>
          {settled ? 'Enter the kitchen' : 'Decide on each above'}
          {Icon.arrow(14, '#fff')}
        </PillButton>
      </div>
    </div>
  );
}
