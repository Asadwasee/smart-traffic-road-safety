import Navbar from '../components/Navbar'
import RouteSuggestion from './RouteSuggestion'
import Footer from '../components/Footer'

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <RouteSuggestion />
      <Footer />
    </div>
  )
}
