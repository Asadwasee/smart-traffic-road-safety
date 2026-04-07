import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock3,
  MapPinned,
  Navigation,
  Sparkles,
  TrafficCone,
} from 'lucide-react';
import lahoreMap from '../assets/lahore-map.svg';

const trafficLocations = [
  {
    id: 'gulberg',
    name: 'Gulberg',
    status: 'High Traffic',
    level: 'high',
    delay: '20 min delay',
    x: '26%',
    y: '30%',
    note: 'Heavy rush near the main boulevard and signal crossings.',
  },
  {
    id: 'dha',
    name: 'DHA',
    status: 'Medium Traffic',
    level: 'medium',
    delay: '10 min delay',
    x: '68%',
    y: '36%',
    note: 'Steady movement with short slowdowns near commercial blocks.',
  },
  {
    id: 'johar-town',
    name: 'Johar Town',
    status: 'Low Traffic',
    level: 'low',
    delay: 'Smooth drive',
    x: '43%',
    y: '70%',
    note: 'Clear inner roads and better traffic flow for now.',
  },
  {
    id: 'model-town',
    name: 'Model Town',
    status: 'Medium Traffic',
    level: 'medium',
    delay: '8 min delay',
    x: '34%',
    y: '54%',
    note: 'Moderate congestion around school and market zones.',
  },
  {
    id: 'cantt',
    name: 'Cantt',
    status: 'Low Traffic',
    level: 'low',
    delay: 'Smooth drive',
    x: '57%',
    y: '22%',
    note: 'Open corridors with lighter traffic volume.',
  },
];

const trafficStyles = {
  low: {
    dot: 'bg-emerald-400',
    ring: 'bg-emerald-400/30',
    border: 'border-emerald-400/50',
    text: 'text-emerald-300',
    badge: 'bg-emerald-400/15 text-emerald-200',
    shadow: 'shadow-[0_0_35px_rgba(52,211,153,0.35)]',
  },
  medium: {
    dot: 'bg-amber-300',
    ring: 'bg-amber-300/30',
    border: 'border-amber-300/50',
    text: 'text-amber-200',
    badge: 'bg-amber-300/15 text-amber-100',
    shadow: 'shadow-[0_0_35px_rgba(252,211,77,0.35)]',
  },
  high: {
    dot: 'bg-rose-500',
    ring: 'bg-rose-500/30',
    border: 'border-rose-500/50',
    text: 'text-rose-200',
    badge: 'bg-rose-500/15 text-rose-100',
    shadow: 'shadow-[0_0_35px_rgba(244,63,94,0.38)]',
  },
};

