// Main App — orchestrates screens + state + tweaks
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "forest",
  "headlineFont": "instrument-serif",
  "density": "airy"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // App state
  const [screen, setScreen] = useState('home'); // home | menu | item | login | signup | track
  const [itemId, setItemId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bagPing, setBagPing] = useState(false);
  const [user, setUser] = useState(null);

  const goto = (s, id) => {
    if (s === 'item') setItemId(id);
    setScreen(s);
    setCartOpen(false);
  };

  const addToCart = (m, qty = 1, variant) => {
    const v = variant ?? (m.cat === 'premium' ? 'veg' : 'std');
    const price = m.cat === 'premium' ? (v === 'veg' ? m.veg : m.nonVeg) : m.price;
    const lineId = `${m.id}-${v}`;
    setCart(c => {
      const existing = c.find(x => x.lineId === lineId);
      if (existing) return c.map(x => x.lineId === lineId ? { ...x, qty: x.qty + qty } : x);
      return [...c, { lineId, id: m.id, name: m.name, tone: m.tone, variant: v, price, qty }];
    });
    setBagPing(true);
    setTimeout(() => setBagPing(false), 600);
  };

  const removeItem = (lineId) => setCart(c => c.filter(x => x.lineId !== lineId));
  const setQty = (lineId, q) => {
    if (q <= 0) return removeItem(lineId);
    setCart(c => c.map(x => x.lineId === lineId ? { ...x, qty: q } : x));
  };
  const checkout = () => {
    setCartOpen(false);
    setScreen('track');
  };
  const resetCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const showHeader = screen !== 'item' && screen !== 'login' && screen !== 'signup' && screen !== 'track';
  const showBottomNav = screen === 'home' || screen === 'menu';

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(ellipse at top, #F0F1E6 0%, #E5E6D8 50%, #D9DACB 100%)`,
      padding: '32px 16px', boxSizing: 'border-box',
    }}>
      <IOSDevice width={402} height={874}>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          {showHeader && (
            <Header
              scrolled={scrolled}
              onMenuClick={() => goto(screen === 'menu' ? 'home' : 'menu')}
              onBagClick={() => setCartOpen(true)}
              onLogoClick={() => goto('home')}
              onAccountClick={() => goto(user ? 'home' : 'login')}
              user={user}
              cartCount={cartCount}
              bagPing={bagPing}
            />
          )}

          <ScreenSwitcher screen={screen}>
            {screen === 'home' && (
              <HomeScreen key="home" goto={goto} addToCart={addToCart}
                scrolled={scrolled} onScroll={(e) => setScrolled(e.target.scrollTop > 30)}/>
            )}
            {screen === 'menu' && (
              <MenuScreen key="menu" goto={goto} addToCart={addToCart} openItem={(id) => goto('item', id)}/>
            )}
            {screen === 'item' && (
              <ItemDetailScreen key="item" id={itemId} goto={goto} addToCart={addToCart}/>
            )}
            {screen === 'login' && (
              <AuthScreen key="login" mode="login" goto={goto} onAuth={setUser}/>
            )}
            {screen === 'signup' && (
              <AuthScreen key="signup" mode="signup" goto={goto} onAuth={setUser}/>
            )}
            {screen === 'track' && (
              <TrackingScreen key="track" goto={goto} cart={cart} resetCart={resetCart}/>
            )}
          </ScreenSwitcher>

          {bagPing && showBottomNav && (
            <div style={{
              position: 'absolute', top: 60, right: 22, zIndex: 80,
              animation: 'tbs-ping 600ms ease-out',
              pointerEvents: 'none',
              fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              color: BRAND.tomato, fontSize: 22,
            }}>+1</div>
          )}

          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            removeItem={removeItem}
            setQty={setQty}
            goto={goto}
            onCheckout={checkout}
          />

          {showBottomNav && (
            <BottomNav screen={screen} goto={goto} onBag={() => setCartOpen(true)}
              cartCount={cartCount} user={user}/>
          )}
        </div>
      </IOSDevice>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Look & feel">
          <TweakRadio label="Headline font" value={tweaks.headlineFont}
            onChange={(v) => setTweak('headlineFont', v)}
            options={[{ value: 'instrument-serif', label: 'Instrument' }, { value: 'dm-sans', label: 'DM Sans' }]}/>
          <TweakRadio label="Density" value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[{ value: 'airy', label: 'Airy' }, { value: 'tight', label: 'Tight' }]}/>
          <TweakRadio label="Accent" value={tweaks.primaryColor}
            onChange={(v) => setTweak('primaryColor', v)}
            options={[{ value: 'forest', label: 'Forest' }, { value: 'tomato', label: 'Tomato' }, { value: 'lavender', label: 'Lavender' }]}/>
        </TweakSection>
        <TweakSection title="Jump to screen">
          <TweakButton label="Home" onClick={() => goto('home')} />
          <TweakButton label="Menu" onClick={() => goto('menu')} />
          <TweakButton label="Login" onClick={() => goto('login')} />
          <TweakButton label="Sign up" onClick={() => goto('signup')} />
          <TweakButton label="Live tracking" onClick={() => goto('track')} />
          <TweakButton label="Open cart" onClick={() => setCartOpen(true)} />
          <TweakButton label="Reset cart" onClick={() => setCart([])} />
        </TweakSection>
      </TweaksPanel>

      <style>{`
        ${tweaks.headlineFont === 'dm-sans' ? `.tbs-italic-headline { font-family: 'DM Sans', sans-serif !important; font-style: normal !important; }` : ''}
        ${tweaks.density === 'tight' ? `section { padding-top: 32px !important; padding-bottom: 32px !important; }` : ''}
      `}</style>
    </div>
  );
}

