import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildRoutePath, getTrafficColor, formatTime } from "../../utils/routeUtils";
import { LOCATIONS } from "../../data/routeData";

/* ═══════════════════════════════════════════════════════════
   LAHORE MAP BACKGROUND — Google Maps light palette
   Canvas: 640 × 400
═══════════════════════════════════════════════════════════ */

const MAJOR_ROADS = [
  // N-S arteries
  { d: "M 155 0 L 148 400",   w: 7 },   // Ferozepur Road
  { d: "M 265 0 L 258 400",   w: 6 },   // Canal alignment
  { d: "M 415 0 L 408 400",   w: 7 },   // GT Road / MM Alam
  // E-W arteries
  { d: "M 0 118 L 640 118",   w: 6 },   // Mall Road
  { d: "M 0 188 L 640 190",   w: 7 },   // Jail Road
  { d: "M 0 245 L 640 250",   w: 6 },   // Canal Road
  { d: "M 0 308 L 640 314",   w: 7 },   // Raiwind Road
  // Ring Road (curve)
  { d: "M 58 400 Q 175 328 308 295 Q 440 262 558 202 Q 608 178 640 158", w: 8 },
  // Airport approach
  { d: "M 278 348 L 278 400", w: 5 },
];

const SECONDARY_ROADS = [
  { d: "M 0 155 L 640 157",   w: 3 },
  { d: "M 0 272 L 640 278",   w: 3 },
  { d: "M 0 338 L 640 344",   w: 3 },
  { d: "M 88  0 L 86  400",   w: 3 },
  { d: "M 212 0 L 208 400",   w: 3 },
  { d: "M 348 0 L 344 400",   w: 3 },
  { d: "M 488 0 L 484 400",   w: 3 },
  { d: "M 562 0 L 560 400",   w: 2.5 },
];

const TERTIARY_ROADS = [
  { d: "M 0 95  L 640 96",    w: 2 },
  { d: "M 0 218 L 640 222",   w: 2 },
  { d: "M 0 360 L 640 364",   w: 2 },
  { d: "M 180 0 L 177 400",   w: 2 },
  { d: "M 310 0 L 308 400",   w: 2 },
  { d: "M 460 0 L 458 400",   w: 2 },
  { d: "M 528 0 L 526 400",   w: 2 },
];

// Water (canal + river)
const WATER_PATHS = [
  { d: "M 238 0 Q 255 90 262 175 Q 268 260 265 400", w: 11 },
  { d: "M 0 315 Q 85 308 165 315 Q 225 320 278 348",  w: 7  },
];

// Parks
const PARKS = [
  { x: 302, y: 126, w: 72, h: 42 },  // Race Course
  { x: 168, y: 90,  w: 38, h: 20 },  // Iqbal Park
  { x: 455, y: 56,  w: 52, h: 28 },  // Shalimar
  { x: 56,  y: 255, w: 44, h: 32 },  // Johar Park
  { x: 510, y: 290, w: 55, h: 38 },  // DHA Park
];

