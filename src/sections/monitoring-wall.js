import { html, cx } from "../lib/html.js";
import { isVisible, visible } from "../lib/flags.js";
import { whatItSees } from "../content/home.js";
import { monitoringWall } from "../content/demo-data.js";
import { cctvView } from "../components/cctv.js";
import { icon } from "../components/icons.js";
import { detectionBadge, draftMarker, resolveEvent, sectionHead, severityBadge, statusLabel } from "../components/ui.js";

// Signature section: who does what (Surveillance Centre vs AI), then a
// simulated monitoring wall showing events from each side by side. All incident data lives in
// src/content/demo-data.js (monitoringWall) and can be swapped freely.

const tileId = (cam) => `tile-${cam.id.replace(/\W+/g, "-").toLowerCase()}`;

function tile(cam) {
  const event = cam.event && isVisible(cam.event) ? resolveEvent(cam.event) : null;
  return html`<li class="${cx("tile", event ? `tile--event tile--${event.detection}` : "tile--quiet", event?.placeholder && "tile--placeholder")}"
      id="${tileId(cam)}" ${event ? html`data-detection="${event.detection}" data-event` : ""}>
    ${cctvView({
      scene: cam.scene,
      id: cam.id,
      location: cam.location,
      site: cam.site,
      time: event?.time ?? "02:15:00",
      live: !event,
      detection: event?.detection,
      overlay: event?.overlay,
    })}
    ${event
      ? html`<div class="tile__chip">${detectionBadge(event.detection, { short: true })}${severityBadge(event.severity)}</div>`
      : html`<span class="visually-hidden">${cam.id}, ${cam.location}: no event</span>`}
  </li>`;
}

function logItem(cam) {
  const event = resolveEvent(cam.event);
  return html`<li class="${cx("log__item", `log__item--${event.detection}`)}" data-detection="${event.detection}" data-log-for="${tileId(cam)}">
    <div class="log__top">${detectionBadge(event.detection)} ${draftMarker(event)}</div>
    <h3 class="log__title">${event.title}</h3>
    <p class="log__meta">${cam.id} · ${cam.location} · ${cam.site}</p>
    <div class="log__foot">
      <time>${event.time}</time>
      <span class="log__badges">${severityBadge(event.severity)} ${statusLabel(event.status)}</span>
    </div>
  </li>`;
}

// Surveillance Centre = judgment; AI = measurement. The core service leads.
function role(r) {
  const cases = visible(r.useCases);
  return html`<article class="role role--${r.key}">
    <p class="role__tag">${r.tag}</p>
    <h3 class="role__name">${icon(r.key === "ai" ? "scan" : "headset", { size: 22 })}<span>${r.label}</span><span class="role__eq" aria-hidden="true">=</span></h3>
    <p class="role__does">${r.does}</p>
    ${cases.length > 0 &&
    html`<ul class="role__cases">
      ${cases.map((u) => html`<li>${icon("check", { size: 16 })}<p><strong>${u.title}</strong><span>${u.detail}</span></p></li>`)}
    </ul>`}
  </article>`;
}

export function monitoringWallSection() {
  const cameras = monitoringWall.cameras;
  const events = cameras.filter((c) => c.event && isVisible(c.event));

  return html`<section class="section section--dark wall-section" id="${whatItSees.id}" aria-labelledby="${whatItSees.id}-title">
    <div class="container">
      ${sectionHead({ eyebrow: whatItSees.eyebrow, headline: whatItSees.headline, body: whatItSees.body, id: `${whatItSees.id}-title` })}
      <div class="roles">${whatItSees.roles.map(role)}</div>
      ${whatItSees.casesNote && html`<p class="roles__note">${whatItSees.casesNote}</p>`}

      <div class="wall-filter" role="group" aria-label="Show events by detection source" data-wall-filter>
        <button type="button" aria-pressed="true" data-filter="all">All events</button>
        <button type="button" aria-pressed="false" data-filter="human">Surveillance Centre detected</button>
        <button type="button" aria-pressed="false" data-filter="ai">AI detected</button>
      </div>

      <div class="wall-layout" data-wall>
        <ul class="wall" aria-label="Simulated camera feeds">
          ${cameras.map(tile)}
        </ul>
        <aside class="log" aria-labelledby="${whatItSees.id}-log">
          <p class="log__heading" id="${whatItSees.id}-log"><span class="log__live"></span>Event log</p>
          <ol class="log__list" aria-live="polite">
            ${events.map(logItem)}
          </ol>
        </aside>
      </div>
      <p class="section-note">${whatItSees.note}</p>
    </div>
  </section>`;
}
