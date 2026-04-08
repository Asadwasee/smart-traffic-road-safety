import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Pages
import HomePage from './pages/HomePage'
import EmergencyPage from './pages/EmergencyPage'
import RoadSafetyPage from './pages/RoadSafetyPage'
import RoutesPage from './pages/RoutesPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/road-safety" element={<RoadSafetyPage />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Routes>
    </Router>
  )
}

export default App
