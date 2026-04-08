import { LOCATIONS, PREDEFINED_ROUTES, ROAD_NAMES, ALT_ROAD_NAMES } from "../data/routeData";

/* ── Deterministic hash so same pair always yields same result ── */
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function seeded(seed, min, max) {
  const x = Math.sin(seed + 1) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

/* ── Pixel → km conversion (640px canvas, Lahore ~36km wide) ── */
function pxDistKm(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return +((Math.sqrt(dx * dx + dy * dy)) * 0.185).toFixed(1);
}

const SPEED = { low: 44, medium: 27, high: 15 };

/* ── Main route finder ── */
export function findRoute(fromName, toName) {
  if (!fromName || !toName || fromName === toName) return null;

  const pre = PREDEFINED_ROUTES.find(r =>
    (r.from === fromName && r.to === toName) ||
    (r.from === toName   && r.to === fromName)
  );

  const a       = LOCATIONS[fromName];
  const b       = LOCATIONS[toName];
  const dist    = pxDistKm(a, b);
  const seed    = hash(fromName + toName);
  const altSeed = hash(toName + fromName + "x7");
  const level   = pre ? pre.trafficLevel : ["low", "medium", "high"][seeded(seed, 0, 2)];
  const estTime = Math.max(5, Math.round((dist / SPEED[level]) * 60));

  const waypoints = pre
    ? pre.waypoints
    : [...new Set(
        Array.from({ length: seeded(seed, 1, 3) }, (_, i) =>
          ROAD_NAMES[(seed + i * 7) % ROAD_NAMES.length]
        )
      )];

  const altRoad = ALT_ROAD_NAMES[altSeed % ALT_ROAD_NAMES.length];
  const altTime = estTime + seeded(altSeed, 5, 15);
  const label   = pre
    ? pre.label
    : `${ROAD_NAMES[seed % ROAD_NAMES.length]} → ${waypoints[waypoints.length - 1]}`;

  return {
    from: fromName, to: toName,
    fromCoords: a,  toCoords: b,
    routeName: label,
    distance: `${dist} km`,
    estimatedTime: estTime,
    trafficLevel: level,
    waypoints,
    alternateRoute: altRoad,
    alternateTime: altTime,
  };
}

/* ── Color tokens ── */
export function getTrafficColor(level) {
  const m = {
    low:    { hex:"#10b981", glow:"rgba(16,185,129,0.3)",  bg:"rgba(16,185,129,0.08)",  border:"rgba(16,185,129,0.25)", label:"Low Traffic"     },
    medium: { hex:"#f59e0b", glow:"rgba(245,158,11,0.3)",  bg:"rgba(245,158,11,0.08)",  border:"rgba(245,158,11,0.25)", label:"Moderate Traffic" },
    high:   { hex:"#f43f5e", glow:"rgba(244,63,94,0.3)",   bg:"rgba(244,63,94,0.08)",   border:"rgba(244,63,94,0.25)", label:"Heavy Traffic"    },
  };
  return m[level] || m.medium;
}

/* ─────────────────────────────────────────────────────────────────────
   buildRoutePath — produces a Google-Maps-style multi-segment path
   with bezier-rounded corners (no sharp L-turns).

   Canvas: 640 × 400. All coords clamped to 30px padding.
───────────────────────────────────────────────────────────────────── */
export function buildRoutePath(from, to, level) {
  const PAD = 32;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const x1 = clamp(from.x, PAD, 640 - PAD);
  const y1 = clamp(from.y, PAD, 400 - PAD);
  const x2 = clamp(to.x,   PAD, 640 - PAD);
  const y2 = clamp(to.y,   PAD, 400 - PAD);

  const dx   = x2 - x1;
  const dy   = y2 - y1;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const R    = 18; // corner bezier radius

  const sx = Math.sign(dx) || 1;
  const sy = Math.sign(dy) || 1;

  let pathD;

  if (level === "low") {
    /*
     * Clean 2-turn path: go horizontal to midX, then vertical to y2.
     *   Start → [corner1] → mid column → [corner2] → End
     * Rounded with quadratic beziers.
     */
    const c1x = midX - sx * R;
    const c2y = y2   - sy * R;

    pathD = [
      `M ${x1} ${y1}`,
      `L ${c1x} ${y1}`,
      `Q ${midX} ${y1} ${midX} ${y1 + sy * R}`,
      `L ${midX} ${c2y}`,
      `Q ${midX} ${y2} ${midX + sx * R} ${y2}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  } else if (level === "medium") {
    /*
     * 3-turn path for medium: horizontal third → vertical → horizontal.
     * More realistic city routing.
     */
    const third  = x1 + dx / 3;
    const twoThird = x1 + (dx * 2) / 3;
    const midRouteY = midY;

    pathD = [
      `M ${x1} ${y1}`,
      `L ${third - sx * R} ${y1}`,
      `Q ${third} ${y1} ${third} ${y1 + sy * R}`,
      `L ${third} ${midRouteY - sy * R}`,
      `Q ${third} ${midRouteY} ${third + sx * R} ${midRouteY}`,
      `L ${twoThird - sx * R} ${midRouteY}`,
      `Q ${twoThird} ${midRouteY} ${twoThird} ${midRouteY + sy * R}`,
      `L ${twoThird} ${y2 - sy * R}`,
      `Q ${twoThird} ${y2} ${twoThird + sx * R} ${y2}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  } else {
    /*
     * High traffic — zigzag detour with 4 turns, like Google Maps
     * showing a congested route that deviates significantly.
     */
    const jog    = Math.min(50, Math.abs(dy) * 0.4);
    const wx1    = x1 + dx * 0.28;
    const detoY  = y1 + sy * jog;           // detour bulge
    const wx2    = x1 + dx * 0.68;
    const retoY  = y2 - sy * jog;           // return bulge

    pathD = [
      `M ${x1} ${y1}`,
      `L ${wx1 - sx * R} ${y1}`,
      `Q ${wx1} ${y1} ${wx1} ${y1 + sy * R}`,
      `L ${wx1} ${detoY - sy * R}`,
      `Q ${wx1} ${detoY} ${wx1 + sx * R} ${detoY}`,
      `L ${wx2 - sx * R} ${detoY}`,
      `Q ${wx2} ${detoY} ${wx2} ${detoY + sy * R}`,
      `L ${wx2} ${retoY - sy * R}`,
      `Q ${wx2} ${retoY} ${wx2 + sx * R} ${retoY}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  }

  /* Callout bubble position: 40% along the path, shifted up */
  const calloutRawX = x1 + dx * 0.42;
  const calloutRawY = y1 + dy * 0.42 - 55;
  const calloutX = clamp(calloutRawX, 70, 570);
  const calloutY = clamp(calloutRawY, 18, 340);

  return { pathD, x1, y1, x2, y2, calloutX, calloutY };
}

/* ── Format minutes → string ── */
export function formatTime(m) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}