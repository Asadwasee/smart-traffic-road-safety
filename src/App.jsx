import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TrafficMapSection from './components/TrafficMapSection'
import RoadSafetyPage from './pages/RoadSafetyPage'
import RouteSuggestion from './pages/RouteSuggestion';
import Hero from './components/Hero';

function HomePage() {
  return (
    <div className="bg-slate-950 text-white">
      <Hero />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic" element={<TrafficMapSection />} />
        <Route path="/routes" element={<RouteSuggestion />} />
        <Route path="/road-safety" element={<RoadSafetyPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
