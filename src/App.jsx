import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TrafficMapSection from './components/TrafficMapSection'
import RoadSafetyPage from './pages/RoadSafetyPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <TrafficMapSection />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/road-safety" element={<RoadSafetyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
