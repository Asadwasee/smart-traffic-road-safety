import { BrowserRouter, Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
//import TrafficMapSection from './components/TrafficMapSection'
import RoadSafetyPage  from './pages/RoadSafetyPage'
import RouteSuggestion from './pages/RouteSuggestion'
import Hero            from './components/Hero'
=======
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TrafficMapSection from './components/TrafficMapSection'
import RoadSafetyPage from './pages/RoadSafetyPage'
import RouteSuggestion from './pages/RouteSuggestion';
import Hero from './components/Hero';
>>>>>>> b45b1caf05f4839a61fdb4f910da7dd5b3fce1d5

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
<<<<<<< HEAD
      <Navbar />

      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/traffic"    element={<TrafficMapSection />} />
        <Route path="/routes"     element={<RouteSuggestion />} />
=======
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic" element={<TrafficMapSection />} />
        <Route path="/routes" element={<RouteSuggestion />} />
>>>>>>> b45b1caf05f4839a61fdb4f910da7dd5b3fce1d5
        <Route path="/road-safety" element={<RoadSafetyPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> b45b1caf05f4839a61fdb4f910da7dd5b3fce1d5
}

export default App