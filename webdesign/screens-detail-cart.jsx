// Item detail + Cart drawer
function ItemDetailScreen({ id, goto, addToCart }) {
  const m = MENU.find(x => x.id === id) || MENU[0];
  const isPremium = m.cat === 'premium';
  const [variant, setVariant] = React.useState(isPremium ? 'veg' : 'std');
  const [qty, setQty] = React.useState(1);
  const price = isPremium ? (variant === 'veg' ? m.veg : m.nonVeg) : m.price;

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
    }}>
      {/* Hero photo */}
      <div style={{ position: 'relative', height: 380 }}>
        <PhotoPlaceholder label={m.name} tone={m.tone} height={380} />
        <button onClick={() => goto('menu')} style={{
          position: 'absolute', top: 60, left: 18,
          width: 38, height: 38, borderRadius: 999,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.back(16, BRAND.forest)}</button>
      </div>

      {/* Sheet */}
      <div style={{
        marginTop: -28, background: BRAND.cream,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '24px 24px 140px', position: 'relative',
      }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 8,
        }}>{m.cat === 'premium' ? 'premium bowl' : m.cat === 'basic' ? 'basic meal' : m.cat}</div>
        <h1 style={{
          margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 40, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.02em',
          color: BRAND.ink,
        }}>{m.name}</h1>
        <p style={{
          margin: '14px 0 18px', fontSize: 14, lineHeight: 1.55,
          color: BRAND.inkSoft, letterSpacing: '-0.02em',
        }}>{m.blurb}</p>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          background: '#fff', borderRadius: 18, padding: 16, marginBottom: 22,
        }}>
          <Stat label="Calories" value={`${m.kcal}`} unit="kcal" />
          <Stat label="Ready in" value={`${m.time}`} unit="min" />
          <Stat label="Made" value="fresh" unit="daily" italic />
        </div>

        {/* Variant picker (premium only) */}
        {isPremium && (
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontFamily: 'ui-monospace, monospace', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: BRAND.forest, opacity: 0.55, marginBottom: 10,
            }}>choose your protein</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'veg', label: 'Vegetarian', price: m.veg },
                { id: 'nonVeg', label: 'Non-Veg', price: m.nonVeg },
              ].map(v => {
                const on = variant === v.id;
                return (
                  <button key={v.id} onClick={() => setVariant(v.id)}
                    style={{
                      flex: 1, padding: '14px 14px', borderRadius: 14,
                      background: on ? BRAND.forest : '#fff',
                      color: on ? BRAND.cream : BRAND.ink, border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 200ms ease',
                    }}>
                    <div style={{ fontSize: 13, letterSpacing: '-0.02em' }}>{v.label}</div>
                    <div style={{
                      marginTop: 4, fontFamily: 'Instrument Serif, serif',
                      fontStyle: 'italic', fontSize: 18,
                      color: on ? BRAND.cream : BRAND.forest,
                    }}>₹{v.price}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {m.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 26 }}>
            {m.tags.map(t => (
              <span key={t} style={{
                padding: '6px 12px', borderRadius: 999,
                background: BRAND.blush, color: BRAND.forest,
                fontSize: 11, letterSpacing: '-0.01em',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>{Icon.check(10, BRAND.forest)} {t.replace('-',' ')}</span>
            ))}
          </div>
        )}

        {/* What's inside */}
        <div style={{ marginBottom: 26 }}>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 22, marginBottom: 12, color: BRAND.ink,
          }}>What's inside</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ingredientsFor(m).map(ing => (
              <div key={ing} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 13.5, color: BRAND.inkSoft,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: BRAND.forest, opacity: 0.4 }} />
                {ing}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        background: BRAND.cream,
        padding: '14px 18px 36px',
        boxShadow: '0 -10px 30px -20px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', borderRadius: 999, padding: 4,
        }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            style={{ width: 32, height: 32, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.forest }}>
            {Icon.minus(14, BRAND.forest)}
          </button>
          <div style={{ minWidth: 18, textAlign: 'center', fontSize: 14, color: BRAND.ink }}>{qty}</div>
          <button onClick={() => setQty(q => q + 1)}
            style={{ width: 32, height: 32, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.forest }}>
            {Icon.plus(14, BRAND.forest)}
          </button>
        </div>
        <button onClick={() => { addToCart(m, qty, variant); goto('menu'); }}
          style={{
            flex: 1, padding: '14px 18px', borderRadius: 999,
            background: BRAND.forest, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, letterSpacing: '-0.02em' }}>
            Add to bag
          </span>
          <span style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 18, color: BRAND.cream,
          }}>₹{price * qty}</span>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, unit, italic }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: italic ? 'Instrument Serif, serif' : 'DM Sans, sans-serif',
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: 22, color: BRAND.ink, lineHeight: 1, letterSpacing: '-0.03em',
      }}>{value}</div>
      <div style={{ marginTop: 4, fontSize: 10, color: BRAND.muted, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
        {label} {unit && <span style={{ opacity: 0.6 }}>{unit}</span>}
      </div>
    </div>
  );
}