// Neighbourhood text labels
const LABELS = [
  { x: 248, y: 183, t: "GULBERG",     s: 8.5, bold: true  },
  { x: 178, y: 214, t: "MODEL TOWN",  s: 7,   bold: false },
  { x: 355, y: 166, t: "CANTONMENT",  s: 7,   bold: false },
  { x: 400, y: 112, t: "OLD CITY",    s: 8,   bold: true  },
  { x: 418, y: 298, t: "DHA",         s: 9.5, bold: true  },
  { x: 155, y: 256, t: "JOHAR TOWN",  s: 7,   bold: false },
  { x: 438, y: 66,  t: "SHAHDARA",    s: 7.5, bold: false },
  { x: 115, y: 276, t: "TOWNSHIP",    s: 7,   bold: false },
  { x: 278, y: 340, t: "AIRPORT",     s: 6.5, bold: false },
  { x: 78,  y: 330, t: "BAHRIA",      s: 6.5, bold: false },
  { x: 325, y: 350, t: "RAIWIND",     s: 6.5, bold: false },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */

/** Google-style teardrop pin */
function TearPin({ x, y, color, label, delay, isEnd }) {
  const truncated = label.length > 13 ? label.slice(0, 12) + "…" : label;
  const badgeW    = Math.max(58, truncated.length * 5.8 + 16);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Ground shadow ellipse */}
      <ellipse cx={x} cy={y + 2} rx={8} ry={3.5}
        fill="rgba(0,0,0,0.18)" />

      {/* Teardrop body */}
      <motion.path
        d={`M ${x} ${y}
            C ${x - 11} ${y} ${x - 11} ${y - 17} ${x} ${y - 21}
            C ${x + 11} ${y - 17} ${x + 11} ${y} ${x} ${y} Z`}
        fill={color}
        stroke="white"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.28))" }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      {/* Inner white dot */}
      <circle cx={x} cy={y - 12} r={3.8} fill="white" />

      {/* Label badge */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        <rect
          x={x - badgeW / 2} y={y - 46}
          width={badgeW} height={18}
          rx={9}
          fill="white"
          stroke={color}
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.2))" }}
        />
        <text
          x={x} y={y - 33}
          textAnchor="middle"
          fill={isEnd ? "#c5221f" : "#1a7a50"}
          fontSize="7.2"
          fontFamily="'DM Sans', 'Segoe UI', system-ui, sans-serif"
          fontWeight="700"
          letterSpacing="0.2"
        >
          {truncated}
        </text>
      </motion.g>
    </motion.g>
  );
}

/** Route info callout — Google Maps floating card on the route */
function RouteCallout({ x, y, time, distance, trafficHex, delay }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "backOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* White card */}
      <rect x={x - 54} y={y} width={108} height={40} rx={8}
        fill="white"
        style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.18))" }}
      />

      {/* Coloured left accent bar */}
      <rect x={x - 54} y={y} width={5} height={40} rx={3} fill={trafficHex} />

      {/* Car SVG icon */}
      <rect x={x - 44} y={y + 14} width={16} height={9}  rx={2} fill="#374151" />
      <rect x={x - 41} y={y + 11} width={10} height={6}  rx={1} fill="#4b5563" />
      <circle cx={x - 38} cy={y + 25} r={2.5} fill="#1f2937" />
      <circle cx={x - 30} cy={y + 25} r={2.5} fill="#1f2937" />

      {/* Time — large bold */}
      <text x={x - 20} y={y + 23}
        fill="#111827"
        fontSize="14"
        fontFamily="'DM Sans', 'Segoe UI', system-ui"
        fontWeight="800"
        dominantBaseline="middle"
      >
        {time}
      </text>

      {/* Distance — small muted */}
      <text x={x - 20} y={y + 34}
        fill="#6b7280"
        fontSize="8"
        fontFamily="'DM Sans', 'Segoe UI', system-ui"
        fontWeight="500"
        dominantBaseline="middle"
      >
        {distance}
      </text>

      {/* Tail pointing down */}
      <path
        d={`M ${x - 7} ${y + 40} L ${x + 7} ${y + 40} L ${x} ${y + 49}`}
        fill="white"
        style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.08))" }}
      />
    </motion.g>
  );
}

