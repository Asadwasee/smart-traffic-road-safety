/**
 * Each location has:
 *  - mapX / mapY: pixel coords on a 560×340 SVG canvas (approximate Lahore geography)
 *  - zone:        rough area of the city for clustering
 */
export const LOCATIONS = {
  "Gulberg":                { mapX: 210, mapY: 155, zone: "central" },
  "Model Town":             { mapX: 155, mapY: 185, zone: "central" },
  "Garden Town":            { mapX: 175, mapY: 165, zone: "central" },
  "Cantonment":             { mapX: 295, mapY: 145, zone: "east" },
  "Cavalry Ground":         { mapX: 315, mapY: 130, zone: "east" },
  "DHA Phase 1":            { mapX: 310, mapY: 210, zone: "south" },
  "DHA Phase 5":            { mapX: 360, mapY: 255, zone: "south" },
  "Johar Town":             { mapX: 140, mapY: 220, zone: "west" },
  "Township":               { mapX: 105, mapY: 235, zone: "west" },
  "Bahria Town":            { mapX: 75,  mapY: 280, zone: "outskirts" },
  "Raiwind Road":           { mapX: 285, mapY: 295, zone: "south" },
  "Walled City (Anarkali)": { mapX: 345, mapY: 100, zone: "old city" },
  "Shahdara":               { mapX: 380, mapY: 60,  zone: "north" },
  "Allama Iqbal Airport":   { mapX: 240, mapY: 290, zone: "south" },
  "Faisal Town":            { mapX: 185, mapY: 205, zone: "central" },
};

export const LOCATION_NAMES = Object.keys(LOCATIONS);

/**
 * Predefined routes for commonly searched pairs.
 * For all other pairs, routeUtils.js generates dynamic data.
 */
export const PREDEFINED_ROUTES = [
  {
    from: "Gulberg", to: "DHA Phase 5",
    label: "Jail Road → Canal Bank Rd → Defence",
    waypoints: ["Kalma Chowk", "Canal Bank Road", "Defence Chowk"],
    trafficLevel: "medium",
  },
  {
    from: "Johar Town", to: "Allama Iqbal Airport",
    label: "Ferozepur Rd → Thokar → Airport Link",
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
    label: "Gaddafi Stadium → Mall Rd → Circular Road",
    waypoints: ["Gaddafi Stadium", "Mall Road"],
    trafficLevel: "high",
  },
  {
    from: "Cavalry Ground", to: "DHA Phase 5",
    label: "Sarwar Rd → Cantt → Defence Road",
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
    label: "GT Road → Shahdara Bridge → North",
    waypoints: ["GT Road Bridge"],
    trafficLevel: "low",
  },
];

/** Road name banks for dynamic route generation */
export const ROAD_NAMES = [
  "Ferozepur Road", "Canal Bank Road", "Ring Road",
  "Jail Road", "Mall Road", "Wahdat Road",
  "Raiwind Road", "Barki Road", "GT Road",
  "Main Boulevard", "Defence Road", "Thokar Niaz Baig",
];

export const ALT_ROAD_NAMES = [
  "Ring Road Bypass", "Inner Ring Road", "Canal Road",
  "Circular Road", "Airport Link Road", "Defence Expressway",
  "Raiwind Bypass", "Model Town Link", "GT Road",
];