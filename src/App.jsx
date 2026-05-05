import { useState, useCallback } from 'react';
import { BRAND } from './brand';
import { startPrice } from './data/menu';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import SideDrawer from './components/SideDrawer';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AICoachScreen from './screens/AICoachScreen';
import PermissionsScreen from './screens/PermissionsScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import AuthScreen from './screens/AuthScreen';
import TrackingScreen from './screens/TrackingScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import SettingsScreen from './screens/SettingsScreen';
import RepeatOrdersScreen from './screens/RepeatOrdersScreen';

const FLOW_SCREENS = new Set(['splash', 'onboarding', 'ai-coach', 'permissions']);
const APP_NAV_SCREENS = new Set(['home', 'menu']);
const SOLID_HEADER_SCREENS = new Set(['home', 'profile', 'orders', 'settings', 'repeat']);

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [userProfile, setUserProfile] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [authMode, setAuthMode] = useState('login');

  const [cart, setCart] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [bagPing, setBagPing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isAuthed = !!(userProfile && userProfile.goal);

  const goto = useCallback((s, id = null) => {
    if (s === 'item') {
      setActiveItemId(id);
      setScreen('item');
    } else {
      setScreen(s);
    }
  }, []);

  const addToCart = useCallback((m, qty = 1, variant) => {
    const v = variant || (m.cat === 'premium' ? 'veg' : 'std');
    const price = m.cat === 'premium'
      ? (v === 'veg' ? m.veg : m.nonVeg)
      : startPrice(m);
    setCart(prev => {
      const existing = prev.find(i => i.id === m.id && i.variant === v);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        lineId: `${m.id}-${v}-${Date.now()}`,
        id: m.id, name: m.name, tone: m.tone,
        variant: v, qty, price,
      }];
    });
    setBagPing(true);
    setTimeout(() => setBagPing(false), 350);
  }, []);

  const removeItem = useCallback((lineId) => {
    setCart(prev => prev.filter(i => i.lineId !== lineId));
  }, []);

  const setQty = useCallback((lineId, qty) => {
    setCart(prev => prev
      .map(i => i.lineId === lineId ? { ...i, qty } : i)
      .filter(i => i.qty > 0));
  }, []);

  const resetCart = useCallback(() => setCart([]), []);

  const handlePhoneSubmit = useCallback((phone) => {
    setUserProfile({ phone });
    setScreen('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback((answers) => {
    const cleanName = typeof answers.name === 'string' ? answers.name.trim() : '';
    setUserProfile(prev => ({
      ...prev,
      ...answers,
      name: cleanName || prev?.name || 'You',
    }));
    setScreen('ai-coach');
  }, []);

  const handleCoachComplete = useCallback(() => setScreen('permissions'), []);
  const handlePermissionsComplete = useCallback(() => setScreen('home'), []);

  const handleAuth = useCallback((data) => {
    setUserProfile(prev => ({ ...(prev || {}), ...data }));
  }, []);

  const handleScroll = useCallback((e) => {
    setScrolled(e.currentTarget.scrollTop > 24);
  }, []);

  const handleCheckout = useCallback(() => {
    setBagOpen(false);
    setScreen('track');
  }, []);

  const handleLogout = useCallback(() => {
    setUserProfile(null);
    setCart([]);
    setDrawerOpen(false);
    setScreen('splash');
  }, []);

  const handleDrawerSelect = useCallback((id) => {
    setDrawerOpen(false);
    if (id === 'profile') setScreen('profile');
    else if (id === 'orders') setScreen('orders');
    else if (id === 'track') setScreen('track');
    else if (id === 'repeat') setScreen('repeat');
    else if (id === 'settings') setScreen('settings');
  }, []);

  const isFlow = FLOW_SCREENS.has(screen);
  const showHeader = !isFlow && screen !== 'item' && screen !== 'auth' && screen !== 'track';
  const solidHeader = SOLID_HEADER_SCREENS.has(screen) && isAuthed;
  const showBottomNav = !isFlow && APP_NAV_SCREENS.has(screen);

  let content;
  switch (screen) {
    case 'splash':
      content = <SplashScreen onPhoneSubmit={handlePhoneSubmit} />;
      break;
    case 'onboarding':
      content = (
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onBack={() => setScreen('splash')} />
      );
      break;
    case 'ai-coach':
      content = (
        <AICoachScreen
          userProfile={userProfile}
          onComplete={handleCoachComplete} />
      );
      break;
    case 'permissions':
      content = <PermissionsScreen onComplete={handlePermissionsComplete} />;
      break;
    case 'home':
      content = isAuthed
        ? <DashboardScreen userProfile={userProfile} goto={goto} addToCart={addToCart} />
        : <HomeScreen goto={goto} addToCart={addToCart} onScroll={handleScroll} />;
      break;
    case 'menu':
      content = (
        <MenuScreen
          goto={goto}
          addToCart={addToCart}
          openItem={(id) => goto('item', id)} />
      );
      break;
    case 'item':
      content = (
        <ItemDetailScreen
          id={activeItemId}
          goto={goto}
          addToCart={addToCart} />
      );
      break;
    case 'auth':
      content = (
        <AuthScreen
          mode={authMode}
          goto={(s) => {
            if (s === 'login' || s === 'signup') { setAuthMode(s); return; }
            setScreen(s);
          }}
          onAuth={handleAuth} />
      );
      break;
    case 'track':
      content = (
        <TrackingScreen goto={goto} cart={cart} resetCart={resetCart} />
      );
      break;
    case 'profile':
      content = <ProfileScreen userProfile={userProfile} goto={goto} />;
      break;
    case 'orders':
      content = <OrdersScreen goto={goto} addToCart={addToCart} />;
      break;
    case 'settings':
      content = <SettingsScreen goto={goto} onLogout={handleLogout} />;
      break;
    case 'repeat':
      content = <RepeatOrdersScreen goto={goto} addToCart={addToCart} />;
      break;
    default:
      content = <HomeScreen goto={goto} addToCart={addToCart} onScroll={handleScroll} />;
  }

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: BRAND.forestDeep,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 460, height: '100%', maxHeight: 920,
        background: BRAND.cream, overflow: 'hidden',
        boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)',
        borderRadius: typeof window !== 'undefined' && window.innerWidth > 480 ? 36 : 0,
      }}>
        {showHeader && (
          <Header
            scrolled={scrolled}
            solid={solidHeader}
            onMenuClick={() => setDrawerOpen(true)}
            onBagClick={() => setBagOpen(true)}
            onLogoClick={() => goto('home')}
            onAccountClick={() => {
              if (isAuthed) setScreen('profile');
              else { setAuthMode('login'); setScreen('auth'); }
            }}
            cartCount={cartCount}
            bagPing={bagPing}
            user={userProfile && userProfile.name ? { name: userProfile.name } : null}
          />
        )}

        <div style={{ position: 'absolute', inset: 0 }}>
          {content}
        </div>

        {showBottomNav && (
          <BottomNav
            screen={screen}
            goto={goto}
            onBag={() => setBagOpen(true)}
            cartCount={cartCount} />
        )}

        <CartDrawer
          open={bagOpen}
          onClose={() => setBagOpen(false)}
          cart={cart}
          removeItem={removeItem}
          setQty={setQty}
          goto={goto}
          onCheckout={handleCheckout} />

        <SideDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSelect={handleDrawerSelect}
          onLogout={isAuthed ? handleLogout : null}
          user={userProfile}
        />
      </div>
    </div>
  );
}
