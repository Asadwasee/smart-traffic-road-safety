import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Flag, ArrowRight, ArrowLeftRight, AlertCircle } from "lucide-react";
import { LOCATION_NAMES } from "../../data/routeData";

export default function RouteForm({ onSubmit, isLoading }) {
  const [from,  setFrom]  = useState("");
  const [to,    setTo]    = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!from || !to)  { setError("Select both a start and a destination."); return; }
    if (from === to)   { setError("Start and destination can't be the same."); return; }
    setError(""); onSubmit(from, to);
  };

  const swap = () => { setFrom(to); setTo(from); setError(""); };
  const sel =
    "w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl " +
    "px-4 py-3.5 pl-11 appearance-none text-sm cursor-pointer " +
    "focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 " +
    "hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-black/30 transition-colors duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
          <MapPin className="text-emerald-400" size={18} />
        </div>
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold text-base tracking-tight">Plan Your Route</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">AI-powered path suggestion for Lahore</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="flex-1 relative">
          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none z-10" />
          <select value={from} onChange={e => { setFrom(e.target.value); setError(""); }} className={sel}>
            <option value="" disabled>Choose start location</option>
            {LOCATION_NAMES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.12, rotate: 180 }} whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.25 }} onClick={swap}
          className="hidden md:flex w-10 h-10 flex-shrink-0 items-center justify-center
                     rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800
                     text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
        >
          <ArrowLeftRight size={14} />
        </motion.button>

        <div className="flex-1 relative">
          <Flag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400 pointer-events-none z-10" />
          <select value={to} onChange={e => { setTo(e.target.value); setError(""); }} className={sel}>
            <option value="" disabled>Choose destination</option>
            {LOCATION_NAMES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(16,185,129,0.45)" }}
          whileTap={{ scale: 0.96 }}
          onClick={submit} disabled={isLoading}
          className="flex items-center justify-center gap-2 px-7 py-3.5
                     bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold
                     rounded-xl text-sm whitespace-nowrap shadow-lg shadow-emerald-900/30
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading
            ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full" />
            : <><ArrowRight size={15} /> Find Route</>
          }
        </motion.button>
      </div>

      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-rose-400 text-xs flex items-center gap-1.5">
          <AlertCircle size={11} /> {error}
        </motion.p>
      )}
    </motion.div>
  );
}
