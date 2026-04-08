import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TrafficMapSection from './components/TrafficMapSection'
import RoadSafetyPage from './pages/RoadSafetyPage'
import RouteSuggestion from './pages/RouteSuggestion';


function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main>
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-24 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Road Safety Tips
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Stay safe on the road with our comprehensive guide to road safety
              tips and precautions.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
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