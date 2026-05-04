import { useState } from 'react';
import './index.css';
import { BRAND } from './brand';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import AuthScreen from './screens/AuthScreen';
import TrackingScreen from './screens/TrackingScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
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
  const checkout = () => { setCartOpen(false); setScreen('track'); };
  const resetCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const showHeader = !['item', 'login', 'signup', 'track'].includes(screen);
  const showBottomNav = screen === 'home' || screen === 'menu';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0',
    }}>
      {/* Mobile viewport container */}
      <div style={{
        width: '100%',
        maxWidth: 430,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: BRAND.cream,
        boxShadow: '0 0 80px rgba(0,0,0,0.12)',
      }}>
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

        <div key={screen} style={{
          position: 'absolute', inset: 0,
          animation: 'tbs-screen-in 400ms cubic-bezier(.2,.7,.2,1) both',
        }}>
          {screen === 'home' && (
            <HomeScreen
              goto={goto}
              addToCart={addToCart}
              onScroll={e => setScrolled(e.target.scrollTop > 30)}
            />
          )}
          {screen === 'menu' && (
            <MenuScreen goto={goto} addToCart={addToCart} openItem={id => goto('item', id)} />
          )}
          {screen === 'item' && (
            <ItemDetailScreen id={itemId} goto={goto} addToCart={addToCart} />
          )}
          {screen === 'login' && (
            <AuthScreen mode="login" goto={goto} onAuth={setUser} />
          )}
          {screen === 'signup' && (
            <AuthScreen mode="signup" goto={goto} onAuth={setUser} />
          )}
          {screen === 'track' && (
            <TrackingScreen goto={goto} cart={cart} resetCart={resetCart} />
          )}
        </div>

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
          <BottomNav
            screen={screen}
            goto={goto}
            onBag={() => setCartOpen(true)}
            cartCount={cartCount}
            user={user}
          />
        )}
      </div>
    </div>
  );
}