function ingredientsFor(m) {
  // simple deterministic ingredient list per item id
  const map = {
    'classic-buddha': ['Tri-color quinoa', 'Roasted chickpeas', 'Tahini drizzle', 'Pickled red cabbage', 'Baby spinach', 'Toasted seeds'],
    'mexican-burrito': ['Cilantro lime rice', 'Black beans', 'Charred sweet corn', 'Avocado crema', 'Pico de gallo', 'Crisp lettuce'],
    'hawaiian-pro': ['Brown rice', 'Grilled pineapple', 'Edamame', 'Ginger soy glaze', 'Carrot ribbons', 'Sesame'],
    'indian-curry': ['Slow-cooked masala', 'Basmati rice', 'House raita', 'Toasted cumin', 'Coriander', 'Onion lachha'],
    'baked-shakshuka': ['Cherry tomato base', 'Smoked paprika', 'Herbed labneh', 'Sourdough toast', 'Soft eggs (or paneer)'],
    'grilled-salad': ['Grilled zucchini & peppers', 'Mixed leaves', 'Sunflower seeds', 'Lemon vinaigrette', 'Crumbled feta'],
    'green-thai': ['Coconut basil curry', 'Jasmine rice', 'Baby corn & beans', 'Kaffir lime', 'Thai basil', 'Bird\'s eye chili'],
  };
  return map[m.id] || [
    'Fresh-cooked grains', 'House-made sauce', 'Seasonal vegetables', 'Slow-cooked protein', 'Herbs & spice blend',
  ];
}

// ─────────────────────────────────────────────────────────────
// Cart drawer
function CartDrawer({ open, onClose, cart, removeItem, setQty, goto, onCheckout }) {
  const items = cart;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length ? (subtotal > 500 ? 0 : 49) : 0;
  const total = subtotal + delivery;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 90,
        background: 'rgba(31,44,20,0.45)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 280ms ease',
      }}/>

      {/* Drawer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        zIndex: 100, height: '90%',
        background: BRAND.cream, color: BRAND.ink,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 380ms cubic-bezier(.2,.7,.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'center', padding: '10px 0 4px',
        }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'rgba(43,58,30,0.2)' }}/>
        </div>
        <div style={{
          padding: '8px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{
            margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em',
          }}>Your bag</h2>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'rgba(43,58,30,0.08)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.close(16, BRAND.forest)}</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 0' }}>
          {items.length === 0 ? (
            <div style={{
              padding: '60px 20px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                fontSize: 26, color: BRAND.ink, marginBottom: 10,
              }}>Your bag is empty.</div>
              <div style={{ fontSize: 13, color: BRAND.muted, marginBottom: 24 }}>
                Pick a meal — we'll do the rest.
              </div>
              <PillButton onClick={() => { onClose(); goto('menu'); }}>Browse menu</PillButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((i, idx) => (
                <div key={i.lineId} style={{
                  display: 'flex', gap: 12, padding: 10, borderRadius: 16,
                  background: '#fff',
                }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                    <PhotoPlaceholder height={64} tone={i.tone} label="" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
                      fontSize: 16, lineHeight: 1.1, color: BRAND.ink,
                    }}>{i.name}</div>
                    <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 3 }}>
                      {i.variant === 'veg' ? 'Vegetarian' : i.variant === 'nonVeg' ? 'Non-Veg' : 'Standard'}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        border: `1px solid ${BRAND.line}`, borderRadius: 999, padding: 2,
                      }}>
                        <button onClick={() => setQty(i.lineId, i.qty - 1)}
                          style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {Icon.minus(12, BRAND.forest)}
                        </button>
                        <div style={{ minWidth: 14, textAlign: 'center', fontSize: 12 }}>{i.qty}</div>
                        <button onClick={() => setQty(i.lineId, i.qty + 1)}
                          style={{ width: 24, height: 24, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {Icon.plus(12, BRAND.forest)}
                        </button>
                      </div>
                      <button onClick={() => removeItem(i.lineId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: BRAND.muted, display: 'inline-flex', alignItems: 'center' }}>
                        {Icon.trash(14, BRAND.muted)}
                      </button>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                    color: BRAND.forest, fontWeight: 500,
                  }}>₹{i.price * i.qty}</div>
                </div>
              ))}

              {/* Free delivery progress */}
              {subtotal < 500 && (
                <div style={{
                  margin: '6px 4px 0', padding: '12px 14px',
                  background: BRAND.blush, borderRadius: 14,
                  fontSize: 12, color: BRAND.ink, letterSpacing: '-0.01em',
                }}>
                  <div style={{ marginBottom: 6 }}>
                    Add <strong>₹{500 - subtotal}</strong> for <em style={{ fontFamily: 'Instrument Serif, serif' }}>free delivery</em>.
                  </div>
                  <div style={{ height: 4, background: 'rgba(43,58,30,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${Math.min(100, (subtotal / 500) * 100)}%`,
                      background: BRAND.forest, transition: 'width 400ms ease',
                    }}/>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 22px 32px', borderTop: `1px solid ${BRAND.line}`,
            background: BRAND.cream,
          }}>
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Delivery" value={delivery === 0 ? 'Free' : `₹${delivery}`} highlight={delivery === 0} />
            <Row label="Total" value={`₹${total}`} bold />
            <PillButton variant="forest" full size="lg" style={{ marginTop: 16 }} onClick={onCheckout}>
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>Place order · Track live</span>
              {Icon.arrow(14, '#fff')}
            </PillButton>
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value, bold, highlight }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0', fontSize: bold ? 16 : 13,
      color: bold ? BRAND.ink : BRAND.inkSoft,
      letterSpacing: '-0.02em',
    }}>
      <span>{label}</span>
      <span style={{
        fontFamily: bold ? 'Instrument Serif, serif' : 'DM Sans, sans-serif',
        fontStyle: bold ? 'italic' : 'normal',
        fontSize: bold ? 22 : 13,
        color: highlight ? BRAND.tomato : (bold ? BRAND.ink : BRAND.forest),
      }}>{value}</span>
    </div>
  );
}

Object.assign(window, { ItemDetailScreen, CartDrawer });
