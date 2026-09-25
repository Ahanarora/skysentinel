import { raw } from "../lib/html.js";

// 24×24 stroke icons, drawn in currentColor. Decorative by default.
const PATHS = {
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  person: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/>',
  layers: '<path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/>',
  camera: '<path d="M3 8.5 15.5 5l1.8 5.6L4.8 14.1 3 8.5Z"/><path d="m17 8 3.5-1v5l-3.3-.6"/><path d="M8 13.5V19H4"/>',
  building: '<path d="M4 20V6l8-2v16M12 8l8 2v10M3 20h18"/><path d="M7.5 8.5h1M7.5 12h1M7.5 15.5h1M15.5 12h1M15.5 15.5h1"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  alert: '<path d="M12 4 3.5 19h17L12 4Z"/><path d="M12 10v4M12 16.8v.2"/>',
  alertCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 15.8v.2"/>',
  minusCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12h8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  pause: '<path d="M9 6v12M15 6v12"/>',
  play: '<path d="M8 5.5v13l10-6.5-10-6.5Z"/>',
  phone: '<path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  quote: '<path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h5V7ZM10 12c0 3-1.5 4.5-4 5M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h5V7ZM19 12c0 3-1.5 4.5-4 5"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  shield: '<path d="M12 3.5 19 6v5.5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-2.5Z"/>',
  shieldCheck: '<path d="M12 3.5 19 6v5.5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-2.5Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2"/>',
  server: '<rect x="4" y="4.5" width="16" height="6" rx="1.5"/><rect x="4" y="13.5" width="16" height="6" rx="1.5"/><path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h5M11 16.5h5"/>',
  videoOff: '<path d="M3.5 7.5h9.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 15V7.5ZM14.5 11l6-3.5v9l-6-3.5"/><path d="m3 3 18 18"/>',
  file: '<path d="M6.5 3.5h7l4 4v13h-11v-17Z"/><path d="M13.5 3.5v4h4M9 12h6M9 15.5h6"/>',
  pulse: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
  userCheck: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20a6.5 6.5 0 0 1 11.5-4.1M15.5 18.5l2 2 4-4"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="m7 7 10 10M17 7 7 17"/>',
  headset: '<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3.5" y="13.5" width="4" height="6" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="6" rx="1.5"/><path d="M18.5 19.5c0 1-1.5 1.5-4 1.5"/>',
  school: '<path d="m3 9 9-4.5L21 9l-9 4.5L3 9Z"/><path d="M7 11v5c1.5 1.5 3 2 5 2s3.5-.5 5-2v-5M21 9v5"/>',
  home: '<path d="M4 11 12 4.5l8 6.5M6 9.5V20h12V9.5"/><path d="M10 20v-5.5h4V20"/>',
  briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5h6v2M3.5 12.5h17"/>',
  warehouse: '<path d="M3 20V9l9-5 9 5v11"/><path d="M7 20v-7h10v7M7 16h10"/>',
  hospital: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  landmark: '<path d="M3.5 9.5 12 4.5l8.5 5M5 9.5h14M6.5 9.5v8M10 9.5v8M14 9.5v8M17.5 9.5v8M4 20h16"/>',
  store: '<path d="M4 9.5 5.5 4.5h13L20 9.5M4 9.5c0 1.5 1.2 2.5 2.7 2.5S9.3 11 9.3 9.5c0 1.5 1.2 2.5 2.7 2.5s2.7-1 2.7-2.5c0 1.5 1.2 2.5 2.6 2.5S20 11 20 9.5"/><path d="M5.5 12v8h13v-8M10 20v-4.5h4V20"/>',
  hardhat: '<path d="M3.5 17.5h17M5 17.5V15a7 7 0 0 1 14 0v2.5M10 8.5V6.5h4v2M10 8.5v4M14 8.5v4"/>',
  factory: '<path d="M3.5 20V10l5 3v-3l5 3v-3l5 3V4.5h2V20h-17Z"/><path d="M7 16.5h2M11.5 16.5h2"/>',
};

export function icon(name, { size = 20, className = "icon", label } = {}) {
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return raw(
    `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${PATHS[name]}</svg>`
  );
}
