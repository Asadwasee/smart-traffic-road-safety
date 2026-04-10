import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Ambulance,
  ShieldCheck,
  Phone,
  Mic,
  AlertTriangle,
  MapPin,
  Clock,
  Zap,
  CheckCircle,
} from "lucide-react";

const EMERGENCY_BUTTONS = [
  {
    id: "ambulance",
    label: "Ambulance",
    number: "1122",
    Icon: Ambulance,
    color: "red",
    bg: "bg-red-500/10 hover:bg-red-500/20",
    border: "border-red-500/30 hover:border-red-500",
    text: "text-red-600 dark:text-red-400",
    glow: "shadow-red-500/10 dark:shadow-red-500/20",
  },
  {
    id: "police",
    label: "Police",
    number: "15",
    Icon: ShieldCheck,
    color: "blue",
    bg: "bg-blue-500/10 hover:bg-blue-500/20",
    border: "border-blue-500/30 hover:border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-500/10 dark:shadow-blue-500/20",
  },
  {
    id: "helpline",
    label: "Helpline",
    number: "1122",
    Icon: Phone,
    color: "green",
    bg: "bg-green-500/10 hover:bg-green-500/20",
    border: "border-green-500/30 hover:border-green-500",
    text: "text-green-600 dark:text-green-400",
    glow: "shadow-green-500/10 dark:shadow-green-500/20",
  },
];

const VOICE_PHRASES = [
  "Dispatching ambulance to Mall Road...",
  "Alerting police unit nearby...",
  "Routing emergency to City Hospital...",
];

// ─── PULSE RING ───────────────────────────────────────────────────────────────
function PulseRings({ color }) {
  const rings = [0, 1.2, 2.4];
  const colorMap = { red: "#ef4444", blue: "#3b82f6", green: "#22c55e" };
  return (
    <>
      {rings.map((delay, i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-2xl"
          style={{ border: `2px solid ${colorMap[color]}` }}
          initial={{ opacity: 0.6, scale: 0.5 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 3.6, repeat: Infinity, delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

// ─── EMERGENCY BUTTON ─────────────────────────────────────────────────────────
function EmergencyButton({ btn, onDispatch }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { Icon } = btn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onDispatch(btn)}
      className={`
        relative overflow-hidden rounded-2xl border p-6
        flex flex-col items-center gap-3 cursor-pointer
        transition-colors duration-300 shadow-xl bg-white dark:bg-slate-900/50
        ${btn.bg} ${btn.border} ${btn.glow}
      `}
    >
      <PulseRings color={btn.color} />

      <motion.div
        className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center ${btn.bg.split(" ")[0]}`}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className={`w-6 h-6 ${btn.text}`} strokeWidth={1.8} />
      </motion.div>

      <span className={`font-bold text-base relative z-10 ${btn.text}`}>
        {btn.label}
      </span>

      <span className="relative z-10">
        <span
          className="bg-gray-900 dark:bg-black text-white px-2 py-0.5 rounded-full font-mono font-black text-xs"
        >
          {btn.number}
        </span>
      </span>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.7 }}
      />
    </motion.div>
  );
}

// ─── ROAD ANIMATION ───────────────────────────────────────────────────────────
function RoadStrip() {
  const cars = [
    { Icon: Ambulance, color: "#ef4444", duration: 16, delay: 0 },
    { Icon: ShieldCheck, color: "#3b82f6", duration: 13, delay: -3 },
    { Icon: Zap, color: "#888", duration: 20, delay: -2 },
  ];
  return (
    <div className="relative h-20 bg-gray-100 dark:bg-gray-800/60 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 mb-6 shadow-inner">
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-0.5 w-[200%]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #EF9F27 0, #EF9F27 24px, transparent 24px, transparent 48px)",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {cars.map((car, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ x: -60 }}
          animate={{ x: "calc(100vw + 60px)" }}
          transition={{
            duration: car.duration,
            repeat: Infinity,
            delay: car.delay,
            ease: "linear",
          }}
        >
          <car.Icon style={{ color: car.color }} className="w-6 h-6" strokeWidth={1.5} />
        </motion.div>
      ))}
      <TrafficLight />
    </div>
  );
}

// ─── TRAFFIC LIGHT ────────────────────────────────────────────────────────────
function TrafficLight() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 2500);
    return () => clearInterval(t);
  }, []);

  const lights = [
    { on: phase === 0, color: "bg-red-500 shadow-red-500" },
    { on: phase === 1, color: "bg-amber-400 shadow-amber-400" },
    { on: phase === 2, color: "bg-green-500 shadow-green-500" },
  ];

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 bg-gray-900 rounded-full px-3 py-1.5 border border-white/10">
      {lights.map((l, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-500 ${
            l.on ? l.color + " shadow-md" : "bg-gray-700"
          }`}
          animate={l.on ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.8 }}
        />
      ))}
    </div>
  );
}

