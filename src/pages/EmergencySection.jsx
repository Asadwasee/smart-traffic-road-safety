// EmergencySection.jsx
// Stack: React + Tailwind CSS + Framer Motion
// Run: npm install framer-motion lucide-react

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
    text: "text-red-400",
    glow: "shadow-red-500/20",
  },
  {
    id: "police",
    label: "Police",
    number: "15",
    Icon: ShieldCheck,
    color: "blue",
    bg: "bg-blue-500/10 hover:bg-blue-500/20",
    border: "border-blue-500/30 hover:border-blue-500",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  {
    id: "helpline",
    label: "Helpline",
    number: "1122",
    Icon: Phone,
    color: "green",
    bg: "bg-green-500/10 hover:bg-green-500/20",
    border: "border-green-500/30 hover:border-green-500",
    text: "text-green-400",
    glow: "shadow-green-500/20",
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
        transition-colors duration-300 shadow-xl
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
          className="bg-gray-950 text-white px-2 py-0.5 rounded-full font-mono font-black text-xs"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {btn.number}
        </span>
      </span>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
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
    <div className="relative h-20 bg-gray-800/60 rounded-xl overflow-hidden border border-white/5 mb-6">
      {/* Road dashes — slowed to 6s */}
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
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 bg-gray-950 rounded-full px-3 py-1.5 border border-white/10">
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
      className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 mb-6"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
        Live Route — Unit A3 → City Hospital
      </p>
      <svg viewBox="0 0 500 100" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20,70 C80,70 100,25 180,25 S280,55 340,40 S430,15 480,25"
          fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round"
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
        <text x="10" y="90" fill="#6b7280" fontSize="10" fontFamily="Inter">Start</text>
        <text x="458" y="18" fill="#6b7280" fontSize="10" fontFamily="Inter">Hospital</text>
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
      className="flex items-center gap-3 bg-gray-800/40 border border-white/5 rounded-xl p-4 mb-6 cursor-pointer transition-colors"
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
        <Mic className={`w-5 h-5 ${listening ? "text-white" : "text-red-400"}`} strokeWidth={1.8} />
      </motion.div>

      <div className="flex items-center gap-0.5 h-7">
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${listening ? "bg-red-400" : "bg-gray-600"}`}
            style={{ height: h }}
            animate={listening ? { height: [h * 0.4, h, h * 0.6, h * 1.1, h * 0.5] } : {}}
            transition={{ duration: 0.9 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="text-sm flex-1 text-gray-400">
        {listening ? (
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-red-400 font-semibold"
          >
            Listening...
          </motion.span>
        ) : text ? (
          <span><span className="text-white font-medium">Heard: </span>"{text}"</span>
        ) : (
          <span>
            <span className="text-white font-medium">Tap to speak</span> —
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
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 10 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className="bg-gray-900 rounded-2xl border border-red-500/30 p-6 max-w-md w-full relative overflow-hidden shadow-2xl shadow-red-500/20 max-h-[90vh] overflow-y-auto"
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "repeating-linear-gradient(90deg, #E24B4A 0, #E24B4A 16px, #EF9F27 16px, #EF9F27 32px)",
            }}
            animate={{ backgroundPosition: ["0px", "32px"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-3 mb-4 mt-2">
            <motion.div
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 0.8, repeat: 3 }}
              className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0"
            >
              <AlertTriangle className="w-6 h-6 text-red-400" strokeWidth={1.8} />
            </motion.div>
            <div>
              <p className="text-red-400 font-black text-lg leading-none">ACCIDENT ALERT</p>
              <p className="text-gray-500 text-xs mt-1">Auto-detected via traffic sensors</p>
            </div>
          </div>

          <div className="w-full h-40 rounded-xl bg-gray-800 border border-white/8 mb-4 flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-8 h-8 text-red-400" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              className="absolute w-14 h-14 rounded-full border-2 border-red-500/60"
              animate={{ scale: [1, 2], opacity: [0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute w-14 h-14 rounded-full border-2 border-red-500/40"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeOut" }}
            />
          </div>

          <div className="bg-gray-800/60 rounded-xl p-4 mb-4 space-y-2">
            {[
              { k: "Location", v: "Mall Road, Sector 7", c: "text-red-400" },
              { k: "Severity", v: "HIGH", c: "text-amber-400" },
              { k: "Units Nearby", v: "2 Available", c: "text-green-400" },
              { k: "ETA", v: "4 min", c: "text-amber-400" },
              { k: "Alert ID", v: "#ALT-2847", c: "text-gray-400" },
            ].map((row) => (
              <div key={row.k} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{row.k}</span>
                <span className={`font-bold font-mono text-xs ${row.c}`}>{row.v}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDispatch}
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Ambulance className="w-4 h-4" strokeWidth={2} />
              Dispatch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-xl py-3 text-sm border border-white/10 transition-colors"
            >
              Dismiss
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-3">
            Auto-dispatch in{" "}
            <span className="text-amber-400 font-black font-mono">{countdown}s</span>
          </p>
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
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
        <Clock className="w-5 h-5 text-amber-400" strokeWidth={1.8} />
      </div>
      <div>
        <div className="text-2xl font-black text-white leading-none font-mono">
          {pad(time.getHours())}
          <motion.span
            className="text-amber-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
          >:</motion.span>
          {pad(time.getMinutes())}
          <motion.span
            className="text-amber-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
          >:</motion.span>
          {pad(time.getSeconds())}
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">
          {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -10, x: "-50%" }}
        className="fixed bottom-8 left-1/2 bg-red-500 text-white font-bold text-sm px-5 py-3 rounded-xl z-50 shadow-xl whitespace-nowrap flex items-center gap-2"
      >
        <CheckCircle className="w-4 h-4" strokeWidth={2} />
        {msg}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── STAT CARDS ───────────────────────────────────────────────────────────────
function StatCards() {
  const [alerts, setAlerts] = useState(3);
  useEffect(() => {
    const t = setInterval(() => {
      setAlerts((a) => Math.max(1, a + (Math.random() > 0.7 ? 1 : Math.random() > 0.8 ? -1 : 0)));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: alerts, label: "Active Alerts", color: "text-red-400" },
    { value: 7, label: "Units En Route", color: "text-amber-400" },
    { value: "98%", label: "System Online", color: "text-green-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.18, duration: 0.5 }}
          className="bg-gray-800/40 border border-white/5 rounded-xl p-4 text-center"
        >
          <motion.p
            key={s.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`text-2xl font-black font-mono ${s.color}`}
          >
            {s.value}
          </motion.p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.label}</p>
        </motion.div>
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
    setTimeout(() => setToast(null), 2700);
  }

  function handleAlertDispatch() {
    setShowAlert(false);
    setToast("Ambulance dispatched — Calling 1122");
    setTimeout(() => setToast(null), 2700);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* ── HERO ── */}
      <div className="px-4 pt-10 pb-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/12 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Emergency Active
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
            Traffic <span className="text-red-400">Emergency</span>
            <br />Control Center
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-6">
            Real-time monitoring, instant dispatch, and route optimization for
            emergency vehicles across the city.
          </p>
        </motion.div>

        <RoadStrip />
        <StatCards />
      </div>

      {/* ── EMERGENCY BUTTONS ── */}
      <section className="px-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold">Quick Dispatch</h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/12 border border-red-500/25 text-red-400 font-bold uppercase tracking-wider">
            Emergency
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EMERGENCY_BUTTONS.map((btn) => (
            <EmergencyButton key={btn.id} btn={btn} onDispatch={handleDispatch} />
          ))}
        </div>
      </section>

      {/* ── ROUTE ── */}
      <section className="px-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold">Live Route Tracking</h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/12 border border-amber-500/25 text-amber-400 font-bold uppercase tracking-wider">
            Navigation
          </span>
        </div>
        <RouteAnimation />
      </section>

      {/* ── VOICE ── */}
      <section className="px-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold">Voice Command</h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/12 border border-green-500/25 text-green-400 font-bold uppercase tracking-wider">
            AI Input
          </span>
        </div>
        <VoiceInput />
      </section>

      {/* ── FOOTER CLOCK ── */}
      <footer className="px-4 py-5 bg-gray-900 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <DigitalClock />
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 font-bold">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              System Online
            </div>
            <span>TrafficOS v2.4</span>
          </div>
        </div>
      </footer>

      {showAlert && (
        <AccidentAlert
          onClose={() => setShowAlert(false)}
          onDispatch={handleAlertDispatch}
        />
      )}

      {toast && <DispatchToast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}