import { BRAND } from '../brand';
import { Icon } from '../components/Icons';

function Row({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '14px 16px', background: '#fff', borderRadius: 12,
    }}>
      <span style={{ fontSize: 12, color: BRAND.muted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 14, color: BRAND.ink }}>{value || '—'}</span>
    </div>
  );
}

const LABELS = {
  diet: { veg: 'Vegetarian', nonveg: 'Non-vegetarian', eggetarian: 'Eggetarian', vegan: 'Vegan' },
  goal: { lose: 'Lose fat', gain: 'Build muscle', maintain: 'Maintain', health: 'Heal a condition' },
  cooking: { none: 'Cooked for me', '15': 'Under 15 min', '30': '15–30 min', '45': '30+ min' },
  budget: { low: 'Under ₹250', mid: '₹250–₹400', high: '₹400+' },
  lifestyle: { desk: 'Desk work', mixed: 'Mixed', active: 'On feet', athlete: 'Athlete' },
  activity: { sedentary: 'Rare', light: '1–2x/wk', moderate: '3–4x/wk', intense: '5+/wk' },
  macros: { balanced: 'Balanced', 'high-protein': 'High protein', 'low-carb': 'Lower carb', 'high-carb': 'Higher carb' },
};

export default function ProfileScreen({ userProfile, goto }) {
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
        }}>your profile</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 32, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.04em',
        }}>{userProfile?.name || 'You'}</h1>
        <p style={{ marginTop: 8, fontSize: 13.5, color: BRAND.inkSoft }}>
          {userProfile?.phone ? `+91 ${userProfile.phone}` : 'No phone on file'}
        </p>
      </div>

      <div style={{ padding: '0 22px 100px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Row label="Diet" value={LABELS.diet[userProfile?.diet]} />
        <Row label="Goal" value={LABELS.goal[userProfile?.goal]} />
        <Row label="Cooking time" value={LABELS.cooking[userProfile?.cooking]} />
        <Row label="Budget" value={LABELS.budget[userProfile?.budget]} />
        <Row label="Lifestyle" value={LABELS.lifestyle[userProfile?.lifestyle]} />
        <Row label="Activity" value={LABELS.activity[userProfile?.activity]} />
        <Row label="Macros" value={LABELS.macros[userProfile?.macros]} />
        <Row label="Allergies" value={(userProfile?.allergies || []).filter(a => a !== 'none').join(', ') || 'None'} />
      </div>
    </div>
  );
}
