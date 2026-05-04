import { useRef, useState, useEffect } from 'react';

export default function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]') || null;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } });
    }, { root, threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 700ms ${delay}ms cubic-bezier(.2,.7,.2,1), transform 700ms ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      ...style,
    }}>
      {children}
    </div>
  );
}
