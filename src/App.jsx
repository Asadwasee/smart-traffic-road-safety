import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import RouteSuggestion from './pages/RouteSuggestion';
// Other team members' sections will be imported here by Asad:
// import HeroSection   from './pages/HeroSection';       // Fasiullah
// import TrafficMap    from './pages/TrafficMap';         // Shoaib
// import SafetyTips    from './pages/SafetyTips';         // Umer
// import EmergencySection from './pages/EmergencySection'; // Abdullah

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <main>
        {/* ── HERO (Fasiullah's section) ── */}
        <section id="hero" className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-bold">Smart Traffic System</h1>
        </section>

        {/* ── TRAFFIC MAP (Shoaib's section) ── */}
        {/* <TrafficMap /> */}

        {/* ── SMART ROUTE SUGGESTION (Junaid's section) ── */}
        <RouteSuggestion />

        {/* ── SAFETY TIPS (Umer's section) ── */}
        {/* <SafetyTips /> */}

        {/* ── EMERGENCY (Abdullah's section) ── */}
        {/* <EmergencySection /> */}
      </main>

      <Footer />
    </div>
  );
}

export default App;