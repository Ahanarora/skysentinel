import { html, raw, cx, escape } from "../lib/html.js";

// Simulated CCTV views, drawn as simple line/shape illustrations in a
// 320×180 viewBox. They are deliberately schematic: they read as camera
// feeds without pretending to be real footage. Colours come from CSS classes
// (.s0–.s3 surfaces, .ln lines, .lt lights, .pp people) so the whole family
// can be re-themed from styles/components.css.

const W = 320;
const H = 180;

const person = (x, y, h = 60) => {
  const head = h * 0.11;
  const top = y + head * 2 + 2;
  const w = h * 0.34;
  return `<circle class="pp" cx="${x}" cy="${y + head}" r="${head}"/><path class="pp" d="M${x - w / 2} ${y + h} V${top + w * 0.35} a${w / 2} ${w * 0.35} 0 0 1 ${w} 0 V${y + h} Z"/>`;
};

const range = (from, to, step) => {
  const out = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
};

const SCENES = {
  gate: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="40" width="112" height="78"/>
    ${range(8, 104, 16).map((x) => `<path class="ln" d="M${x} 40v78"/>`).join("")}
    <polygon class="s1" points="0,118 320,118 320,180 0,180"/>
    <path class="ln" d="M126 180 150 118M250 180 196 118"/>
    <path class="ln ln--dash" d="M188 180 173 118"/>
    <rect class="s3" x="112" y="50" width="9" height="70"/>
    <rect class="s3" x="176" y="50" width="9" height="70"/>
    <path class="lt-stroke" d="M121 90h55"/>
    <rect class="s3" x="204" y="58" width="56" height="9"/>
    <rect class="s2" x="208" y="67" width="48" height="75"/>
    <rect class="s0" x="214" y="76" width="36" height="24"/>
    <path class="ln" d="M222 100v-8h10v8M227 92v-4"/>
    <rect class="s3" x="240" y="106" width="11" height="36"/>
    <path class="ln" d="M292 118V32"/><circle class="lt" cx="292" cy="30" r="4"/>`,

  perimeter: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="38" width="${W}" height="58"/>
    ${range(-40, 320, 18).map((x) => `<path class="ln ln--faint" d="M${x} 38l58 58M${x + 58} 38l-58 58"/>`).join("")}
    ${range(0, 320, 64).map((x) => `<rect class="s3" x="${x}" y="30" width="4" height="66"/>`).join("")}
    <path class="ln" d="M0 38h320M0 96h320"/>
    <polygon class="s1" points="0,96 320,96 320,180 0,180"/>
    <path class="ln ln--dash" d="M0 150h320"/>
    ${person(187, 74, 66)}
    <path class="ln" d="M40 150V20"/><circle class="lt" cx="40" cy="18" r="4"/>`,

  dock: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="18" width="${W}" height="112"/>
    ${[26, 124, 222]
      .map(
        (x) => `<rect class="s3" x="${x}" y="46" width="72" height="84"/>${range(54, 124, 10)
          .map((y) => `<path class="ln ln--faint" d="M${x} ${y}h72"/>`)
          .join("")}<rect class="s0" x="${x + 4}" y="126" width="10" height="8"/><rect class="s0" x="${x + 58}" y="126" width="10" height="8"/>`
      )
      .join("")}
    <polygon class="s1" points="0,134 320,134 320,180 0,180"/>
    <path class="lt-stroke lt-stroke--dash" d="M0 134h320"/>
    <circle class="lt" cx="62" cy="34" r="3"/><circle class="lt" cx="160" cy="34" r="3"/><circle class="lt" cx="258" cy="34" r="3"/>`,

  lobby: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="0" width="${W}" height="112"/>
    <polygon class="s1" points="0,112 320,112 320,180 0,180"/>
    ${range(40, 300, 52).map((x) => `<path class="ln ln--faint" d="M${x} 112 ${x + (x - 160) * 0.8} 180"/>`).join("")}
    <rect class="s0" x="226" y="36" width="64" height="76"/>
    <path class="ln" d="M258 36v76M226 36h64"/>
    <polygon class="s3" points="56,108 184,108 176,138 64,138"/>
    <rect class="s3" x="56" y="100" width="128" height="8"/>
    <path class="ln" d="M100 60h40v26h-40z"/>
    <ellipse class="lt" cx="70" cy="8" rx="14" ry="3"/><ellipse class="lt" cx="170" cy="8" rx="14" ry="3"/>`,

  corridor: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <polygon class="s2" points="0,0 132,64 132,112 0,180"/>
    <polygon class="s2" points="320,0 188,64 188,112 320,180"/>
    <polygon class="s1" points="0,180 320,180 188,112 132,112"/>
    <polygon class="s0" points="0,0 320,0 188,64 132,64"/>
    <rect class="s3" x="132" y="64" width="56" height="48"/>
    <polygon class="s3" points="36,48 62,60 62,136 36,150"/>
    <polygon class="s3" points="284,48 258,60 258,136 284,150"/>
    <polygon class="s3" points="92,76 104,82 104,122 92,128"/>
    <polygon class="lt" points="140,18 180,18 176,26 144,26"/><polygon class="lt" points="150,44 170,44 168,48 152,48"/>
    <path class="ln ln--faint" d="M0 180 132 112M320 180 188 112"/>`,

  parking: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="0" width="${W}" height="62"/>
    ${range(10, 310, 50).map((x) => `<rect class="s0" x="${x}" y="30" width="28" height="4"/>`).join("")}
    <polygon class="s1" points="0,62 320,62 320,180 0,180"/>
    ${range(-60, 360, 70).map((x) => `<path class="ln" d="M${x} 180 ${160 + (x - 160) * 0.45} 62"/>`).join("")}
    ${[
      [36, 108],
      [180, 100],
    ]
      .map(
        ([x, y]) =>
          `<rect class="s3" x="${x}" y="${y}" width="84" height="44" rx="10"/><rect class="s0" x="${x + 14}" y="${y + 8}" width="56" height="14" rx="4"/><rect class="lt" x="${x + 6}" y="${y + 32}" width="10" height="4" rx="2"/><rect class="lt" x="${x + 68}" y="${y + 32}" width="10" height="4" rx="2"/>`
      )
      .join("")}`,

  aisle: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <polygon class="s1" points="70,180 250,180 178,92 142,92"/>
    <polygon class="s2" points="0,0 142,70 142,92 70,180 0,180"/>
    <polygon class="s2" points="320,0 178,70 178,92 250,180 320,180"/>
    ${[0.2, 0.42, 0.64, 0.86]
      .map((t) => {
        const yL = 180 * t;
        return `<path class="ln" d="M0 ${yL} 142 ${70 + 22 * t}M320 ${yL} 178 ${70 + 22 * t}"/>`;
      })
      .join("")}
    <rect class="s3" x="18" y="46" width="30" height="22"/><rect class="s3" x="60" y="96" width="24" height="18"/>
    <rect class="s3" x="266" y="52" width="32" height="24"/><rect class="s3" x="236" y="104" width="22" height="16"/>
    <path class="lt-stroke lt-stroke--dash" d="M160 180V92"/>`,

  stairs: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="0" width="${W}" height="${H}"/>
    <polygon class="s1" points="40,180 40,156 80,156 80,132 120,132 120,108 160,108 160,84 200,84 200,60 240,60 240,36 280,36 280,180"/>
    <path class="ln" d="M40 156h40v-24h40v-24h40v-24h40v-24h40v-24h40"/>
    <path class="lt-stroke" d="M36 128 276 8"/>
    ${range(60, 260, 40).map((x) => `<path class="ln ln--faint" d="M${x} ${138 - (x - 36) * 0.5}v24"/>`).join("")}
    <rect class="s0" x="290" y="60" width="22" height="120"/>`,

  yard: () => `
    <rect class="s0" width="${W}" height="${H}"/>
    <rect class="s2" x="0" y="0" width="${W}" height="100"/>
    <polygon class="s1" points="0,100 320,100 320,180 0,180"/>
    <rect class="s3" x="18" y="46" width="118" height="56"/>
    ${range(26, 130, 9).map((x) => `<path class="ln ln--faint" d="M${x} 50v48"/>`).join("")}
    <rect class="s3" x="146" y="62" width="84" height="40"/>
    ${range(152, 226, 9).map((x) => `<path class="ln ln--faint" d="M${x} 66v32"/>`).join("")}
    <rect class="s3" x="252" y="118" width="22" height="30" rx="2"/><rect class="s3" x="280" y="118" width="22" height="30" rx="2"/>
    <path class="ln ln--dash" d="M0 160h320"/>
    <path class="ln" d="M300 100V28"/><circle class="lt" cx="300" cy="26" r="4"/>`,
};

