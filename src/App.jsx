import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrafficMapSection from './components/TrafficMapSection';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <TrafficMapSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
