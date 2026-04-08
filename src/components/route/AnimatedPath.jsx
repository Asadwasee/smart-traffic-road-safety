import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildMapPath, getTrafficColor } from "../../utils/routeUtils";
import { LOCATIONS } from "../../data/routeData";

/* ── Static background roads (Lahore arterial network approximation) ── */
const BG_ROADS = [
  // Horizontal
  { d: "M 0 60  H 560", w: 6 },
  { d: "M 0 105 H 560", w: 4 },
  { d: "M 0 155 H 560", w: 7 },
  { d: "M 0 210 H 560", w: 5 },
  { d: "M 0 260 H 560", w: 4 },
  { d: "M 0 295 H 560", w: 6 },
  // Vertical
  { d: "M 90  0 V 340", w: 4 },
  { d: "M 155 0 V 340", w: 6 },
  { d: "M 230 0 V 340", w: 5 },
  { d: "M 310 0 V 340", w: 7 },
  { d: "M 390 0 V 340", w: 5 },
  { d: "M 460 0 V 340", w: 4 },
  // Diagonal (ring road approximation)
  { d: "M 0 295 Q 140 240 230 230 Q 330 220 430 180 Q 500 155 560 130", w: 5 },
];

/* ── City block rectangles for map texture ── */
const BLOCKS = [
  { x: 95,  y: 62,  w: 55, h: 38 },
  { x: 160, y: 62,  w: 65, h: 38 },
  { x: 235, y: 62,  w: 70, h: 38 },
  { x: 315, y: 62,  w: 70, h: 38 },
  { x: 395, y: 62,  w: 60, h: 38 },
  { x: 95,  y: 110, w: 55, h: 40 },
  { x: 160, y: 110, w: 65, h: 40 },
  { x: 235, y: 110, w: 70, h: 40 },
  { x: 315, y: 110, w: 70, h: 40 },
  { x: 395, y: 110, w: 60, h: 40 },
  { x: 95,  y: 160, w: 55, h: 45 },
  { x: 160, y: 160, w: 65, h: 45 },
  { x: 235, y: 160, w: 70, h: 45 },
  { x: 315, y: 160, w: 70, h: 45 },
  { x: 395, y: 160, w: 60, h: 45 },
  { x: 95,  y: 215, w: 55, h: 40 },
  { x: 160, y: 215, w: 65, h: 40 },
  { x: 235, y: 215, w: 70, h: 40 },
  { x: 315, y: 215, w: 70, h: 40 },
  { x: 395, y: 215, w: 60, h: 40 },
  { x: 95,  y: 265, w: 55, h: 25 },
  { x: 160, y: 265, w: 65, h: 25 },
  { x: 235, y: 265, w: 70, h: 25 },
  { x: 315, y: 265, w: 70, h: 25 },
];

/* ── Location name labels on map ── */
const MAP_LABELS = [
  { x: 210, y: 148, text: "Gulberg" },
  { x: 310, y: 138, text: "Cantt" },
  { x: 340, y: 93,  text: "Old City" },
  { x: 380, y: 53,  text: "Shahdara" },
  { x: 140, y: 213, text: "Johar Town" },
  { x: 360, y: 248, text: "DHA" },
  { x: 155, y: 178, text: "Model Town" },
];

