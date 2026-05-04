import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )
}

export default function NavBar({ cartCount = 0 }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-tbs">tbs</span>
          <span className="logo-kitchen">kitchen</span>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="cart-btn" aria-label="View cart">
            <CartIcon />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          <button
            className="hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`menu-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide panel */}
      <aside className={`menu-panel${open ? ' open' : ''}`} aria-label="Navigation menu">
        <button
          className="menu-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="panel-logo">
          <span className="logo-tbs">tbs</span>
          <span className="logo-kitchen">kitchen</span>
        </div>

        <nav className="menu-links">
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <div className="menu-divider" />

        <div className="menu-auth">
          <button className="btn-login" onClick={() => { setOpen(false); navigate('/login') }}>Log in</button>
          <button className="btn-signup" onClick={() => { setOpen(false); navigate('/signup') }}>Sign up</button>
        </div>
      </aside>
    </>
  )
}
