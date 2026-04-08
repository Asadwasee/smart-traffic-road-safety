import {
  LOCATIONS, PREDEFINED_ROUTES, ROAD_NAMES, ALT_ROAD_NAMES,
} from "../data/routeData";

/* ─── Tiny deterministic hash so same pair always gives same result ─── */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seededRand(seed, min, max) {
  const x = Math.sin(seed + 1) * 10000;
  const r = x - Math.floor(x);          // 0..1
  return Math.floor(r * (max - min + 1)) + min;
}

/* ─── Straight-line distance in km (Haversine approximation via px) ─── */
function pixelDistKm(a, b) {
  const dx = a.mapX - b.mapX;
  const dy = a.mapY - b.mapY;
  // 1 px ≈ 0.22 km on our canvas (Lahore ~35 km across, canvas 560 px wide)
  return +(Math.sqrt(dx * dx + dy * dy) * 0.22).toFixed(1);
}

/* ─── Traffic level seeded by pair ─── */
function trafficForPair(seed) {
  const v = seededRand(seed, 0, 2);
  return ["low", "medium", "high"][v];
}

/* ─── Speed table (km/h) ─── */
const SPEED = { low: 45, medium: 28, high: 16 };

/* ─── Main export ─── */
export function findRoute(fromName, toName) {
  if (!fromName || !toName || fromName === toName) return null;

  // Check predefined routes (both directions)
  const pre = PREDEFINED_ROUTES.find(
    (r) =>
      (r.from === fromName && r.to === toName) ||
      (r.from === toName   && r.to === fromName)
  );

  const fromLoc = LOCATIONS[fromName];
  const toLoc   = LOCATIONS[toName];

  const dist     = pixelDistKm(fromLoc, toLoc);
  const seed     = hashStr(fromName + toName);
  const altSeed  = hashStr(toName + fromName + "alt");

  const trafficLevel = pre ? pre.trafficLevel : trafficForPair(seed);
  const speed        = SPEED[trafficLevel];
  const estimatedTime = Math.max(5, Math.round((dist / speed) * 60));

  // Build waypoints
  let waypoints;
  if (pre) {
    waypoints = pre.waypoints;
  } else {
    const count = seededRand(seed, 1, 3);
    waypoints = Array.from({ length: count }, (_, i) =>
      ROAD_NAMES[(seed + i * 7) % ROAD_NAMES.length]
    );
    // deduplicate
    waypoints = [...new Set(waypoints)];
  }

  // Alternate route
  const altRoad     = ALT_ROAD_NAMES[altSeed % ALT_ROAD_NAMES.length];
  const altTimeDiff = seededRand(altSeed, 4, 12);
  const altTime     = estimatedTime + altTimeDiff;

  // Route label
  const routeLabel = pre
    ? pre.label
    : `${ROAD_NAMES[seed % ROAD_NAMES.length]} → ${waypoints[waypoints.length - 1]}`;

  return {
    from:          fromName,
    to:            toName,
    fromCoords:    fromLoc,
    toCoords:      toLoc,
    routeName:     routeLabel,
    distance:      `${dist} km`,
    estimatedTime,
    trafficLevel,
    waypoints,
    alternateRoute: altRoad,
    alternateTime:  altTime,
  };
}

/* ─── Color tokens ─── */
export function getTrafficColor(level) {
  const map = {
    low:    { hex: "#10b981", glow: "rgba(16,185,129,0.3)",  bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)", label: "Low Traffic"      },
    medium: { hex: "#f59e0b", glow: "rgba(245,158,11,0.3)",  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)", label: "Moderate Traffic"  },
    high:   { hex: "#f43f5e", glow: "rgba(244,63,94,0.3)",   bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)", label: "Heavy Traffic"     },
  };
  return map[level] || map.medium;
}

/* ─── Build a realistic-looking SVG path between two map coords ─── */
export function buildMapPath(fromCoords, toCoords, trafficLevel, waypointCount) {
  const { mapX: x1, mapY: y1 } = fromCoords;
  const { mapX: x2, mapY: y2 } = toCoords;

  // Clamp to canvas
  const pad = 30;
  const cx1 = Math.max(pad, Math.min(530, x1));
  const cy1 = Math.max(pad, Math.min(310, y1));
  const cx2 = Math.max(pad, Math.min(530, x2));
  const cy2 = Math.max(pad, Math.min(310, y2));

  // For "high traffic" add a detour jog; for others go corner-route
  const midX = (cx1 + cx2) / 2;
  const midY = (cy1 + cy2) / 2;

  let pathD;
  if (trafficLevel === "high") {
    // Zigzag detour
    const jog = waypointCount > 1 ? 35 : 20;
    pathD = `M ${cx1} ${cy1} L ${cx1} ${midY + jog} L ${midX - jog} ${midY + jog} L ${midX - jog} ${midY - jog} L ${cx2} ${midY - jog} L ${cx2} ${cy2}`;
  } else if (trafficLevel === "low") {
    // Clean two-turn L-shape
    pathD = `M ${cx1} ${cy1} L ${cx1} ${cy2} L ${cx2} ${cy2}`;
  } else {
    // Three-segment city-block path
    pathD = `M ${cx1} ${cy1} L ${cx1} ${midY} L ${cx2} ${midY} L ${cx2} ${cy2}`;
  }

  return { pathD, startX: cx1, startY: cy1, endX: cx2, endY: cy2, midX, midY };
}

/* ─── Format time ─── */
export function formatTime(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}