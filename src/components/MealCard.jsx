import { useState } from 'react'
import './MealCard.css'

export default function MealCard({ name, photo, protein, fat, carbs, kcal, price }) {
  const [qty, setQty] = useState(0)

  const add = () => setQty(q => q + 1)
  const sub = () => setQty(q => Math.max(0, q - 1))

  return (
    <div className="meal-card">
      {photo
        ? <img className="meal-card-photo" src={photo} alt={name} />
        : (
          <div className="meal-card-photo-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )
      }

      <div className="meal-card-body">
        <h3 className="meal-card-name">{name}</h3>

        <div className="meal-card-divider" />

        {/* Macros — single row */}
        <div className="meal-card-macros">
          <div className="macro">
            <span className="macro-label">P</span>
            <span className="macro-value">{protein}<span>g</span></span>
          </div>
          <div className="macro-sep" />
          <div className="macro">
            <span className="macro-label">F</span>
            <span className="macro-value">{fat}<span>g</span></span>
          </div>
          <div className="macro-sep" />
          <div className="macro">
            <span className="macro-label">C</span>
            <span className="macro-value">{carbs}<span>g</span></span>
          </div>
          <div className="macro-sep" />
          <div className="macro macro--kcal">
            <span className="macro-label">Kcal</span>
            <span className="macro-value">{kcal}</span>
          </div>
        </div>

        <div className="meal-card-divider" />

        {/* Price + Cart */}
        <div className="meal-card-footer">
          <span className="meal-price">₹{price}</span>

          {qty === 0 ? (
            <button className="btn-add-cart" onClick={add}>Add to cart</button>
          ) : (
            <div className="qty-widget">
              <button className="qty-btn" onClick={sub} aria-label="Remove one">−</button>
              <span className="qty-count">{qty}</span>
              <button className="qty-btn" onClick={add} aria-label="Add one">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
