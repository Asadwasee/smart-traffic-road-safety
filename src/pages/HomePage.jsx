import Hero from "../components/Hero";
import TrafficMapSection from "../components/TrafficMapSection";
import RouteSuggestion from "./RouteSuggestion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <Hero />
      <TrafficMapSection />
      <RouteSuggestion />
    </div>
  );
}