// ─── ROUTE SVG ────────────────────────────────────────────────────────────────
function RouteAnimation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
      className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-white/5 rounded-2xl p-5 mb-6 shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
        Live Route — Unit A3 → City Hospital
      </p>
      <svg viewBox="0 0 500 100" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20,70 C80,70 100,25 180,25 S280,55 340,40 S430,15 480,25"
          fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="6" strokeLinecap="round"
        />
        <motion.path
          d="M20,70 C80,70 100,25 180,25 S280,55 340,40 S430,15 480,25"
          fill="none" stroke="#E24B4A" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
        <circle cx="20" cy="70" r="5" fill="#E24B4A" />
        <circle cx="480" cy="25" r="5" fill="#22c55e" />
      </svg>
    </motion.div>
  );
}

// ─── VOICE INPUT ──────────────────────────────────────────────────────────────
function VoiceInput() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  function toggle() {
    if (listening) return;
    setListening(true);
    setText("");
    setTimeout(() => {
      const p = VOICE_PHRASES[Math.floor(Math.random() * VOICE_PHRASES.length)];
      setText(p);
      setTimeout(() => setListening(false), 2500);
    }, 3500);
  }

  const barHeights = [8, 18, 12, 22, 10, 20, 14, 24, 9];

  return (
    <motion.div
      whileHover={{ borderColor: "rgba(226,75,74,0.4)" }}
      onClick={toggle}
      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-white/5 rounded-xl p-4 mb-6 cursor-pointer transition-colors shadow-sm"
    >
      <motion.div
        animate={listening ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
          listening
            ? "bg-red-500 border-red-500 shadow-lg shadow-red-500/40"
            : "bg-red-500/15 border-red-500/30"
        }`}
      >
        <Mic className={`w-5 h-5 ${listening ? "text-white" : "text-red-500 dark:text-red-400"}`} strokeWidth={1.8} />
      </motion.div>

      <div className="flex items-center gap-0.5 h-7">
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${listening ? "bg-red-400" : "bg-gray-300 dark:bg-gray-600"}`}
            style={{ height: h }}
            animate={listening ? { height: [h * 0.4, h, h * 0.6, h * 1.1, h * 0.5] } : {}}
            transition={{ duration: 0.9 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="text-sm flex-1 text-gray-500 dark:text-gray-400">
        {listening ? (
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-red-500 dark:text-red-400 font-semibold"
          >
            Listening...
          </motion.span>
        ) : text ? (
          <span><span className="text-slate-900 dark:text-white font-medium">Heard: </span>"{text}"</span>
        ) : (
          <span>
            <span className="text-slate-900 dark:text-white font-medium">Tap to speak</span> —
            "Dispatch ambulance to Mall Road"
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── ACCIDENT ALERT MODAL ─────────────────────────────────────────────────────
function AccidentAlert({ onClose, onDispatch }) {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(t); onDispatch(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 10 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-red-500/30 p-6 max-w-md w-full relative overflow-hidden shadow-2xl dark:shadow-red-500/20"
        >
          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-red-600 dark:text-red-400 font-black text-lg">ACCIDENT ALERT</p>
              <p className="text-gray-500 text-xs">Auto-detected via traffic sensors</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 mb-4 space-y-2 border border-gray-100 dark:border-white/5">
            {[
              { k: "Location", v: "Mall Road, Sector 7", c: "text-red-500 dark:text-red-400" },
              { k: "Severity", v: "HIGH", c: "text-amber-600 dark:text-amber-400" },
              { k: "ETA", v: "4 min", c: "text-amber-600 dark:text-amber-400" },
            ].map((row) => (
              <div key={row.k} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{row.k}</span>
                <span className={`font-bold ${row.c}`}>{row.v}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={onDispatch} className="bg-red-500 text-white font-bold rounded-xl py-3 text-sm shadow-lg shadow-red-500/20">
              Dispatch Now
            </button>
            <button onClick={onClose} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl py-3 text-sm">
              Dismiss
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── DIGITAL CLOCK ────────────────────────────────────────────────────────────
function DigitalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (v) => String(v).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900 dark:text-white leading-none font-mono">
          {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
        </div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
          System Live Monitor
        </p>
      </div>
    </div>
  );
}

// ─── DISPATCH TOAST ───────────────────────────────────────────────────────────
function DispatchToast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -10, x: "-50%" }}
      className="fixed bottom-8 left-1/2 bg-slate-900 dark:bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-2xl z-50 shadow-2xl flex items-center gap-2"
    >
      <CheckCircle className="w-4 h-4 text-green-400" />
      {msg}
    </motion.div>
  );
}

// ─── STAT CARDS ───────────────────────────────────────────────────────────────
function StatCards() {
  const stats = [
    { value: 3, label: "Active Alerts", color: "text-red-500 dark:text-red-400" },
    { value: 7, label: "Units En Route", color: "text-amber-600 dark:text-amber-400" },
    { value: "98%", label: "Online", color: "text-green-600 dark:text-green-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-white/5 rounded-xl p-4 text-center shadow-sm">
          <p className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EmergencySection() {
  const [showAlert, setShowAlert] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setShowAlert(true), 2500);
    return () => clearTimeout(t);
  }, []);

  function handleDispatch(btn) {
    setToast(`${btn.label} dispatched — Calling ${btn.number}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* ── HERO ── */}
      <div className="px-4 pt-32 pb-6 bg-gradient-to-b from-gray-50 to-white dark:from-[#0b1a2b] dark:to-slate-950 border-b border-gray-100 dark:border-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-tighter mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Live Emergency Control
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3 tracking-tight">
            Traffic <span className="text-red-500">Emergency</span>
            <br />Control Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-8">
            Real-time monitoring and instant dispatch for emergency units citywide.
          </p>
        </motion.div>

        <RoadStrip />
        <StatCards />
      </div>

      {/* ── SECTIONS ── */}
      <div className="px-4 py-8 space-y-10 max-w-5xl mx-auto">
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-black">Quick Dispatch</h2>
            <div className="h-px flex-1 bg-gray-100 dark:bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EMERGENCY_BUTTONS.map((btn) => (
              <EmergencyButton key={btn.id} btn={btn} onDispatch={handleDispatch} />
            ))}
          </div>
        </section>

        <section>
           <h2 className="text-xl font-black mb-6">Live Tracking & Voice</h2>
           <RouteAnimation />
           <VoiceInput />
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer className="px-4 py-8 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-6 max-w-5xl mx-auto">
          <DigitalClock />
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            TrafficOS v2.4 • Secure Terminal
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showAlert && (
          <AccidentAlert onClose={() => setShowAlert(false)} onDispatch={() => { setShowAlert(false); setToast("Ambulance dispatched — Calling 1122"); }} />
        )}
        {toast && <DispatchToast msg={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}