import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrafficMapSection from '../components/TrafficMapSection'
import RouteSuggestion from './RouteSuggestion'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <TrafficMapSection />
      <RouteSuggestion />
      <Footer />
    </div>
  )
}