/* ── Pulsing pin marker ── */
function MapPin({ x, y, color, label, delay, isEnd }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
    >
      {/* Shadow */}
      <ellipse cx={x} cy={y + 18} rx={8} ry={3} fill="black" opacity={0.35} />

      {/* Pin body */}
      <motion.path
        d={`M ${x} ${y - 2} C ${x - 11} ${y - 2} ${x - 11} ${y - 18} ${x} ${y - 22} C ${x + 11} ${y - 18} ${x + 11} ${y - 2} ${x} ${y - 2} Z`}
        fill={color}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      <circle cx={x} cy={y - 14} r={4} fill="white" opacity={0.9} />

      {/* Pulse ring */}
      <motion.circle
        cx={x} cy={y}
        r={6}
        fill={color}
        opacity={0.25}
        animate={{ r: [6, 20], opacity: [0.3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay }}
      />
      <circle cx={x} cy={y} r={4} fill={color} opacity={0.4} />

      {/* Label bubble */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        <rect
          x={x - 30} y={y - 40}
          width={60} height={16}
          rx={4} fill="#0f172a"
          stroke={color} strokeWidth="0.8" opacity={0.95}
        />
        <text x={x} y={y - 28}
          textAnchor="middle"
          fill={color}
          fontSize="7.5"
          fontFamily="'DM Mono', monospace"
          fontWeight="600"
        >
          {label}
        </text>
      </motion.g>
    </motion.g>
  );
}

/* ── Animated car that travels along the route path ── */
function TravelingCar({ pathD, color, animKey, isVisible }) {
  if (!isVisible) return null;
  return (
    <motion.g
      key={`car-${animKey}`}
      style={{
        offsetPath: `path("${pathD}")`,
        offsetRotate: "auto",
      }}
      initial={{ offsetDistance: "0%", opacity: 0, scale: 0.6 }}
      animate={{ offsetDistance: "100%", opacity: 1, scale: 1 }}
      transition={{
        offsetDistance: { duration: 2.6, ease: "easeInOut", delay: 0.5 },
        opacity:        { duration: 0.3, delay: 0.5 },
        scale:          { duration: 0.3, delay: 0.5 },
      }}
    >
      {/* Car body */}
      <rect x={-10} y={-6} width={20} height={12} rx={3}
        fill="#0f172a" stroke={color} strokeWidth="1.5" />
      <rect x={-6}  y={-9} width={12} height={6}  rx={2} fill={color} opacity={0.8} />
      {/* Wheels */}
      <circle cx={-6} cy={6}  r={3} fill="#1e293b" stroke={color} strokeWidth="1" />
      <circle cx={ 6} cy={6}  r={3} fill="#1e293b" stroke={color} strokeWidth="1" />
      {/* Headlights glow */}
      <motion.circle cx={10} cy={0} r={3} fill={color} opacity={0.7}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </motion.g>
  );
}

/* ── Dashed traffic flow arrows along the route ── */
function TrafficFlow({ pathD, color, animKey }) {
  return (
    <motion.path
      key={`flow-${animKey}`}
      d={pathD}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 18"
      opacity={0.5}
      animate={{ strokeDashoffset: [-24, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function AnimatedPath({ route, isVisible }) {
  const measureRef = useRef(null);
  const [pathLen, setPathLen] = useState(500);
  const [animKey, setAnimKey] = useState(0);

  const level   = route?.trafficLevel || "medium";
  const traffic = getTrafficColor(level);

  const pathInfo = route
    ? buildMapPath(
        LOCATIONS[route.from],
        LOCATIONS[route.to],
        level,
        route.waypoints?.length || 1
      )
    : null;

  const pathD = pathInfo?.pathD || "";

  useEffect(() => {
    if (measureRef.current && pathD) {
      try { setPathLen(measureRef.current.getTotalLength()); } catch (_) {}
    }
  }, [pathD]);

  useEffect(() => {
    if (isVisible) setAnimKey(k => k + 1);
  }, [isVisible, route]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
      transition={{ duration: 0.45 }}
      className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: traffic.hex }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-white text-sm font-semibold tracking-tight">Route Map</span>
          {route && (
            <span className="text-slate-500 text-xs ml-1">
              {route.from} → {route.to}
            </span>
          )}
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold border"
          style={{ color: traffic.hex, borderColor: traffic.border, backgroundColor: traffic.bg }}
        >
          {traffic.label}
        </span>
      </div>

      {/* ── MAP SVG ── */}
      <div className="relative" style={{ background: "linear-gradient(145deg, #060d18 0%, #091420 50%, #060d18 100%)" }}>
        <svg viewBox="0 0 560 340" className="w-full" style={{ maxHeight: 320 }}>
          <defs>
            {/* Glow filter for the active route */}
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Subtle noise texture */}
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend"/>
              <feComposite in="blend" in2="SourceGraphic" operator="in"/>
            </filter>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#1e293b" />
              <stop offset="100%" stopColor="#162032" />
            </linearGradient>
          </defs>

          {/* ── Background city blocks ── */}
          {BLOCKS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={2}
              fill={i % 3 === 0 ? "#0d1a28" : i % 3 === 1 ? "#0b1520" : "#0e1c2c"}
              stroke="#112030" strokeWidth="0.5" />
          ))}

          {/* ── Background road network ── */}
          {BG_ROADS.map((r, i) => (
            <g key={i}>
              {/* Road casing */}
              <path d={r.d} fill="none" stroke="#0a1624" strokeWidth={r.w + 4} strokeLinecap="round" />
              {/* Road surface */}
              <path d={r.d} fill="none" stroke="#162032" strokeWidth={r.w} strokeLinecap="round" />
              {/* Center line */}
              <path d={r.d} fill="none" stroke="#1e3050" strokeWidth="0.8"
                strokeDasharray="8 12" strokeLinecap="round" opacity={0.6} />
            </g>
          ))}

          {/* ── Static map labels ── */}
          {MAP_LABELS.map((l, i) => (
            <text key={i} x={l.x} y={l.y}
              textAnchor="middle" fill="#1e3a52" fontSize="8"
              fontFamily="'DM Mono', monospace" opacity={0.7}>
              {l.text}
            </text>
          ))}

          {/* ── ACTIVE ROUTE ── */}
          {isVisible && pathD && (
            <>
              {/* Hidden measurement path */}
              <path ref={measureRef} d={pathD} fill="none" stroke="transparent" strokeWidth="1" />

              {/* Route road casing (thick halo) */}
              <motion.path
                key={`casing-${animKey}`}
                d={pathD}
                fill="none"
                stroke={traffic.hex}
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.08}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Route road surface */}
              <motion.path
                key={`road-${animKey}`}
                d={pathD}
                fill="none"
                stroke="#1a2d40"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Route highlight line (the glowing colored line) */}
              <motion.path
                key={`line-${animKey}`}
                d={pathD}
                fill="none"
                stroke={traffic.hex}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                initial={{ strokeDashoffset: pathLen }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                filter="url(#routeGlow)"
                style={{ filter: `drop-shadow(0 0 4px ${traffic.hex}) drop-shadow(0 0 10px ${traffic.glow})` }}
              />

              {/* Traffic flow dashes */}
              <TrafficFlow pathD={pathD} color={traffic.hex} animKey={animKey} />

              {/* Moving car */}
              <TravelingCar pathD={pathD} color={traffic.hex} animKey={animKey} isVisible={isVisible} />

              {/* Start pin */}
              <MapPin
                x={pathInfo.startX}
                y={pathInfo.startY}
                color="#10b981"
                label={route.from.length > 10 ? route.from.slice(0, 9) + "…" : route.from}
                delay={0.6}
              />

              {/* End pin */}
              <MapPin
                x={pathInfo.endX}
                y={pathInfo.endY}
                color="#f43f5e"
                label={route.to.length > 10 ? route.to.slice(0, 9) + "…" : route.to}
                delay={1.8}
                isEnd
              />
            </>
          )}

          {/* Map noise overlay for texture */}
          <rect x="0" y="0" width="560" height="340" fill="url(#noise)" opacity="0.04" />

          {/* Vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#020812" stopOpacity="0.6" />
          </radialGradient>
          <rect x="0" y="0" width="560" height="340" fill="url(#vignette)" />
        </svg>

        {/* Map UI overlays */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {/* North indicator */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-lg px-2 py-1.5 text-center">
            <div className="text-emerald-400 text-xs font-bold leading-none">N</div>
            <div className="text-slate-600 text-[8px]">↑</div>
          </div>
        </div>

        {/* Scale bar */}
        <div className="absolute bottom-3 right-3 flex items-end gap-1.5">
          <div className="text-slate-600 text-[9px] font-mono">0</div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-16 h-px bg-slate-600" />
            <div className="text-slate-600 text-[9px] font-mono">5 km</div>
          </div>
        </div>

        {/* "Lahore" watermark */}
        <div className="absolute bottom-3 left-3 text-slate-800 text-[10px] font-mono font-bold tracking-widest select-none">
          LAHORE
        </div>
      </div>

      {/* Waypoint pills */}
      <AnimatePresence>
        {isVisible && route?.waypoints?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-3 border-t border-slate-800/80 flex flex-wrap gap-2"
          >
            <span className="text-slate-600 text-xs self-center mr-1">Via:</span>
            {route.waypoints.map((wp, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.15 }}
                className="text-xs text-slate-400 bg-slate-800 border border-slate-700
                           px-2.5 py-1 rounded-full flex items-center gap-1.5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: traffic.hex, opacity: 0.7 }}
                />
                {wp}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}