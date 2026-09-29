import { html } from "../lib/html.js";
import { operatingModel as m } from "../content/home.js";
import { icon } from "../components/icons.js";
import { sectionHead } from "../components/ui.js";

// The core service is one chain: CCTV → Surveillance Centre → Platform →
// Management. AI analytics hangs off the chain as an optional, value-added
// service, drawn smaller and dashed so it never reads as a co-equal part.

const ICONS = { centre: "headset", platform: "layers", ai: "scan" };

const node = (part) => html`<div class="model__node model__node--${part.key}">
  <p class="model__label">${icon(ICONS[part.key], { size: 16 })}<span>${part.label}</span></p>
  <p class="model__role">${part.role}</p>
  <p class="model__body">${part.body}</p>
  ${part.highlights && html`<ul class="model__highlights">
    ${part.highlights.map((item) => html`<li>${icon(item.icon, { size: 16 })}<strong>${item.text}</strong></li>`)}
  </ul>`}
</div>`;

const connector = html`<span class="model__link" aria-hidden="true"><span></span></span>`;

export function operatingModelSection() {
  const [centre, platform] = m.core;
  return html`<section class="section model-section" id="${m.id}" aria-labelledby="${m.id}-title">
    <div class="container">
      ${sectionHead({ headline: m.headline, body: m.body, align: "center", id: `${m.id}-title` })}
      <div class="model">
        <div class="model__end model__end--source">
          ${icon("camera", { size: 22 })}
          <p class="model__end-label">${m.source.label}</p>
          <p class="model__end-body">${m.source.body}</p>
        </div>
        ${connector} ${node(centre)} ${connector} ${node(platform)} ${connector}
        <div class="model__end model__end--outcome">
          <p class="model__end-label">${m.outcome.label}</p>
          <ul>${m.outcome.items.map((item) => html`<li>${icon("check", { size: 15 })}${item}</li>`)}</ul>
        </div>
        <div class="model__addon">
          <span class="model__addon-link" aria-hidden="true"></span>
          <div class="model__node model__node--ai">
            <p class="model__label">${icon("plus", { size: 14 })}<span>${m.addOn.role}</span></p>
            <p class="model__role">${icon(ICONS.ai, { size: 18 })}${m.addOn.label}</p>
            <p class="model__body">${m.addOn.body}</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
