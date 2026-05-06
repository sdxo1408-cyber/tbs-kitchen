// Home screen — editorial, photo-led
function HomeScreen({ goto, addToCart, scrolled, onScroll, sections }) {
  const ordered = sections || ['hero','about','built','featured','menu-cta','testimonial','footer'];
  return (
    <div onScroll={onScroll} data-scroll-root style={{
      height: '100%', overflowY: 'auto', overflowX: 'hidden',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, system-ui, sans-serif',
      letterSpacing: '-0.02em',
    }}>
      {/* spacer for status bar + nav */}
      <div style={{ height: 100 }} />

      {ordered.map((s) => {
        if (s === 'hero') return <HeroSection key={s} goto={goto} />;
        if (s === 'about') return <AboutSection key={s} />;
        if (s === 'built') return <BuiltForPeople key={s} />;
        if (s === 'featured') return <FeaturedMeals key={s} goto={goto} addToCart={addToCart} />;
        if (s === 'menu-cta') return <MenuCTA key={s} goto={goto} />;
        if (s === 'testimonial') return <TestimonialSection key={s} />;
        if (s === 'footer') return <FooterSection key={s} />;
        return null;
      })}
    </div>
  );
}

function HeroSection({ goto }) {
  // Animated text: each letter fades in
  const lines = [
    { text: 'Simplifying', italic: false },
    { text: 'Healthy', italic: true },
    { text: 'Eating.', italic: false, inline: true },
  ];
  return (
    <section style={{ padding: '24px 28px 40px', textAlign: 'center' }}>
      <Reveal>
        <div style={{
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 22, color: BRAND.forest, letterSpacing: '-0.02em',
          marginBottom: 28,
        }}>tbs kitchen</div>
      </Reveal>

      <h1 style={{
        margin: 0, fontFamily: 'DM Sans, system-ui, sans-serif',
        fontSize: 56, lineHeight: 0.98, fontWeight: 400,
        letterSpacing: '-0.05em', color: BRAND.ink,
      }}>
        <AnimatedWord text="Simplifying" delay={120} />
        <br/>
        <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>
          <AnimatedWord text="Healthy" delay={420} />
        </span>{' '}
        <AnimatedWord text="Eating." delay={780} />
      </h1>

      <Reveal delay={1100}>
        <p style={{
          margin: '22px 0 28px', fontSize: 14.5,
          color: BRAND.inkSoft, letterSpacing: '-0.03em',
        }}>One meal at a time.</p>

        <PillButton variant="forest" size="lg" onClick={() => goto('menu')}>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18 }}>
            Get Started
          </span>
          {Icon.arrow(14, '#fff')}
        </PillButton>
      </Reveal>

      <Reveal delay={1300} style={{ marginTop: 36 }}>
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 30px 50px -25px rgba(43,58,30,0.35)',
          aspectRatio: '4/5',
          background: BRAND.creamWarm,
        }}>
          <ImageSwap a="assets/photo-waffle.png" b="assets/photo-bowl.png" />
        </div>
      </Reveal>
    </section>
  );
}

function AnimatedWord({ text, delay = 0 }) {
  return (
    <span style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          animation: `tbs-rise 700ms cubic-bezier(.2,.7,.2,1) ${delay + i * 28}ms both`,
        }}>{ch}</span>
      ))}
    </span>
  );
}

// Press to swap between two photos
function ImageSwap({ a, b }) {
  const [showB, setShowB] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setShowB(true)} onMouseLeave={() => setShowB(false)}
      onTouchStart={() => setShowB(s => !s)}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}>
      <img src={a} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', transition: 'opacity 600ms ease',
        opacity: showB ? 0 : 1,
      }}/>
      <img src={b} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', transition: 'opacity 600ms ease',
        opacity: showB ? 1 : 0,
      }}/>
      <div style={{
        position: 'absolute', bottom: 14, left: 14,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)',
        padding: '6px 12px', borderRadius: 999, fontSize: 11,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: BRAND.forest, fontFamily: 'ui-monospace, monospace',
      }}>tap to peek</div>
    </div>
  );
}

