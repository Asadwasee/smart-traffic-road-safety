/**
 * Map canvas: 640 × 400 px
 * Coordinates approximate real Lahore geography
 */
export const LOCATIONS = {
  "Gulberg":                { x: 248, y: 188 },
  "Model Town":             { x: 178, y: 220 },
  "Garden Town":            { x: 205, y: 200 },
  "Cantonment":             { x: 348, y: 172 },
  "Cavalry Ground":         { x: 372, y: 152 },
  "DHA Phase 1":            { x: 358, y: 255 },
  "DHA Phase 5":            { x: 415, y: 305 },
  "Johar Town":             { x: 155, y: 262 },
  "Township":               { x: 115, y: 282 },
  "Bahria Town":            { x: 78,  y: 335 },
  "Raiwind Road":           { x: 328, y: 355 },
  "Walled City (Anarkali)": { x: 400, y: 118 },
  "Shahdara":               { x: 438, y: 72  },
  "Allama Iqbal Airport":   { x: 278, y: 348 },
  "Faisal Town":            { x: 215, y: 242 },
};

export const LOCATION_NAMES = Object.keys(LOCATIONS);

export const PREDEFINED_ROUTES = [
  {
    from: "Gulberg", to: "DHA Phase 5",
    label: "Jail Road → Canal Bank Rd",
    waypoints: ["Kalma Chowk", "Canal Bank Road", "Defence Chowk"],
    trafficLevel: "medium",
  },
  {
    from: "Johar Town", to: "Allama Iqbal Airport",
    label: "Ferozepur Rd → Airport Link",
    waypoints: ["Thokar Niaz Baig", "Raiwind Chowk"],
    trafficLevel: "high",
  },
  {
    from: "Model Town", to: "Cantonment",
    label: "Wahdat Rd → Davis Rd → Mall Road",
    waypoints: ["Wahdat Road", "GPO Chowk"],
    trafficLevel: "low",
  },
  {
    from: "Bahria Town", to: "Gulberg",
    label: "Raiwind Rd → Ring Road → Kalma Chowk",
    waypoints: ["Ring Road", "Kalma Chowk"],
    trafficLevel: "medium",
  },
  {
    from: "DHA Phase 1", to: "Walled City (Anarkali)",
    label: "Gaddafi Stadium → Mall Road",
    waypoints: ["Gaddafi Stadium", "Mall Road"],
    trafficLevel: "high",
  },
  {
    from: "Cavalry Ground", to: "DHA Phase 5",
    label: "Sarwar Rd → Cantt → Defence",
    waypoints: ["Sarwar Road"],
    trafficLevel: "low",
  },
  {
    from: "Gulberg", to: "Allama Iqbal Airport",
    label: "Ferozepur Rd → Canal → Airport Expressway",
    waypoints: ["Ferozepur Road", "Thokar Niaz Baig"],
    trafficLevel: "medium",
  },
  {
    from: "Walled City (Anarkali)", to: "Shahdara",
    label: "GT Road → Shahdara Bridge",
    waypoints: ["GT Road Bridge"],
    trafficLevel: "low",
  },
  {
    from: "Township", to: "Cantonment",
    label: "Ferozepur Rd → Jail Rd → Mall Road",
    waypoints: ["Ferozepur Road", "Jail Road"],
    trafficLevel: "medium",
  },
  {
    from: "Bahria Town", to: "Allama Iqbal Airport",
    label: "Raiwind Rd → Canal → Airport Link",
    waypoints: ["Raiwind Road", "Canal Bank Road"],
    trafficLevel: "high",
  },
];

export const ROAD_NAMES = [
  "Ferozepur Road", "Canal Bank Road", "Ring Road",
  "Jail Road", "Mall Road", "Wahdat Road",
  "Raiwind Road", "Barki Road", "GT Road",
  "Main Boulevard", "Defence Road", "Thokar Niaz Baig",
  "Lawrence Road", "Club Road", "Sanda Road",
];

export const ALT_ROAD_NAMES = [
  "Ring Road Bypass", "Inner Ring Road", "Canal Road",
  "Circular Road", "Airport Link Road", "Defence Expressway",
  "Raiwind Bypass", "Model Town Link", "GT Road",
  "Barki Road", "Wahdat Road Alternate",
];