function TrafficMapSection() {
  const [selectedLocation, setSelectedLocation] = useState(trafficLocations[0]);

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] pt-32"
      >
        <div className="absolute inset-x-0 top-20 h-72 bg-[radial-gradient(circle,_rgba(250,204,21,0.14),_transparent_55%)] blur-3xl" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-10%] top-[22%] h-28 w-40 rounded-full bg-white/10 blur-sm" />
          <div className="absolute left-[15%] top-[28%] h-1 w-40 rounded-full bg-white/20" />
          <motion.div
            animate={{ x: ['-10%', '115%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[26%] h-10 w-20 rounded-full bg-emerald-400/30 blur-[1px]"
          />
          <motion.div
            animate={{ x: ['100%', '-20%'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear', delay: 1.2 }}
            className="absolute top-[60%] h-8 w-16 rounded-full bg-amber-300/25 blur-[1px]"
          />
        </div>

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <Sparkles size={16} />
              Interactive Smart Traffic Dashboard
            </div>
            <h1 className="max-w-2xl text-5xl font-black tracking-tight text-white sm:text-6xl">
              Understanding live traffic on a map is now simple and visual.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Color-coded traffic points, clickable location details, and polished animations
              give this section the feel of a live smart city traffic dashboard.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#traffic"
                className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Check Traffic
              </a>
              <a
                href="#traffic"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-amber-300/50 hover:bg-white/10"
              >
                Explore Traffic Map
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['5', 'Live points'],
                ['3', 'Traffic levels'],
                ['100%', 'Animated UI'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-emerald-400/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/60 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    Traffic Snapshot
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">City Heat Overview</h2>
                </div>
                <TrafficCone className="text-amber-300" size={28} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Low', 'Green', 'bg-emerald-400'],
                  ['Medium', 'Yellow', 'bg-amber-300'],
                  ['High', 'Red', 'bg-rose-500'],
                ].map(([label, color, swatch]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className={`mb-3 h-3 w-12 rounded-full ${swatch}`} />
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="font-semibold text-white">{color} indicator</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(15,23,42,0.95),_rgba(17,24,39,0.9))] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-slate-300">Highlighted area</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 size={14} />
                    Updated now
                  </div>
                </div>
                <div className="relative h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
                  <img
                    src={lahoreMap}
                    alt="Lahore traffic map"
                    className="h-full w-full object-cover opacity-95"
                  />
                  {trafficLocations.map((location) => {
                    const style = trafficStyles[location.level];

                    return (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => setSelectedLocation(location)}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: location.x, top: location.y }}
                      >
                        <motion.span
                          animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0.2, 0.8] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          className={`absolute inset-0 rounded-full ${style.ring}`}
                        />
                        <motion.span
                          whileHover={{ scale: 1.12 }}
                          className={`relative flex h-5 w-5 items-center justify-center rounded-full border-4 border-slate-950 ${style.dot} ${style.shadow}`}
                        >
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </motion.span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="traffic" className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              <MapPinned size={16} />
              Live Traffic Page UI Simulation
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Clickable traffic map with animated status points
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Even without Google Maps, this custom map presents each location with its own
              traffic status, pulse animation, hover effect, and smooth detail transitions.
            </p>
          </motion.div>

          <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/40"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Map Zone</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">Lahore Smart Traffic Grid</h3>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
                    Green = Low
                  </div>
                  <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2">
                    Yellow = Medium
                  </div>
                  <div className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2">
                    Red = High
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/11] overflow-hidden bg-slate-900 p-5 sm:p-7">
                <div className="absolute inset-4 overflow-hidden rounded-[1.75rem] border border-white/10">
                  <img
                    src={lahoreMap}
                    alt="Detailed Lahore street map"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(15,23,42,0.04),_rgba(15,23,42,0.18))]" />
                </div>

                <svg
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-7 h-[calc(100%-3.5rem)] w-[calc(100%-3.5rem)]"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FACC15" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d="M 26 30 C 36 28, 47 31, 57 40 S 70 61, 76 72"
                    fill="none"
                    stroke="url(#routeGlow)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.35 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6 }}
                  />
                </svg>

                {trafficLocations.map((location, index) => {
                  const isActive = selectedLocation.id === location.id;
                  const style = trafficStyles[location.level];

                  return (
                    <motion.button
                      key={location.id}
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.35 }}
                      whileHover={{ scale: 1.08 }}
                      onClick={() => setSelectedLocation(location)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                      style={{ left: location.x, top: location.y }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.6, 1], opacity: [0.75, 0.18, 0.75] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute inset-0 rounded-full ${style.ring}`}
                      />
                      <span
                        className={`relative flex h-6 w-6 items-center justify-center rounded-full border-4 border-slate-950 transition ${
                          isActive ? 'scale-110' : ''
                        } ${style.dot} ${style.shadow}`}
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      </span>
                      <span className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
                        {location.name}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 backdrop-blur">
                  Tap any pulse point to reveal live dummy traffic details.
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                      Selected Location
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-white">{selectedLocation.name}</h3>
                  </div>
                  <div
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${trafficStyles[selectedLocation.level].badge}`}
                  >
                    {selectedLocation.status}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLocation.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.28 }}
                    className="mt-6 space-y-4"
                  >
                    <div
                      className={`rounded-3xl border p-5 ${trafficStyles[selectedLocation.level].border} bg-slate-950/80`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${trafficStyles[selectedLocation.level].badge}`}
                        >
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Traffic status</p>
                          <p className={`text-xl font-bold ${trafficStyles[selectedLocation.level].text}`}>
                            {selectedLocation.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-center gap-3 text-slate-300">
                          <Clock3 size={18} className="text-amber-300" />
                          Estimated Delay
                        </div>
                        <p className="mt-3 text-2xl font-bold text-white">{selectedLocation.delay}</p>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-center gap-3 text-slate-300">
                          <Navigation size={18} className="text-emerald-300" />
                          Situation
                        </div>
                        <p className="mt-3 text-base leading-7 text-slate-300">
                          {selectedLocation.note}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Locations</p>
                <div className="mt-5 space-y-3">
                  {trafficLocations.map((location) => {
                    const active = selectedLocation.id === location.id;

                    return (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => setSelectedLocation(location)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                          active
                            ? 'border-white/20 bg-white/10'
                            : 'border-white/10 bg-slate-950/40 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-3 w-3 rounded-full ${trafficStyles[location.level].dot}`} />
                          <div>
                            <p className="font-semibold text-white">{location.name}</p>
                            <p className="text-sm text-slate-400">{location.delay}</p>
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${trafficStyles[location.level].badge}`}
                        >
                          {location.status.replace(' Traffic', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrafficMapSection;