/** Moving dot that travels along the drawn path (CSS offset-path) */
function MovingDot({ pathD, dotColor, animKey }) {
  const clean = pathD.replace(/\n\s*/g, " ");
  return (
    <motion.g
      key={`mover-${animKey}`}
      style={{
        offsetPath: `path("${clean}")`,
        offsetRotate: "0deg",
      }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0.4, 0] }}
      transition={{
        offsetDistance: { duration: 3.0, ease: "easeInOut", delay: 0.7 },
        opacity:        { duration: 3.0, times: [0, 0.05, 0.8, 0.95, 1], delay: 0.7 },
      }}
    >
      {/* Outer ring */}
      <circle r={11} fill={dotColor} opacity={0.2} />
      {/* Main dot */}
      <circle r={7}  fill={dotColor} stroke="white" strokeWidth="2.5" />
    </motion.g>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function AnimatedPath({ route, isVisible }) {
  const measureRef = useRef(null);
  const [pathLen, setPathLen] = useState(600);
  const [animKey, setAnimKey] = useState(0);

  const level   = route?.trafficLevel || "medium";
  const traffic = getTrafficColor(level);

  // Route line colour: blue for low/medium, red for heavy (Google Maps convention)
  const routeColor = level === "high" ? "#c5221f" : "#1a73e8";

  const pathInfo = (isVisible && route)
    ? buildRoutePath(LOCATIONS[route.from], LOCATIONS[route.to], level)
    : null;

  const cleanPath = pathInfo?.pathD?.replace(/\n\s*/g, " ") || "";

  useEffect(() => {
    if (measureRef.current && cleanPath) {
      try { setPathLen(measureRef.current.getTotalLength()); } catch (_) {}
    }
  }, [cleanPath]);

  useEffect(() => {
    if (isVisible) setAnimKey(k => k + 1);
  }, [isVisible, route]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 14 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/60"
    >
      {/* ── Top bar (dark, matches the project UI) ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: routeColor }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-white text-sm font-bold tracking-tight">Route Map</span>
          {route && (
            <span className="text-slate-400 text-xs ml-1 hidden sm:inline">
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

      {/* ── MAP CANVAS (Google Maps light palette) ── */}
      <div style={{ background: "#e8e3db", position: "relative" }}>
        <svg viewBox="0 0 640 400" className="w-full block" style={{ maxHeight: 340 }}>
          <defs>
            <linearGradient id="waterFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#b3d1e8" />
              <stop offset="100%" stopColor="#9dc7e2" />
            </linearGradient>
          </defs>

          {/* ── Base land ── */}
          <rect width="640" height="400" fill="#e8e3db" />

          {/* ── Parks ── */}
          {PARKS.map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h}
              rx={3} fill="#c5dbbf" stroke="#b5cfaf" strokeWidth="0.5" />
          ))}

          {/* ── Water ── */}
          {WATER_PATHS.map((w, i) => (
            <path key={i} d={w.d} fill="none"
              stroke="url(#waterFill)" strokeWidth={w.w} strokeLinecap="round" />
          ))}

          {/* ── Tertiary roads (faint) ── */}
          {TERTIARY_ROADS.map((r, i) => (
            <path key={i} d={r.d} fill="none"
              stroke="#d6cfc5" strokeWidth={r.w} strokeLinecap="round" />
          ))}

          {/* ── Secondary roads ── */}
          {SECONDARY_ROADS.map((r, i) => (
            <g key={i}>
              {/* Casing */}
              <path d={r.d} fill="none" stroke="#ccc5ba" strokeWidth={r.w + 2.5} strokeLinecap="round" />
              {/* Surface */}
              <path d={r.d} fill="none" stroke="#f5f0e8" strokeWidth={r.w} strokeLinecap="round" />
            </g>
          ))}

          {/* ── Major roads (white, wider) ── */}
          {MAJOR_ROADS.map((r, i) => (
            <g key={i}>
              <path d={r.d} fill="none" stroke="#c4bcb0" strokeWidth={r.w + 5} strokeLinecap="round" />
              <path d={r.d} fill="none" stroke="#ffffff"  strokeWidth={r.w} strokeLinecap="round" />
            </g>
          ))}

          {/* ── Neighbourhood labels ── */}
          {LABELS.map((l, i) => (
            <text key={i} x={l.x} y={l.y}
              textAnchor="middle"
              fill={l.bold ? "#8a8070" : "#aca398"}
              fontSize={l.s}
              fontFamily="'DM Sans', 'Segoe UI', system-ui, sans-serif"
              fontWeight={l.bold ? "700" : "500"}
              letterSpacing="0.9"
            >
              {l.t}
            </text>
          ))}

          {/* ══════════════════════════════════════
              ACTIVE ROUTE LAYER
          ══════════════════════════════════════ */}
          {isVisible && cleanPath && (
            <>
              {/* Hidden path for length measurement */}
              <path ref={measureRef} d={cleanPath}
                fill="none" stroke="transparent" strokeWidth="1" />

              {/* 1. Thick white CASING (outermost border) */}
              <motion.path
                key={`casing-${animKey}`}
                d={cleanPath}
                fill="none"
                stroke="white"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                initial={{ strokeDashoffset: pathLen }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
              />

              {/* 2. Colored route line */}
              <motion.path
                key={`route-${animKey}`}
                d={cleanPath}
                fill="none"
                stroke={routeColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                initial={{ strokeDashoffset: pathLen }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
              />

              {/* 3. Subtle white shimmer on top */}
              <motion.path
                key={`shimmer-${animKey}`}
                d={cleanPath}
                fill="none"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLen}
                initial={{ strokeDashoffset: pathLen }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.15 }}
              />

              {/* 4. Moving dot traveller */}
              <MovingDot pathD={cleanPath} dotColor={routeColor} animKey={animKey} />

              {/* 5. Callout card */}
              {pathInfo && (
                <RouteCallout
                  x={pathInfo.calloutX}
                  y={pathInfo.calloutY}
                  time={formatTime(route.estimatedTime)}
                  distance={route.distance}
                  trafficHex={traffic.hex}
                  delay={1.2}
                />
              )}

              {/* 6. Origin pin (green) */}
              {pathInfo && (
                <TearPin
                  x={pathInfo.x1} y={pathInfo.y1}
                  color="#1a7a50"
                  label={route.from}
                  delay={0.5}
                  isEnd={false}
                />
              )}

              {/* 7. Destination pin (red) */}
              {pathInfo && (
                <TearPin
                  x={pathInfo.x2} y={pathInfo.y2}
                  color="#c5221f"
                  label={route.to}
                  delay={1.6}
                  isEnd={true}
                />
              )}
            </>
          )}

          {/* ── Map chrome ── */}
          {/* Scale bar */}
          <g>
            <rect x={536} y={375} width={84} height={15} rx={3} fill="white" opacity={0.88}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }} />
            <line x1={546} y1={384} x2={612} y2={384} stroke="#555" strokeWidth="1" />
            <line x1={546} y1={380} x2={546} y2={388} stroke="#555" strokeWidth="1" />
            <line x1={612} y1={380} x2={612} y2={388} stroke="#555" strokeWidth="1" />
            <text x={579} y={381} textAnchor="middle"
              fill="#555" fontSize="6.5" fontFamily="system-ui" fontWeight="600">5 km</text>
          </g>

          {/* North indicator */}
          <g>
            <rect x={8} y={8} width={26} height={30} rx={5} fill="white" opacity={0.92}
              style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.14))" }} />
            <text x={21} y={21} textAnchor="middle"
              fill="#1a73e8" fontSize="9" fontFamily="system-ui" fontWeight="800">N</text>
            <text x={21} y={32} textAnchor="middle"
              fill="#555" fontSize="11" fontFamily="system-ui">↑</text>
          </g>

          {/* City watermark */}
          <text x={16} y={396} fill="#a09888" fontSize="8.5"
            fontFamily="system-ui" fontWeight="700" letterSpacing="2.5">LAHORE</text>
        </svg>
      </div>

      {/* ── Waypoint pills (dark footer strip) ── */}
      <AnimatePresence>
        {isVisible && route?.waypoints?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-2"
          >
            <span className="text-slate-500 text-xs self-center mr-1 font-medium">Via:</span>
            {route.waypoints.map((wp, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.12 }}
                className="text-xs text-slate-300 bg-slate-800 border border-slate-700
                           px-2.5 py-1 rounded-full flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: routeColor }} />
                {wp}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}