function AboutSection() {
  return (
    <section style={{
      background: BRAND.forest, color: BRAND.cream,
      padding: '64px 32px', marginTop: 16,
      borderTopLeftRadius: 28, borderTopRightRadius: 28,
    }}>
      <Reveal>
        <h2 style={{
          margin: 0, textAlign: 'center',
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 56, fontWeight: 400, letterSpacing: '-0.02em',
        }}>About Us</h2>
      </Reveal>
      <Reveal delay={120}>
        <div style={{
          width: 36, height: 1, background: BRAND.cream, opacity: 0.4,
          margin: '18px auto 26px',
        }} />
      </Reveal>
      <Reveal delay={200}>
        <p style={{
          margin: '0 0 18px', fontSize: 14.5, lineHeight: 1.55,
          textAlign: 'center', color: 'rgba(240,241,230,0.85)', letterSpacing: '-0.02em',
        }}>
          We didn't start a food brand. We started a fight against the idea
          that eating healthy in India has to be boring, expensive, or guilt-ridden.
        </p>
        <p style={{
          margin: '0 0 18px', fontSize: 14.5, lineHeight: 1.55,
          textAlign: 'center', color: 'rgba(240,241,230,0.85)', letterSpacing: '-0.02em',
        }}>
          TBS Kitchen was born in Kanpur, out of a simple frustration: the
          healthy food options available to us were either tasteless "diet food"
          or overpriced imports designed for someone else's lifestyle.
        </p>
        <p style={{
          margin: 0, fontSize: 14.5, lineHeight: 1.55,
          textAlign: 'center', color: 'rgba(240,241,230,0.85)', letterSpacing: '-0.02em',
        }}>
          We wanted food that was actually <em style={{ fontFamily: 'Instrument Serif, serif' }}>good</em> —
          for your body and your taste buds — made fresh, every single day.
        </p>
      </Reveal>
    </section>
  );
}

function BuiltForPeople() {
  return (
    <section style={{
      background: BRAND.cream, padding: '56px 28px 40px',
    }}>
      <Reveal>
        <h2 style={{
          margin: '0 0 22px',
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em',
          color: BRAND.ink,
        }}>Built for<br/>people</h2>
      </Reveal>
      <Reveal delay={120}>
        <p style={{
          margin: '0 0 28px', fontSize: 14, lineHeight: 1.55,
          color: BRAND.inkSoft, letterSpacing: '-0.02em',
        }}>
          If you're someone who works hard, trains hard, or just wants to stop
          feeling terrible after every meal — TBS Kitchen is for you. Whether
          you're tracking macros, healing your gut, or just trying to eat better
          without the drama, you've got a meal here.
        </p>
      </Reveal>
      <Reveal delay={220}>
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 20px 40px -20px rgba(43,58,30,0.4)',
          aspectRatio: '4/5',
        }}>
          <img src="assets/photo-bowl.png" alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
          }}/>
        </div>
      </Reveal>
    </section>
  );
}

