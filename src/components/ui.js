import { html, cx, attr } from "../lib/html.js";
import { site } from "../content/site.js";
import { detectionSources, severities, eventTypes } from "../content/demo-data.js";
import { icon } from "./icons.js";

export function button({ label, href, variant = "primary", size, track, iconAfter, className }) {
  return html`<a class="${cx("btn", `btn--${variant}`, size && `btn--${size}`, className)}" href="${href}"${attr("data-track", track)}>
    <span>${label}</span>${iconAfter && icon(iconAfter, { size: 18 })}
  </a>`;
}

/** The site-wide commercial CTA. `track` identifies its placement in analytics. */
export const demoButton = ({ track, variant = "primary", size, className } = {}) =>
  button({ ...site.primaryCta, variant, size, track: `book-demo:${track}`, iconAfter: "arrowRight", className });

export function sectionHead({ eyebrow, headline, body, align = "start", headingLevel = 2, id, className }) {
  const lines = Array.isArray(headline) ? headline : [headline];
  const heading = lines.map((line, i) => html`${i > 0 && html`<br />`}<span>${line}</span>`);
  const h =
    headingLevel === 1
      ? html`<h1 class="section-head__title"${attr("id", id)}>${heading}</h1>`
      : html`<h2 class="section-head__title"${attr("id", id)}>${heading}</h2>`;
  return html`<header class="${cx("section-head", `section-head--${align}`, className)}">
    ${eyebrow && html`<p class="eyebrow">${eyebrow}</p>`}
    ${h}
    ${body && html`<p class="section-head__body">${body}</p>`}
  </header>`;
}

/** Visible marker on unapproved content in draft builds. */
export const todoTag = (text = "TODO") => html`<span class="todo-tag">${text}</span>`;
export const verifyTag = () => html`<span class="todo-tag todo-tag--verify" title="Carried over from the previous website; confirm before launch">Verify</span>`;

/** Returns the right draft marker for a content item, if any. */
export const draftMarker = (item) =>
  item?.placeholder ? todoTag("Placeholder") : item?.verified === false ? verifyTag() : "";

/** A designed empty slot for a custom visual asset that has not been supplied. */
export function assetSlot({ label, ratio = "16 / 9", className }) {
  return html`<div class="${cx("asset-slot", className)}" style="aspect-ratio:${ratio}" role="img" aria-label="Placeholder: ${label}">
    ${todoTag("Visual asset")}
    <span class="asset-slot__label">${label}</span>
  </div>`;
}

export function detectionBadge(source, { short = false } = {}) {
  const meta = detectionSources[source];
  if (!meta) return "";
  return html`<span class="${cx("det", `det--${source}`)}">
    ${icon(source === "ai" ? "scan" : "headset", { size: 14 })}<span>${short ? meta.short : meta.label}</span>
  </span>`;
}

const SEVERITY_ICON = { critical: "alert", semi: "alertCircle", general: "minusCircle" };

export function severityBadge(key) {
  const meta = severities[key];
  if (!meta) return "";
  return html`<span class="${cx("sev", `sev--${key}`)}">${icon(SEVERITY_ICON[key], { size: 13 })}<span>${meta.label}</span></span>`;
}

export const statusLabel = (status) =>
  html`<span class="${cx("status", `status--${String(status).toLowerCase()}`)}">${status}</span>`;

/** Resolve an incident/event record against the approved event types. */
export function resolveEvent(event) {
  if (!event) return null;
  const type = event.type ? eventTypes[event.type] : null;
  return {
    ...event,
    title: type?.title ?? event.title,
    detection: type?.detection ?? event.detection,
    category: type?.category ?? event.category,
  };
}

/**
 * Brand logo. `onDark` rounds the artwork's white background into a tile for
 * dark surfaces; `height` is the rendered height in px (width follows the
 * artwork's aspect ratio).
 */
export function wordmark({ className, onDark = false, height = 40 } = {}) {
  const { logo } = site;
  if (logo.src) {
    return html`<img class="${cx("logo", onDark && "logo--on-dark", className)}" src="${logo.src}" alt="${logo.alt}" width="${Math.round(height * logo.ratio)}" height="${height}" style="height:${height}px" />`;
  }
  // Fallback text wordmark, used only when no logo file is configured.
  return html`<span class="${cx("wordmark", className)}">
    <svg class="wordmark__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="66 13" stroke-linecap="round" transform="rotate(-50 16 16)" />
      <circle cx="16" cy="16" r="4" class="wordmark__dot" />
    </svg>
    <span class="wordmark__text">Promind<span class="wordmark__num">360</span></span>
  </span>`;
}
