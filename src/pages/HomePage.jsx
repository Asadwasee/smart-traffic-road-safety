import Hero from "../components/Hero";
import TrafficMapSection from "../components/TrafficMapSection";
import RouteSuggestion from "./RouteSuggestion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <TrafficMapSection />
      <RouteSuggestion />
    </div>
  );
}
