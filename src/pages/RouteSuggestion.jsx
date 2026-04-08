import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import RouteForm    from "../components/route/RouteForm";
import AnimatedPath from "../components/route/AnimatedPath";
import RouteResult  from "../components/route/RouteResult";
import { findRoute } from "../utils/routeUtils";

export default function RouteSuggestion() {
  const [route,      setRoute]      = useState(null);
  const [from,       setFrom]       = useState("");
  const [to,         setTo]         = useState("");
  const [isLoading,  setIsLoading]  = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (startLoc, destLoc) => {
    setIsLoading(true); setShowResult(false); setRoute(null);
    setTimeout(() => {
      const result = findRoute(startLoc, destLoc);
      setRoute(result); setFrom(startLoc); setTo(destLoc);
      setIsLoading(false); setShowResult(true);
    }, 1000);
  };

  const handleReset = () => {
    setShowResult(false); setRoute(null); setFrom(""); setTo("");
  };

  return (
    /*
     * No id="routes" needed — React Router renders this component
     * at the /routes path directly.
     * pt-24 accounts for the fixed Navbar height.
     */
    <div className="bg-slate-950 min-h-screen pt-24 pb-20 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.055) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[450px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20
                          rounded-full px-4 py-1.5 mb-5">
            <Zap size={11} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
              AI Route Planner
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Smart Route <span className="text-emerald-400">Suggestion</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Get the fastest, safest path with Google Maps-style visualization
            and real-time traffic analysis for Lahore.
          </p>
        </motion.div>

        {/* ── Search form ── */}
        <div className="mb-6">
          <RouteForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* ── States ── */}
        <AnimatePresence mode="wait">

          {/* Loading */}
          {isLoading && (
            <motion.div key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-5"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 border-2 border-slate-800 border-t-emerald-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xl select-none">
                  🗺️
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-semibold">Calculating optimal route…</p>
                <p className="text-slate-500 text-xs mt-1">Analysing live traffic conditions</p>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {!isLoading && showResult && route && (
            <motion.div key="results"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <AnimatedPath route={route} isVisible={showResult} />
              <RouteResult  route={route} from={from} to={to} />

              {/* Reset */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="flex justify-center pt-1"
              >
                <button
                  onClick={handleReset}
                  className="group text-slate-500 hover:text-emerald-400 text-sm
                             flex items-center gap-2 transition-colors duration-200"
                >
                  <motion.svg width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    whileHover={{ rotate: -180 }} transition={{ duration: 0.35 }}
                  >
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 .49-3.15"/>
                  </motion.svg>
                  Plan another route
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Empty state */}
          {!isLoading && !showResult && (
            <motion.div key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-3 text-center"
            >
              <span className="text-5xl opacity-20 select-none">🗺️</span>
              <p className="text-slate-600 text-sm">
                Choose a start and destination above to see your route
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}