export const sceneNames = Object.keys(SCENES);

/**
 * Detection overlay drawn in scene coordinates.
 * Human: a dashed, rounded annotation (a person marked this).
 * AI: crisp corner brackets plus the configured detection zone.
 */
function overlaySvg(detection, overlay) {
  if (!overlay) return "";
  const [x, y, w, h] = overlay.box;
  const note = overlay.note ? escape(overlay.note) : "";
  const tagW = Math.round(note.length * 5.1 + 14);
  const tagX = Math.min(Math.max(x + w / 2 - tagW / 2, 4), W - tagW - 4);
  const tagY = y - 20 < 4 ? y + h + 4 : y - 20;
  const tag = note
    ? `<g class="ov-tag"><rect x="${tagX}" y="${tagY}" width="${tagW}" height="15" rx="3"/><text x="${tagX + 7}" y="${tagY + 10.5}">${note}</text></g>`
    : "";

  if (detection === "ai") {
    const c = Math.min(w, h) * 0.3;
    const zone = overlay.zone ? `<polygon class="ov-zone" points="${overlay.zone}"/>` : "";
    return `<g class="ov ov--ai">${zone}<path class="ov-box" d="M${x} ${y + c}V${y}h${c}M${x + w - c} ${y}h${c}v${c}M${x + w} ${y + h - c}v${c}h${-c}M${x + c} ${y + h}h${-c}v${-c}"/>${tag}</g>`;
  }
  return `<g class="ov ov--human"><rect class="ov-box" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${tag}</g>`;
}

export function cctvScene(name, { detection, overlay } = {}) {
  const draw = SCENES[name] || SCENES.corridor;
  return raw(
    `<svg class="cctv__scene" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${draw()}${overlaySvg(detection, overlay)}</svg>`
  );
}

/**
 * A single camera view with HUD. `time` is shown as the camera clock;
 * `live` lets the client script tick it forward.
 */
export function cctvView({ scene, id, location, site, time = "02:15:00", detection, overlay, live = false, compact = false, className }) {
  return html`<div class="${cx("cctv", compact && "cctv--compact", detection && `cctv--${detection}`, className)}">
    ${cctvScene(scene, { detection, overlay })}
    <div class="cctv__hud" aria-hidden="true">
      <span class="cctv__label">${id}${location && html` · ${location}`}</span>
      <span class="cctv__rec"><span class="cctv__dot"></span><span ${live ? raw("data-clock") : ""}>${time}</span></span>
      ${site && !compact && html`<span class="cctv__site">${site}</span>`}
    </div>
  </div>`;
}