// Header — morphing sticky
function Header({ scrolled, onMenuClick, onBagClick, onLogoClick, onAccountClick, cartCount, bagPing, user }) {
  return (
    <div style={{
      position: 'absolute', top: 47, left: 0, right: 0, zIndex: 70,
      padding: scrolled ? '8px 16px' : '12px 22px',
      transition: 'padding 280ms ease',
    }}>
      <div style={{
        background: scrolled ? 'rgba(240,241,230,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(180%)' : 'none',
        borderRadius: 999,
        padding: scrolled ? '10px 14px' : '8px 6px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: scrolled ? '0 6px 20px -10px rgba(43,58,30,0.2)' : 'none',
        transition: 'all 280ms ease',
      }}>
        <button onClick={onLogoClick} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: scrolled ? 18 : 22, color: BRAND.forest, letterSpacing: '-0.02em',
          transition: 'all 280ms ease',
        }}>tbs <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'normal', fontWeight: 500 }}>kitchen</span></button>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onAccountClick}
            title={user ? user.name : 'Sign in'}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: user ? BRAND.forest : 'transparent',
              color: user ? '#fff' : BRAND.forest,
              border: user ? 'none' : `1px solid ${BRAND.line}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: user ? 'Instrument Serif, serif' : 'inherit',
              fontStyle: user ? 'italic' : 'normal',
              fontSize: 16,
            }}>
            {user ? user.name[0].toUpperCase() : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.forest} strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-4 5-5.5 7-5.5s5.5 1.5 7 5.5"/>
              </svg>
            )}
          </button>
          <button onClick={onBagClick}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: cartCount > 0 ? BRAND.forest : 'transparent',
              color: cartCount > 0 ? '#fff' : BRAND.forest,
              border: cartCount > 0 ? 'none' : `1px solid ${BRAND.line}`,
              cursor: 'pointer', position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: bagPing ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 300ms ease, background 200ms ease',
            }}>
            {Icon.bag(16, cartCount > 0 ? '#fff' : BRAND.forest)}
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: -2, right: -2,
                background: BRAND.tomato, color: '#fff',
                fontSize: 10, fontWeight: 600,
                width: 16, height: 16, borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'DM Sans, sans-serif',
              }}>{cartCount}</div>
            )}
          </button>
          <button onClick={onMenuClick}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: 'transparent', color: BRAND.forest,
              border: `1px solid ${BRAND.line}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.menu(16, BRAND.forest)}</button>
        </div>
      </div>
    </div>
  );
}

function ScreenSwitcher({ children, screen }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div key={screen} style={{
        position: 'absolute', inset: 0,
        animation: 'tbs-screen-in 400ms cubic-bezier(.2,.7,.2,1) both',
      }}>{children}</div>
    </div>
  );
}

function BottomNav({ screen, goto, onBag, cartCount, user }) {
  const items = [
    { id: 'home', label: 'Home', icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-7h-6v7H5a1 1 0 0 1-1-1z"/>
      </svg>
    )},
    { id: 'menu', label: 'Menu', icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
        <path d="M5 7h14M5 12h14M5 17h10"/>
      </svg>
    )},
    { id: 'track', label: 'Track', icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>
      </svg>
    )},
    { id: 'bag', label: 'Bag', icon: (c) => Icon.bag(20, c) },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
      zIndex: 60,
      background: BRAND.forest, color: BRAND.cream,
      borderRadius: 999, padding: 5,
      display: 'flex', gap: 2,
      boxShadow: '0 12px 30px -10px rgba(31,44,20,0.4)',
      maxWidth: 'calc(100% - 40px)',
    }}>
      {items.map(it => {
        const active = screen === it.id;
        return (
          <button key={it.id}
            onClick={() => it.id === 'bag' ? onBag() : goto(it.id)}
            style={{
              padding: '9px 13px', borderRadius: 999, border: 'none',
              background: active ? BRAND.cream : 'transparent',
              color: active ? BRAND.forest : 'rgba(240,241,230,0.85)',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'DM Sans, sans-serif', fontSize: 12, letterSpacing: '-0.02em',
              position: 'relative',
              transition: 'all 200ms ease',
            }}>
            {it.icon(active ? BRAND.forest : 'rgba(240,241,230,0.85)')}
            <span>{it.label}</span>
            {it.id === 'bag' && cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 4,
                background: BRAND.tomato, color: '#fff',
                fontSize: 9, fontWeight: 600,
                minWidth: 14, height: 14, borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px',
              }}>{cartCount}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
