import { html } from "../lib/html.js";
import { visible } from "../lib/flags.js";
import { solutions as s } from "../content/home.js";
import { icon } from "../components/icons.js";
import { cctvView } from "../components/cctv.js";
import { demoButton, draftMarker, sectionHead } from "../components/ui.js";

// Industry tabs. Without JS every panel is shown in sequence; the client
// script upgrades the list into an accessible tablist. Each panel pairs a
// grid of use-case cards with a simulated camera view of that environment
// (or a supplied `visual` image).

const SOURCE = {
  human: { icon: "headset", label: "Surveillance Centre" },
  ai: { icon: "scan", label: "AI analytics" },
};

function useCase(item) {
  const u = typeof item === "string" ? { text: item } : item;
  const src = SOURCE[u.source];
  return html`<li class="usecase${src ? ` usecase--${u.source}` : ""}">
    <span class="usecase__icon">${icon(src?.icon ?? "check", { size: 18 })}</span>
    <p class="usecase__text">${u.text}</p>
    ${src && html`<span class="usecase__src">${src.label}</span>`}
  </li>`;
}

function visual(ind) {
  if (ind.visual) {
    return html`<img class="industry__visual" src="${ind.visual.src}" alt="${ind.visual.alt}" width="${ind.visual.width}" height="${ind.visual.height}" loading="lazy" decoding="async" />`;
  }
  return html`<div class="industry__visual industry__visual--sim" aria-hidden="true">
    ${cctvView({ scene: ind.scene, id: "CAM 01", location: ind.name, time: "02:15:00", live: true })}
    <span class="industry__visual-tag">${icon("headset", { size: 14 })}Watched by the Surveillance Centre</span>
  </div>`;
}

function panel(ind) {
  return html`<div class="tabs__panel" id="panel-${ind.key}" role="tabpanel" aria-labelledby="tab-${ind.key}" data-tab-panel>
    <div class="industry">
      <div class="industry__copy">
        <div class="industry__head">
          <span class="industry__icon">${icon(ind.icon ?? "building", { size: 24 })}</span>
          <div>
            <h3 class="industry__name">${ind.name} ${draftMarker(ind)}</h3>
            ${ind.summary && html`<p class="industry__summary">${ind.summary}</p>`}
          </div>
        </div>
        <ul class="industry__cases">${ind.useCases.map(useCase)}</ul>
      </div>
      ${visual(ind)}
    </div>
  </div>`;
}

export function solutionsSection() {
  const industries = visible(s.industries);
  return html`<section class="section section--tint solutions-section" id="${s.id}" aria-labelledby="${s.id}-title">
    <div class="container">
      ${sectionHead({
        headline: s.headline,
        body: industries.length ? s.body : "Tell us about your sites and we’ll show you the use cases that apply.",
        id: `${s.id}-title`,
      })}
      ${industries.length
        ? html`<div class="tabs" data-tabs>
            <div class="tabs__list" role="tablist" aria-label="Industries" hidden data-tab-list>
              ${industries.map(
                (ind, i) => html`<button class="tabs__tab" type="button" role="tab" id="tab-${ind.key}" aria-controls="panel-${ind.key}"
                  aria-selected="${i === 0 ? "true" : "false"}" tabindex="${i === 0 ? "0" : "-1"}">${icon(ind.icon ?? "building", { size: 18 })}<span>${ind.name}</span></button>`
              )}
            </div>
            <div class="tabs__panels">${industries.map(panel)}</div>
          </div>
          ${s.disclaimer &&
          html`<div class="solutions-section__note">
            <p>${icon("alertCircle", { size: 18 })}<span>${s.disclaimer}</span></p>
            ${demoButton({ track: "solutions", variant: "secondary" })}
          </div>`}`
        : html`<div class="workflow-fallback">${demoButton({ track: "solutions" })}</div>`}
    </div>
  </section>`;
}
