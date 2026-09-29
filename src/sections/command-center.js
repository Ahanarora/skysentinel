import { html, cx } from "../lib/html.js";
import { platform as p } from "../content/home.js";
import { commandCenter } from "../content/demo-data.js";
import { cctvView } from "../components/cctv.js";
import { icon } from "../components/icons.js";
import { detectionBadge, resolveEvent, sectionHead, severityBadge, statusLabel, wordmark } from "../components/ui.js";

// Product showcase. Real screenshots (platform.screenshots) take precedence;
// until they exist, a coded mockup built from demo data stands in.

const marker = (n) => html`<span class="app-marker" aria-hidden="true">${n}</span>`;

function screenshots() {
  return html`<div class="shots">
    ${p.screenshots.map(
      (s) => html`<figure class="shot">
        <img src="${s.src}" alt="${s.alt}" width="${s.width}" height="${s.height}" loading="lazy" decoding="async" />
        ${s.caption && html`<figcaption>${s.caption}</figcaption>`}
      </figure>`
    )}
  </div>`;
}

function mockup() {
  const d = resolveEvent(commandCenter.detail);
  const fields = [
    ["Site", d.site],
    ["Camera", d.camera],
    ["Detected", d.detectedAt],
    ["Category", d.category],
    ["Source", detectionBadge(d.detection)],
    ["Severity", severityBadge(d.severity)],
  ];

  return html`<figure class="app-figure">
    <figcaption class="visually-hidden">
      Illustrative Promind 360 incident view with demo data: an incident list beside the selected incident's
      evidence frame, details and assignee.
    </figcaption>
    <div class="app" aria-hidden="true">
      <div class="app__bar">
        ${wordmark({ height: 26 })}
        <span class="app__crumb">Incidents</span>
        <span class="app__search">${icon("search", { size: 14 })}Search incidents</span>
        <span class="app__demo">Demo data</span>
      </div>
      <div class="app__body">
        <nav class="app__rail">
          ${["grid", "list", "chart", "building"].map((name, i) => html`<span class="${cx("app__rail-item", i === 1 && "is-active")}">${icon(name, { size: 18 })}</span>`)}
        </nav>

        <div class="app__list">
          <div class="app__pane-head">
            <p>Incidents <span>Last 24 h</span></p>
            <div class="app__chips"><span class="is-active">All</span><span>Critical</span><span>Semi-critical</span><span>General</span></div>
          </div>
          <ul>
            ${commandCenter.incidents.map((raw) => {
              const e = resolveEvent(raw);
              return html`<li class="${cx("app__row", e.selected && "is-selected")}">
                <span class="app__row-id">${e.id}</span>
                <p class="app__row-title">${e.title}</p>
                <p class="app__row-meta">${e.site} · ${e.camera} · ${e.time}</p>
                <span class="app__row-badges">${severityBadge(e.severity)} ${statusLabel(e.status)}</span>
              </li>`;
            })}
          </ul>
        </div>

        <div class="app__detail">
          <div class="app__detail-head">
            <div>
              <span class="app__row-id">${d.id}</span>
              <p class="app__detail-title">${d.title}</p>
            </div>
            ${statusLabel(d.status)}
          </div>
          <div class="app__evidence">
            ${marker(1)}
            ${cctvView({ scene: d.scene, id: d.camera, location: "Main gate", time: d.detectedAt, detection: d.detection, overlay: d.overlay })}
            <span class="app__evidence-label">Evidence frame · ${d.detectedAt}</span>
          </div>
          <dl class="app__fields">
            ${fields.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}
          </dl>
          <div class="app__owner">
            ${marker(2)}
            <div><p class="app__k">Assigned to</p><p class="app__v">${icon("user", { size: 15 })}${d.assignee}</p></div>
            <div><p class="app__k">Escalated</p><p class="app__v">${icon("clock", { size: 15 })}${d.escalatedAt}</p></div>
          </div>
        </div>
      </div>
    </div>
  </figure>`;
}

export function commandCenterSection() {
  const hasShots = p.screenshots.length > 0;
  return html`<section class="section section--tint platform-section" id="${p.id}" aria-labelledby="${p.id}-title">
    <div class="container">
      <div class="platform-section__head">
        ${sectionHead({ headline: p.headline, body: p.body, id: `${p.id}-title` })}
        <ol class="callouts">
          ${p.callouts.map(
            (c) => html`<li class="callout"><span class="app-marker" aria-hidden="true">${c.n}</span><div><h3>${c.title}</h3><p>${c.body}</p></div></li>`
          )}
        </ol>
      </div>
      ${hasShots ? screenshots() : mockup()}
      ${!hasShots && html`<p class="section-note">${p.note}</p>`}
    </div>
  </section>`;
}
