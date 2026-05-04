import { useState } from 'react';
import { BRAND } from '../brand';
import { MENU, CATEGORIES, FILTERS, startPrice } from '../data/menu';
import { Icon } from '../components/Icons';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

function MenuRow({ m, onOpen, onAdd }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      style={{
        display: 'flex', gap: 12, padding: 10, borderRadius: 18,
        background: hover ? '#fff' : 'transparent', cursor: 'pointer',
        transition: 'all 200ms ease',
        boxShadow: hover ? '0 10px 24px -16px rgba(43,58,30,0.3)' : 'none',
      }}>
      <div style={{ width: 88, height: 88, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
        <PhotoPlaceholder label="" height={88} tone={m.tone} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            fontFamily: 'Instrument Serif, serif', fontStyle: 'italic',
            fontSize: 18, lineHeight: 1.1, color: BRAND.ink, letterSpacing: '-0.01em',
          }}>{m.name}</div>
          <div style={{
            marginTop: 4, fontSize: 11.5, color: BRAND.inkSoft,
            letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{m.blurb}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: BRAND.muted, fontSize: 11, letterSpacing: '-0.01em' }}>
          {m.tags.includes('high-protein') && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: BRAND.tomato }}>
              {Icon.flame(10, BRAND.tomato)} protein
            </span>
          )}
          <span>{m.kcal} kcal</span>
          <span>· {m.time} min</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: BRAND.forest, letterSpacing: '-0.02em', fontWeight: 500 }}>
          ₹{startPrice(m)}
        </div>
        <button onClick={e => { e.stopPropagation(); onAdd(); }}
          style={{
            width: 32, height: 32, borderRadius: 999,
            background: BRAND.forest, color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>{Icon.plus(14, '#fff')}</button>
      </div>
    </div>
  );
}

export default function MenuScreen({ goto, addToCart, openItem }) {
  const [cat, setCat] = useState('all');
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState('');

  const toggleFilter = (id) => {
    setFilters(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const filtered = MENU.filter(m => {
    if (cat !== 'all' && m.cat !== cat) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    for (const f of filters) {
      if (f === 'low-cal') { if (m.kcal >= 500) return false; }
      else if (f === 'veg') { /* all items have veg variants */ }
      else if (!m.tags.includes(f)) return false;
    }
    return true;
  });

  return (
    <div data-scroll-root style={{
      height: '100%', overflowY: 'auto',
      background: BRAND.cream, color: BRAND.ink,
      fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em',
    }}>
      <div style={{ height: 80 }} />

      <div style={{ padding: '12px 24px 18px' }}>
        <div style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: BRAND.forest, opacity: 0.55, marginBottom: 6,
        }}>the menu</div>
        <h1 style={{
          margin: 0, fontFamily: 'DM Sans, sans-serif',
          fontSize: 44, lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.05em',
          color: BRAND.ink,
        }}>Eat <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>well</span>,<br />every day.</h1>
      </div>

      <div style={{ padding: '0 24px 14px' }}>
        <div style={{
          background: '#fff', borderRadius: 999,
          padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center',
          boxShadow: '0 6px 14px -10px rgba(0,0,0,0.15)',
        }}>
          {Icon.search(16, BRAND.muted)}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search bowls, wraps, smoothies…"
            style={{
              border: 'none', outline: 'none', flex: 1, background: 'transparent',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14,
              letterSpacing: '-0.02em', color: BRAND.ink,
            }} />
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        padding: '4px 24px 14px', scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{
              padding: '10px 16px', borderRadius: 999, flexShrink: 0,
              background: cat === c.id ? BRAND.forest : 'transparent',
              color: cat === c.id ? '#fff' : BRAND.forest,
              border: cat === c.id ? 'none' : `1px solid ${BRAND.line}`,
              fontFamily: 'DM Sans, sans-serif', fontSize: 13,
              letterSpacing: '-0.02em', cursor: 'pointer',
              transition: 'all 200ms ease',
            }}>{c.label}</button>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        padding: '0 24px 18px', scrollbarWidth: 'none',
      }}>
        {FILTERS.map(f => {
          const on = filters.includes(f.id);
          return (
            <button key={f.id} onClick={() => toggleFilter(f.id)}
              style={{
                padding: '8px 12px', borderRadius: 999, flexShrink: 0,
                background: on ? BRAND.tomato : '#fff',
                color: on ? '#fff' : BRAND.forest,
                border: 'none', fontFamily: 'DM Sans, sans-serif',
                fontSize: 12, letterSpacing: '-0.02em', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 5,
                transition: 'all 200ms ease',
              }}>
              {f.icon === 'flame' && Icon.flame(11, on ? '#fff' : BRAND.forest)}
              {f.icon === 'leaf' && Icon.leaf(11, on ? '#fff' : BRAND.forest)}
              {f.label}
              {on && Icon.close(10, '#fff')}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '4px 24px 12px', fontSize: 12, color: BRAND.muted, letterSpacing: '-0.01em' }}>
        <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 14 }}>{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'meal' : 'meals'} ready to order
      </div>

      <div style={{ padding: '0 18px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '48px 20px', textAlign: 'center',
            color: BRAND.muted, fontFamily: 'Instrument Serif, serif',
            fontStyle: 'italic', fontSize: 22,
          }}>Nothing matches. Try fewer filters.</div>
        ) : (
          filtered.map(m => (
            <MenuRow key={m.id} m={m} onOpen={() => openItem(m.id)} onAdd={() => addToCart(m)} />
          ))
        )}
      </div>
    </div>
  );
}
