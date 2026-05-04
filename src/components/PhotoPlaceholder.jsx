import { BRAND } from '../brand';

const COLORS = {
  forest: ['#2B3A1E', '#3A4A2A'],
  cream: ['#E8E9DC', '#DDDEC9'],
  blush: ['#F1E8E5', '#E5D7D1'],
  lavender: ['#C3ADD2', '#A98AC1'],
  tomato: ['#D43A24', '#B82D18'],
};

export default function PhotoPlaceholder({ label = 'photo', height = 200, tone = 'forest', radius = 0, style = {} }) {
  const [a, b] = COLORS[tone] || COLORS.forest;
  const ink = (tone === 'cream' || tone === 'blush') ? BRAND.forest : '#fff';
  return (
    <div style={{
      height, width: '100%', borderRadius: radius,
      background: `repeating-linear-gradient(135deg, ${a} 0 14px, ${b} 14px 28px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      {label && (
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase',
          color: ink, background: 'rgba(255,255,255,0.85)',
          padding: '4px 10px', borderRadius: 999,
        }}>{label}</span>
      )}
    </div>
  );
}