function FeaturedMeals({ goto, addToCart }) {
  const featured = MENU.filter(m => ['classic-buddha','green-thai','dessert-blueberry'].includes(m.id));
  return (
    <section style={{ padding: '40px 0 24px', background: BRAND.cream }}>
      <div style={{ padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
        <Reveal>
          <h2 style={{
            margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', color: BRAND.ink,
          }}>This week's<br/>favourites</h2>
        </Reveal>
        <Reveal delay={120}>
          <button onClick={() => goto('menu')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: BRAND.forest, fontSize: 13, letterSpacing: '-0.02em',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'DM Sans, sans-serif', padding: 0, paddingBottom: 4,
          }}>see all {Icon.arrow(12, BRAND.forest)}</button>
        </Reveal>
      </div>
      <div style={{
        display: 'flex', gap: 14, overflowX: 'auto',
        padding: '4px 28px 24px', scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
      }}>
        {featured.map((m, i) => (
          <Reveal key={m.id} delay={i * 80} style={{ scrollSnapAlign: 'start' }}>
            <FeaturedCard m={m} onOpen={() => goto('item', m.id)} onAdd={() => addToCart(m)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ m, onOpen, onAdd }) {
  return (
    <div onClick={onOpen} style={{
      width: 230, background: '#fff', borderRadius: 22,
      overflow: 'hidden', cursor: 'pointer',
      boxShadow: '0 10px 30px -18px rgba(43,58,30,0.35)',
      flexShrink: 0,
    }}>
      <div style={{ height: 180, position: 'relative' }}>
        <PhotoPlaceholder label={m.name.split(' ')[0]} height={180} tone={m.tone} />
        <button onClick={(e) => { e.stopPropagation(); onAdd(); }}
          style={{
            position: 'absolute', bottom: 10, right: 10,
            width: 36, height: 36, borderRadius: 999,
            background: BRAND.cream, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: BRAND.forest,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>{Icon.plus(16, BRAND.forest)}</button>
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 19, lineHeight: 1.1, color: BRAND.ink,
          letterSpacing: '-0.01em', marginBottom: 6,
        }}>{m.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: BRAND.muted, fontSize: 11.5, letterSpacing: '-0.02em' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {Icon.clock(11, BRAND.muted)} {m.time}m
          </span>
          <span style={{ width: 2, height: 2, background: BRAND.muted, borderRadius: 999 }} />
          <span>{m.kcal} kcal</span>
        </div>
        <div style={{
          marginTop: 10, fontFamily: 'DM Sans, sans-serif',
          fontSize: 14, color: BRAND.forest, letterSpacing: '-0.02em',
        }}>₹{startPrice(m)}</div>
      </div>
    </div>
  );
}

function MenuCTA({ goto }) {
  return (
    <section style={{
      margin: '24px 24px 32px',
      borderRadius: 24, padding: '36px 28px',
      background: BRAND.tomato, color: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <Reveal>
        <div style={{
          fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
          fontSize: 14, opacity: 0.85, marginBottom: 6,
        }}>the menu</div>
        <h3 style={{
          margin: '0 0 12px', fontFamily: 'DM Sans, sans-serif',
          fontSize: 30, lineHeight: 1, fontWeight: 400, letterSpacing: '-0.04em',
        }}>30+ meals.<br/>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>Zero compromise.</span>
        </h3>
        <p style={{
          margin: '0 0 22px', fontSize: 13.5, lineHeight: 1.5,
          color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em',
        }}>Bowls, wraps, subs, smoothies — every macro counted, every flavour earned.</p>
        <PillButton variant="cream" onClick={() => goto('menu')}>
          Browse the menu {Icon.arrow(13, BRAND.forest)}
        </PillButton>
      </Reveal>
      <div style={{
        position: 'absolute', right: -40, top: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
      }}/>
    </section>
  );
}

function TestimonialSection() {
  const quotes = [
    { q: 'I stopped dreading lunch. The buddha bowl is genuinely my favourite meal of the week.', a: 'Aanya, gym-goer' },
    { q: 'Finally a healthy meal that does not taste like punishment. The schezwan paneer is unreal.', a: 'Rohan, software engineer' },
    { q: 'My PT swears by the anabolic chicken. He was right.', a: 'Meera, training for a marathon' },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{
      background: BRAND.blush, padding: '56px 32px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <Reveal>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.6, marginBottom: 24,
        }}>— what people say —</div>
      </Reveal>
      <div style={{ position: 'relative', minHeight: 180 }}>
        {quotes.map((q, idx) => (
          <div key={idx} style={{
            position: 'absolute', inset: 0,
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}>
            <p style={{
              margin: 0, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
              fontSize: 26, lineHeight: 1.25, color: BRAND.ink, letterSpacing: '-0.01em',
            }}>"{q.q}"</p>
            <div style={{
              marginTop: 18, fontSize: 12,
              color: BRAND.inkSoft, letterSpacing: '-0.02em',
            }}>{q.a}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 24 }}>
        {quotes.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            style={{
              width: idx === i ? 22 : 6, height: 6, borderRadius: 999,
              background: idx === i ? BRAND.forest : 'rgba(43,58,30,0.25)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 300ms ease',
            }}/>
        ))}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer style={{
      background: BRAND.forestDeep, color: BRAND.cream,
      padding: '48px 28px 50px',
    }}>
      <div style={{
        fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
        fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.02em',
        marginBottom: 30,
      }}>tbs<br/>kitchen.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <FooterCol title="Eat" links={['The Menu','Bowls','Wraps','Subs','Desserts']} />
        <FooterCol title="Brand" links={['About','Our kitchen','Careers','Press']} />
        <FooterCol title="Help" links={['FAQ','Delivery','Contact']} />
        <FooterCol title="Follow" links={['Instagram','TikTok','WhatsApp']} />
      </div>
      <div style={{
        paddingTop: 22, borderTop: '1px solid rgba(240,241,230,0.15)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, color: 'rgba(240,241,230,0.5)', letterSpacing: '-0.01em',
      }}>
        <span>© 2026 TBS Kitchen</span>
        <span>Made in Kanpur</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(240,241,230,0.5)', marginBottom: 12,
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(l => (
          <span key={l} style={{ fontSize: 13, letterSpacing: '-0.02em', cursor: 'pointer' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
