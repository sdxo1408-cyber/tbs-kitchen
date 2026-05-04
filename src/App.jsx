import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import MealCard from './components/MealCard'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

const meals = [
  {
    id: 1,
    name: 'Grilled Chicken Bowl',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    protein: 42,
    fat: 11,
    carbs: 38,
    kcal: 420,
    price: 349,
  },
  {
    id: 2,
    name: 'Salmon & Quinoa',
    photo: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    protein: 36,
    fat: 18,
    carbs: 30,
    kcal: 430,
    price: 499,
  },
  {
    id: 3,
    name: 'Avocado Veggie Wrap',
    photo: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
    protein: 14,
    fat: 22,
    carbs: 52,
    kcal: 460,
    price: 279,
  },
]

function HomePage() {
  return (
    <div style={{ background: '#F7F5F0', minHeight: '100vh' }}>
      <NavBar cartCount={2} />
      <HeroSection />
      <main style={{ padding: '3rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {meals.map(meal => (
          <MealCard key={meal.id} {...meal} />
        ))}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}
