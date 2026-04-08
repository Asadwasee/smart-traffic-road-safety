import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from "./pages/HomePage";
import TrafficMapSection from "./components/TrafficMapSection";
import EmergencyPage from "./pages/EmergencyPage";
import RoadSafetyPage from "./pages/RoadSafetyPage";
import RoutesPage from "./pages/RoutesPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic" element={<TrafficMapSection />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/road-safety" element={<RoadSafetyPage />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;