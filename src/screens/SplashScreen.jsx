import { useState, useEffect } from 'react';
import { BRAND } from '../brand';
import { Icon } from '../components/Icons';
import PillButton from '../components/PillButton';
import API_BASE from '../config';

export default function SplashScreen({ onPhoneSubmit }) {
  const [phase, setPhase] = useState('intro'); // intro → phone → otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (phase !== 'intro') return;
    const t = setTimeout(() => setPhase('phone'), 2400);
    return () => clearTimeout(t);
  }, [phase]);

  const sendOtp = async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) { setError('Enter a 10-digit phone'); return; }
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: digits }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send OTP'); return; }
      setPhase('otp');
    } catch (err) {
      setError('Could not reach server. Try again.');
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { setError('OTP is 6 digits'); return; }
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ''), code: otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid OTP'); return; }
      onPhoneSubmit(phone.replace(/\D/g, ''), data.isNewUser, data.user);
    } catch (err) {
      setError('Could not reach server. Try again.');
    }
  };

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      display: 'flex', flexDirection: 'column',
    }}>
      {phase === 'intro' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: 32,
        }}>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 14, letterSpacing: '-0.01em',
            color: BRAND.forest, opacity: 0.6, marginBottom: 14,
            animation: 'tbs-rise 600ms ease-out both',
          }}>welcome to</div>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 64, lineHeight: 0.95, color: BRAND.forest,
            letterSpacing: '-0.03em', textAlign: 'center',
            animation: 'tbs-write 1.6s cubic-bezier(.6,0,.2,1) 200ms both',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}>
            tbs kitchen.
          </div>
          <div style={{
            marginTop: 28, fontSize: 13, color: BRAND.inkSoft,
            animation: 'tbs-rise 700ms ease-out 1500ms both',
          }}>simplifying healthy eating</div>
        </div>
      )}

      {phase === 'phone' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: '64px 28px 48px',
          animation: 'tbs-screen-in 500ms ease-out both',
        }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: BRAND.forest, opacity: 0.55, marginBottom: 8,
          }}>step 1 of 5</div>
          <h1 style={{
            margin: 0, fontFamily: 'DM Sans, sans-serif',
            fontSize: 36, lineHeight: 1.05, fontWeight: 400,
            letterSpacing: '-0.04em', color: BRAND.ink,
          }}>What's your{' '}
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>phone</span>?
          </h1>
          <p style={{ marginTop: 12, fontSize: 14, color: BRAND.inkSoft }}>
            We'll text you a one-time code. No spam, ever.
          </p>

          <div style={{
            marginTop: 32, background: '#fff', borderRadius: 16,
            padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'center',
            boxShadow: '0 6px 14px -10px rgba(0,0,0,0.15)',
          }}>
            <span style={{ color: BRAND.forest, fontSize: 15 }}>+91</span>
            <input
              type="tel" value={phone} maxLength={10}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98xxx xxxxx"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'DM Sans, sans-serif', fontSize: 16,
                letterSpacing: '0.04em', color: BRAND.ink,
              }} />
          </div>

          {error && (
            <div style={{
              marginTop: 12, padding: '10px 14px', borderRadius: 12,
              background: 'rgba(212,58,36,0.1)', color: BRAND.tomato,
              fontSize: 12.5,
            }}>{error}</div>
          )}

          <div style={{ marginTop: 24 }}>
            <PillButton variant="forest" full size="lg" onClick={sendOtp}>
              Send code {Icon.arrow(14, '#fff')}
            </PillButton>
          </div>

          <div style={{
            marginTop: 'auto', textAlign: 'center', fontSize: 11,
            color: BRAND.muted, letterSpacing: '-0.01em', paddingTop: 32,
          }}>
            By continuing you agree to our terms & privacy policy.
          </div>
        </div>
      )}

      {phase === 'otp' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: '64px 28px 48px',
          animation: 'tbs-screen-in 500ms ease-out both',
        }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: BRAND.forest, opacity: 0.55, marginBottom: 8,
          }}>verify</div>
          <h1 style={{
            margin: 0, fontFamily: 'DM Sans, sans-serif',
            fontSize: 36, lineHeight: 1.05, fontWeight: 400,
            letterSpacing: '-0.04em', color: BRAND.ink,
          }}>Enter the{' '}
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>code</span>
          </h1>
          <p style={{ marginTop: 12, fontSize: 14, color: BRAND.inkSoft }}>
            Sent to +91 {phone}. <button onClick={() => { setPhase('phone'); setOtp(''); setError(''); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: BRAND.forest, padding: 0,
                fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                fontSize: 14,
              }}>Change?</button>
          </p>

          <div style={{
            marginTop: 32, background: '#fff', borderRadius: 16,
            padding: '14px 18px',
            boxShadow: '0 6px 14px -10px rgba(0,0,0,0.15)',
          }}>
            <input
              type="tel" inputMode="numeric" value={otp} maxLength={6}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              style={{
                width: '100%', border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'DM Sans, sans-serif', fontSize: 28,
                letterSpacing: '0.6em', textAlign: 'center', color: BRAND.ink,
              }} />
          </div>

          {error && (
            <div style={{
              marginTop: 12, padding: '10px 14px', borderRadius: 12,
              background: 'rgba(212,58,36,0.1)', color: BRAND.tomato,
              fontSize: 12.5,
            }}>{error}</div>
          )}

          <div style={{ marginTop: 24 }}>
            <PillButton variant="forest" full size="lg" onClick={verifyOtp}>
              Verify & continue {Icon.arrow(14, '#fff')}
            </PillButton>
          </div>
        </div>
      )}
    </div>
  );
}