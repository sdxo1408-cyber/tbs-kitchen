import { useState } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 999,
      background: on ? BRAND.forest : 'rgba(43,58,30,0.18)',
      border: 'none', cursor: 'pointer', position: 'relative',
      transition: 'background 200ms ease',
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: 999, background: '#fff',
        transition: 'left 200ms ease',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function Group({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: BRAND.muted, padding: '0 6px 8px',
      }}>{title}</div>
      <div style={{
        background: '#fff', borderRadius: 16,
        display: 'flex', flexDirection: 'column',
      }}>{children}</div>
    </div>
  );
}

function Item({ label, sub, right, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${BRAND.line}`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, color: BRAND.ink, letterSpacing: '-0.02em' }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: BRAND.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

export default function SettingsScreen({ goto, onLogout }) {
  const [push, setPush] = useState(true);
  const [emails, setEmails] = useState(false);
  const [reminders, setReminders] = useState(true);

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
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 32, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.04em',
        }}>Settings</h1>
      </div>

      <div style={{ padding: '0 22px 100px' }}>
        <Group title="Notifications">
          <Item label="Push notifications" sub="Order updates & meal reminders" right={<Toggle on={push} onChange={setPush} />} />
          <Item label="Email digest" sub="Weekly progress, no spam" right={<Toggle on={emails} onChange={setEmails} />} />
          <Item label="Daily macro nudges" sub="Friendly mid-day check-in" right={<Toggle on={reminders} onChange={setReminders} />} last />
        </Group>

        <Group title="Account">
          <Item label="Edit profile" right={Icon.arrow(14, BRAND.muted)} />
          <Item label="Delivery addresses" right={Icon.arrow(14, BRAND.muted)} />
          <Item label="Payment methods" right={Icon.arrow(14, BRAND.muted)} last />
        </Group>

        <Group title="Health">
          <Item label="Allergies & dislikes" right={Icon.arrow(14, BRAND.muted)} />
          <Item label="Recalibrate macros" sub="Re-take the questionnaire" right={Icon.arrow(14, BRAND.muted)} last />
        </Group>

        <Group title="Support">
          <Item label="Help centre" right={Icon.arrow(14, BRAND.muted)} />
          <Item label="Privacy policy" right={Icon.arrow(14, BRAND.muted)} />
          <Item label="Terms of service" right={Icon.arrow(14, BRAND.muted)} last />
        </Group>

        <button onClick={onLogout} style={{
          width: '100%', marginTop: 12, padding: '14px 18px', borderRadius: 14,
          background: '#fff', color: BRAND.tomato, border: 'none', cursor: 'pointer',
          fontSize: 14, fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
        }}>Sign out</button>
      </div>
    </div>
  );
}
