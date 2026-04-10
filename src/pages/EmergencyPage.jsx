import Navbar from '../components/Navbar'
import EmergencySection from './EmergencySection'
import Footer from '../components/Footer'

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <EmergencySection />
      <Footer />
    </div>
  )
}
