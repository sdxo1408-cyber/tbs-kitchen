// Auth screens — Login + Signup
function AuthScreen({ mode, goto, onAuth }) {
  const isLogin = mode === 'login';
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    if (!isLogin && !name.trim()) return setError('Tell us your name');
    if (!email.trim() || !email.includes('@')) return setError('Need a valid email');
    if (password.length < 6) return setError('Password must be 6+ characters');
    setError('');
    onAuth({ name: isLogin ? email.split('@')[0] : name, email, phone });
    goto('home');
  };

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
      position: 'relative',
    }}>
      {/* hero patterned panel */}
      <div style={{
        height: 280, position: 'relative',
        background: `linear-gradient(180deg, ${BRAND.forest} 0%, ${BRAND.forestDeep} 100%)`,
        overflow: 'hidden',
      }}>
        <button onClick={() => goto('home')} style={{
          position: 'absolute', top: 60, left: 18,
          width: 38, height: 38, borderRadius: 999,
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.back(16, '#fff')}</button>

        <div style={{
          position: 'absolute', bottom: 40, left: 28, right: 28,
          color: BRAND.cream,
        }}>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 16, opacity: 0.7, marginBottom: 10,
          }}>{isLogin ? 'Welcome back to' : 'Join the kitchen at'}</div>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.02em',
          }}>tbs<br/>kitchen.</div>
        </div>

        {/* decorative fruit dots */}
        <div style={{ position: 'absolute', top: 90, right: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(212,58,36,0.18)', filter: 'blur(20px)' }}/>
        <div style={{ position: 'absolute', top: 50, right: 80, width: 14, height: 14, borderRadius: '50%', background: BRAND.tomato, opacity: 0.7 }}/>
        <div style={{ position: 'absolute', top: 130, right: 40, width: 8, height: 8, borderRadius: '50%', background: BRAND.lavender, opacity: 0.8 }}/>
      </div>

      <div style={{
        marginTop: -28, background: BRAND.cream,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '28px 24px 60px', position: 'relative',
      }}>
        <h2 style={{
          margin: '0 0 6px', fontFamily: 'DM Sans, sans-serif',
          fontSize: 28, fontWeight: 400, letterSpacing: '-0.04em',
          color: BRAND.ink,
        }}>{isLogin ? 'Sign in' : 'Create account'}</h2>
        <p style={{
          margin: '0 0 24px', fontSize: 13, color: BRAND.inkSoft, letterSpacing: '-0.02em',
        }}>{isLogin ? 'Pick up where you left off.' : 'Better food is one form away.'}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {!isLogin && (
            <Field label="Full name" value={name} onChange={setName} placeholder="Aanya Sharma" />
          )}
          <Field label="Email" value={email} onChange={setEmail} placeholder="you@kitchen.com" type="email" />
          {!isLogin && (
            <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 98xxx xxxxx" type="tel" />
          )}
          <Field label="Password" value={password} onChange={setPassword}
            placeholder="6+ characters"
            type={showPw ? 'text' : 'password'}
            suffix={
              <button onClick={() => setShowPw(s => !s)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, color: BRAND.forest, padding: 0,
                fontFamily: 'ui-monospace, monospace', letterSpacing: '0.06em',
              }}>{showPw ? 'HIDE' : 'SHOW'}</button>
            }/>
        </div>

        {error && (
          <div style={{
            marginTop: 14, padding: '10px 14px', borderRadius: 12,
            background: 'rgba(212,58,36,0.1)', color: BRAND.tomato,
            fontSize: 12.5, letterSpacing: '-0.01em',
          }}>{error}</div>
        )}

        {isLogin && (
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, color: BRAND.forest, padding: 0,
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            }}>Forgot password?</button>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <PillButton variant="forest" full size="lg" onClick={handleSubmit}>
            {isLogin ? 'Sign in' : 'Create account'} {Icon.arrow(14, '#fff')}
          </PillButton>
        </div>

        {/* Divider */}
        <div style={{
          margin: '28px 0 18px', display: 'flex', alignItems: 'center', gap: 12,
          color: BRAND.muted, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
          fontFamily: 'ui-monospace, monospace',
        }}>
          <div style={{ flex: 1, height: 1, background: BRAND.line }}/>
          or
          <div style={{ flex: 1, height: 1, background: BRAND.line }}/>
        </div>

        {/* Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SocialBtn label="Continue with Google" icon="G" />
          <SocialBtn label="Continue with Apple" icon="" />
        </div>

        <div style={{
          marginTop: 28, textAlign: 'center',
          fontSize: 13, color: BRAND.inkSoft, letterSpacing: '-0.02em',
        }}>
          {isLogin ? "New here? " : 'Already have an account? '}
          <button onClick={() => goto(isLogin ? 'signup' : 'login')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, color: BRAND.forest,
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 15,
            }}>{isLogin ? 'Create an account' : 'Sign in instead'}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', suffix }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{
        fontSize: 11, color: BRAND.muted, letterSpacing: '0.06em',
        textTransform: 'uppercase', fontFamily: 'ui-monospace, monospace',
      }}>{label}</span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#fff', borderRadius: 14, padding: '14px 16px',
        boxShadow: '0 4px 12px -10px rgba(0,0,0,0.15)',
      }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'DM Sans, sans-serif', fontSize: 15,
            letterSpacing: '-0.02em', color: BRAND.ink,
          }}/>
        {suffix}
      </div>
    </label>
  );
}

function SocialBtn({ label, icon }) {
  return (
    <button style={{
      width: '100%', padding: '14px 18px', borderRadius: 14,
      background: '#fff', border: `1px solid ${BRAND.line}`,
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, fontFamily: 'DM Sans, sans-serif', fontSize: 14,
      color: BRAND.ink, letterSpacing: '-0.02em',
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: BRAND.cream, fontFamily: 'Instrument Serif, serif',
        fontStyle: 'italic', fontSize: 14, color: BRAND.forest,
      }}>{icon}</span>
      {label}
    </button>
  );
}

Object.assign(window, { AuthScreen });
